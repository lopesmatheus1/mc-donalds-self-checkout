"use client";
import { ChevronLeftIcon, ScrollText } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const RestaurantImage = () => {
  const route = useRouter();
  return (
    <div className="relative h-[250px] w-full">
      <Image
        alt="Restaurante McDonalds"
        src={"/mcdonalds.jpg"}
        fill
        className="object-cover"
      />
      <Button
        className="absolute left-5 top-5 h-10 w-10 rounded-full bg-white p-0"
        variant="ghost"
        onClick={() => route.back()}
      >
        <ChevronLeftIcon size={20} />
      </Button>

      <Button
        className="absolute right-5 top-5 h-10 w-10 rounded-full bg-white p-0"
        variant="ghost"
        onClick={() => route.push("/fsw-donalds/orders")}
      >
        <ScrollText size={20} />
      </Button>
    </div>
  );
};

export default RestaurantImage;
