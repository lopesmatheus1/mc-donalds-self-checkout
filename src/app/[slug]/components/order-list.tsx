import { OrderStatus, Prisma } from "@prisma/client";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/formatCurrency";

interface OrderListProps {
  orders: Array<
    Prisma.OrderGetPayload<{
      include: {
        restaurant: {
          select: {
            name: true;
            avatarImageUrl: true;
          };
        };
        orderProducts: {
          include: {
            product: true;
          };
        };
      };
    }>
  >;
}

const getStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case "FINISHED":
      return "Finalizado";
    case "PENDING":
      return "Pendente";
    case "CANCELED":
      return "Cancelado";
    case "PREPARING":
      return "Em preparo";
    case "PAYMENT_CONFIRMED":
      return "Pagamento confirmado";
    case "PAYMENT_FAILED":
      return "Pagamento falhou";
  }
};

const OrderList = ({ orders }: OrderListProps) => {
  return (
    <div className="space-y-6 p-5">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="space-y-4 rounded-md border border-muted-foreground/30 p-5">
            <div>
              <Badge
                className={`${["PAYMENT_CONFIRMED", "FINISHED"].includes(order.status) ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}
              >
                {getStatusLabel(order.status)}
              </Badge>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="relative h-5 w-5 rounded-sm">
                <Image
                  alt={order.restaurant.name}
                  src={order.restaurant.avatarImageUrl}
                  fill
                />
              </div>
              <span className="text-sm font-semibold">
                {order.restaurant.name}
              </span>
            </div>
            <Separator className="bg-muted-foreground/30" />
            {order.orderProducts.map((orderProduct) => (
              <div className="flex items-center gap-1.5" key={orderProduct.id}>
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground text-xs font-semibold">
                  <span className="text-white">{orderProduct.quantity}</span>
                </div>
                <p>{orderProduct.product.name}</p>
              </div>
            ))}
            <Separator className="bg-muted-foreground/30" />
            <div className="flex w-full items-center justify-between">
              <p className="font-semibold">{formatCurrency(order.total)}</p>
              <Button variant={"ghost"} className="text-[#D52B1E]">
                Adicionar à sacola
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderList;
