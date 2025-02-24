import { ScrollText } from "lucide-react";

import { isValidCpf, removeCpfPunctuation } from "@/helpers/IsValidCpf";
import { db } from "@/lib/prisma";

import CpfForm from "../components/cpf-form";
import OrderHeader from "../components/order-header";
import OrderList from "../components/order-list";

interface OrdersPageProps {
  searchParams: Promise<{ cpf: string }>;
}

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const { cpf } = await searchParams;

  if (!cpf) return <CpfForm />;
  if (!isValidCpf(cpf)) return <CpfForm />;

  const orders = await db.order.findMany({
    where: { customerCpf: removeCpfPunctuation(cpf) },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
        },
      },
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <div>
      <OrderHeader />
      <div className="flex gap-1.5 px-5">
        <ScrollText />
        Meus Pedidos
      </div>

      <OrderList orders={orders} />
    </div>
  );
};

export default OrdersPage;
