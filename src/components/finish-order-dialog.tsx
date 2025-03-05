"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConsuptionMethod } from "@prisma/client";
import { loadStripe } from "@stripe/stripe-js";
import { LoaderCircleIcon } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod";

import { createOrder } from "@/actions/create-order";
import { createStripeCheckout } from "@/actions/create-stripe-checkout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CartContext } from "@/context/cart";
import { isValidCpf } from "@/helpers/IsValidCpf";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, {
      message: "O nome é obrigatório",
    })
    .max(50),
  cpf: z
    .string()
    .trim()
    .min(1, {
      message: "O CPF é obrigatório",
    })
    .refine((value) => isValidCpf(value), {
      message: "CPF inválido",
    }),
});

type FormSchema = z.infer<typeof formSchema>;

interface FinishOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FinishOrderDialog = ({ onOpenChange, open }: FinishOrderDialogProps) => {
  const searchParams = useSearchParams();
  const { cartProducts } = useContext(CartContext);
  const { slug } = useParams<{ slug: string }>();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    shouldUnregister: true,
    defaultValues: {
      name: "",
      cpf: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    const consumptionMethod = searchParams.get(
      "consumptionMethod",
    ) as ConsuptionMethod;
    try {
      setIsLoading(true);
      const order = await createOrder({
        customerName: data.name,
        customerCpf: data.cpf,
        consumptionMethod,
        products: cartProducts,
        slug,
      });
      const { sessionId } = await createStripeCheckout({
        products: cartProducts,
        orderId: order.id,
        consumptionMethod,
        slug,
        cpf: data.cpf,
      });

      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) return;
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
      );
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Finalizar Pedido</DrawerTitle>
          <DrawerDescription>
            Insira suas informações abaixo para finalizar pedido.
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome..." {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu CPF</FormLabel>
                    <FormControl>
                      <PatternFormat
                        customInput={Input}
                        placeholder="Digite seu CPF..."
                        {...field}
                        format="###.###.###-##"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter>
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="rounded-full bg-[#D52B1E]"
                >
                  {isLoading && <LoaderCircleIcon className="animate-spin" />}
                  Finalizar
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrderDialog;
