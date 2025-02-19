import { Product } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

import { formatCurrency } from "@/helpers/formatCurrency";

import { Button } from "./ui/button";

interface SideBarProductItemProps {
  product: Product;
  quantity: number;
}

const SideBarProductItem = ({ product, quantity }: SideBarProductItemProps) => {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <div className="relative min-h-[70px] min-w-[70px]">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>

        <div className="flex flex-col items-start">
          <h3 className="w-40 overflow-hidden truncate text-sm font-semibold">
            {product.name}
          </h3>
          <h2 className="font-semibold">{formatCurrency(product.price)}</h2>

          <div>
            <Button
              //   onClick={handleDecreaseQuantityClick}
              className="h-8 w-8 rounded-lg bg-white p-0 text-accent-foreground"
            >
              <ChevronLeftIcon size={16} />
            </Button>
            <span className="px-2">{quantity}</span>
            <Button
              //   onClick={handleIncreaseQuantityClick}
              className="h-8 w-8 rounded-lg bg-primary p-0"
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      <Button
        // onClick={() => setProducts([])}
        className="h-8 w-8 rounded-lg bg-white p-0 text-accent-foreground"
      >
        <TrashIcon size={16} />
      </Button>
    </div>
  );
};

export default SideBarProductItem;
