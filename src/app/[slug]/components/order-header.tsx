"use client";
import { ChevronLeftIcon, ScrollText } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const OrderHeader = () => {
  const router = useRouter();
  const handleBackClick = () => {
    router.push("/fsw-donalds");
  };
  return (
    <div className="flex w-full justify-between px-5 py-6">
      <Button
        onClick={handleBackClick}
        className="h-10 w-10"
        variant={"outline"}
      >
        <ChevronLeftIcon size={20} />
      </Button>

      <Button variant={"outline"} className="h-10 w-10">
        <ScrollText size={20} />
      </Button>
    </div>
  );
};

export default OrderHeader;
