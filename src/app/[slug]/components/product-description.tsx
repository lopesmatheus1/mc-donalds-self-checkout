"use client";
import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useContext, useState } from "react";

import CartSheetContent from "@/components/cart-sheet-content";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { CartContext } from "@/context/cart";
import { formatCurrency } from "@/helpers/formatCurrency";

interface ProductDescriptionProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          avatarImageUrl: true;
          name: true;
        };
      };
    };
  }>;
}

const ProductDescription = ({ product }: ProductDescriptionProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { addProductsToCart, cartIsOpen, handleOpenOrCloseCart } =
    useContext(CartContext);

  const handleDecreaseQuantityClick = () => {
    if (quantity <= 1) return setQuantity(1);
    setQuantity(quantity - 1);
  };
  const handleIncreaseQuantityClick = () => {
    setQuantity(quantity + 1);
  };

  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] flex-auto rounded-tl-3xl rounded-tr-3xl bg-white">
        {/* RESTAURANTE */}
        <div className="space-y-1 p-5">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={product.restaurant.avatarImageUrl} />
            </Avatar>
            <p className="text-sm text-muted-foreground">
              {product.restaurant.name}
            </p>
          </div>

          {/* NOME DO PRODUTO */}
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

        {/* DESCRICAO */}
        <div className="p-5 py-6">
          <p className="font-semibold">Sobre</p>
          <span className="text-sm text-muted-foreground">
            {product.description}
          </span>
        </div>

        {/* INGREDIENTES */}
        {product.ingredients.length > 0 && (
          <div className="px-5">
            <div className="flex items-center gap-1 pb-2 font-semibold">
              <ChefHatIcon size={18} />
              <p>Ingredientes</p>
            </div>

            <div>
              <ul className="list-disc px-5">
                {product.ingredients.map((ingredient) => (
                  <li
                    key={ingredient}
                    className="text-sm text-muted-foreground"
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="w-full p-5">
        <Sheet open={cartIsOpen} onOpenChange={handleOpenOrCloseCart}>
          <SheetTrigger asChild>
            <Button
              onClick={() => addProductsToCart({ ...product, quantity })}
              className="w-full rounded-full bg-[#D52B1E] hover:bg-[#D52B1E]/80"
            >
              Adionar à sacola
            </Button>
          </SheetTrigger>
          <CartSheetContent />
        </Sheet>
      </div>
    </>
  );
};

export default ProductDescription;
