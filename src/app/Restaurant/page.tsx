import { ClockIcon, StarIcon } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/prisma";

const Restaurant = async () => {
  const restaurant = await db.restaurant.findFirst({});

  return (
    <div className="h-screen w-full">
      <div className="relative h-[200px] w-full">
        <Image
          alt="Restaurante McDonalds"
          src={"/mcdonalds.jpg"}
          fill
          className="object-cover"
        />
      </div>

      {/* DESCRIÇÃO DO RESDTAURANTE */}
      <div className="flex w-full justify-between p-5 pb-3">
        <div className="flex items-center justify-center">
          <Image
            width={45}
            height={45}
            src={restaurant?.avatarImageUrl || ""}
            alt="McDonalds Logo"
          />

          <div className="truncate px-3">
            <h1 className="text-xl font-semibold">{restaurant?.name}</h1>
            <p className="text-xs text-muted-foreground">
              {restaurant?.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Badge className="gap-1 border border-muted-foreground/50 bg-white text-primary hover:bg-muted-foreground/20">
            <StarIcon size={16} />
            5.0
          </Badge>
        </div>
      </div>

      <div className="px-5 pb-5">
        <Badge className="gap-1 border border-muted-foreground/50 bg-white text-chart-2 hover:bg-muted-foreground/20">
          <ClockIcon size={16} />
          Aberto
        </Badge>
      </div>
    </div>
  );
};

export default Restaurant;
