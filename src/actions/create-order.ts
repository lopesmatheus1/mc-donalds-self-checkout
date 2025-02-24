"use server";

import { ConsuptionMethod } from "@prisma/client";
import { redirect } from "next/navigation";

import { removeCpfPunctuation } from "@/helpers/IsValidCpf";
import { db } from "@/lib/prisma";

interface CreateOrderProps {
  customerName: string;
  customerCpf: string;
  products: Array<{
    id: string;

    quantity: number;
  }>;
  consumptionMethod: ConsuptionMethod;
  slug: string;
}

export const createOrder = async (input: CreateOrderProps) => {
  const restarurant = await db.restaurant.findUnique({
    where: {
      slug: input.slug,
    },
  });

  if (!restarurant) {
    throw new Error("Restaurante não encontrado");
  }

  const productsWithPrices = await db.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });
  const productsWithPricesAndQuantity = input.products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price: productsWithPrices.find((p) => p.id === product.id)!.price,
  }));

  await db.order.create({
    data: {
      consuptionMethod: input.consumptionMethod,
      status: "PENDING",
      customerName: input.customerName,
      customerCpf: removeCpfPunctuation(input.customerCpf),
      orderProducts: {
        createMany: {
          data: productsWithPricesAndQuantity,
        },
      },
      total: productsWithPricesAndQuantity.reduce((acc, product) => {
        return acc + product.price * product.quantity;
      }, 0),
      restaurantId: restarurant?.id,
    },
  });
  redirect(`/${input.slug}/orders`);
};
