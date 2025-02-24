import { Order } from "@prisma/client";
import { Badge } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

interface OrderItemProps {
  order: Order;
}
const OrderItem = ({ imageUrl, restaurantName }: OrderItemProps) => {
  return (
    <div className="flex w-full flex-col p-5">
      <Badge>DISPONIVEL</Badge>

      <div className="flex items-center gap-1.5">
        <div className="relative h-4 w-4">
          <Image src={imageUrl} alt={""} />
        </div>
        <p className="text-sm font-semibold">{restaurantName}</p>
      </div>

      <div className="flex items-center gap-1.5">
        <div className="relative h-4 w-4 rounded-full bg-muted-foreground">
          <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs">
            1
          </p>
        </div>

        <p>Produtos</p>
      </div>

      <div className="flex w-full justify-between">
        <p>R$ 10,00</p>
        <Button>Adicionar à sacola</Button>
      </div>
    </div>
  );
};

export default OrderItem;
