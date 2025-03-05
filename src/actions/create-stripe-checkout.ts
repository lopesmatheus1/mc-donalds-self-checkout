"use server";

import { ConsuptionMethod } from "@prisma/client";
import { headers } from "next/headers";
import Stripe from "stripe";

import { CartProduct } from "@/context/cart";
import { removeCpfPunctuation } from "@/helpers/IsValidCpf";
import { db } from "@/lib/prisma";

interface CreateStripeCheckoutInput {
  orderId: number;
  products: CartProduct[];
  slug: string;
  consumptionMethod: ConsuptionMethod;
  cpf: string;
}

export const createStripeCheckout = async ({
  products,
  orderId,
  consumptionMethod,
  slug,
  cpf,
}: CreateStripeCheckoutInput) => {
  const searchParams = new URLSearchParams();
  searchParams.set("consumptionMethod", consumptionMethod);
  searchParams.set("cpf", removeCpfPunctuation(cpf));
  const productsWithPrices = await db.product.findMany({
    where: {
      id: {
        in: products.map((product) => product.id),
      },
    },
  });

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key not found");
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-02-24.acacia",
  });

  const reqHeaders = await headers();
  const origin = reqHeaders.get("origin") ?? "";

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${origin}/${slug}/orders?${searchParams.toString()}`,
    cancel_url: `${origin}/${slug}/orders?${searchParams.toString()}`,
    mode: "payment",
    metadata: {
      orderId,
    },
    line_items: products.map((product) => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: product.name,
          images: [product.imageUrl],
        },
        unit_amount: Math.round(
          productsWithPrices.find((p) => p.id === product.id)!.price * 100,
        ),
      },
      quantity: product.quantity,
    })),
  });
  return { sessionId: session.id };
};
