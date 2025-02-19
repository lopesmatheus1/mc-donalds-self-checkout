"use client";
import { Prisma, Product } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

import SideBarProductItem from "@/components/sidebar-product-item";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatCurrency } from "@/helpers/formatCurrency";

interface ProductDescriptionProps {
  product: Prisma.ProductGetPayload<{
    include: { restaurant: true };
  }>;
}

const ProductDescription = ({ product }: ProductDescriptionProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [products, setProducts] = useState<Product[]>([]);

  const handleDecreaseQuantityClick = () => {
    if (quantity <= 1) return setQuantity(1);
    setQuantity(quantity - 1);
  };
  const handleIncreaseQuantityClick = () => {
    setQuantity(quantity + 1);
  };

  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] flex-grow rounded-tl-3xl rounded-tr-3xl bg-white">
        <div className="space-y-1 p-5">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={product.restaurant.avatarImageUrl} />
            </Avatar>
            <p className="text-sm text-muted-foreground">
              {product.restaurant.name}
            </p>
          </div>

          <h2 className="text-lg font-semibold">{product.name}</h2>
          <div className="flex w-full justify-between">
            <p className="text-xl font-semibold">
              {formatCurrency(product.price)}
            </p>

            {/* QUANTIDADE DE PRODUTO */}
            <div className="flex w-24 items-center justify-between">
              <Button
                onClick={handleDecreaseQuantityClick}
                className="h-8 w-8 rounded-lg bg-white p-0 text-accent-foreground"
              >
                <ChevronLeftIcon size={16} />
              </Button>

              <span className="px-2">{quantity}</span>

              <Button
                onClick={handleIncreaseQuantityClick}
                className="h-8 w-8 rounded-lg bg-primary p-0"
              >
                <ChevronRightIcon size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className="p-5 py-6">
          <p className="font-semibold">Sobre</p>
          <span className="text-sm text-muted-foreground">
            {product.description}
          </span>
        </div>

        <div className="px-5">
          <div className="flex items-center gap-1 pb-2 font-semibold">
            <ChefHatIcon size={18} />
            <p>Ingredientes</p>
          </div>

          <div>
            <ul className="list-disc px-5">
              {product.ingredients.map((ingredient) => (
                <li key={ingredient} className="text-sm text-muted-foreground">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full p-5">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              onClick={() => setProducts(products.concat(product))}
              className="w-full rounded-full bg-[#D52B1E] hover:bg-[#D52B1E]/80"
            >
              Adionar à sacola
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[90%]">
            <SheetHeader>
              <SheetTitle className="text-left">Sacola</SheetTitle>

              {products.map((product, i) => (
                <SideBarProductItem
                  quantity={quantity}
                  product={product}
                  key={product.id + i}
                />
              ))}
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default ProductDescription;
