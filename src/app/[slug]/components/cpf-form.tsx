"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { isValidCpf, removeCpfPunctuation } from "@/helpers/IsValidCpf";

const formSchema = z.object({
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
type FormValues = z.infer<typeof formSchema>;
const CpfForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpf: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    router.push(`${pathname}?cpf=${removeCpfPunctuation(data.cpf)}`);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <Drawer open>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Visualizar pedidos</DrawerTitle>
          <DrawerDescription>
            Insira seu CPF para vizualizar seu pedidos.
          </DrawerDescription>
        </DrawerHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem className="px-4">
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
              <Button type="submit" className="rounded-full bg-[#D52B1E]">
                Confirmar
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default CpfForm;
