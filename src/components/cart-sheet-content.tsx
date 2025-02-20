import { useContext } from "react";

import { CartContext } from "@/context/cart";
import { formatCurrency } from "@/helpers/formatCurrency";

import SideBarProductItem from "./sidebar-product-item";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

const CartSheetContent = () => {
  const { cartProducts, total } = useContext(CartContext);
  return (
    <SheetContent className="flex h-full w-[90%] flex-col">
      <SheetHeader>
        <SheetTitle className="text-left">Sacola</SheetTitle>
      </SheetHeader>

      <div className="flex flex-grow flex-col justify-between">
        <div className="flex-grow pt-6">
          {cartProducts.map((product) => (
            <SideBarProductItem
              quantity={product.quantity}
              product={product}
              key={product.id}
            />
          ))}
        </div>

        {/* Rodapé fixo na parte inferior */}
        <div className="mt-auto">
          <Card>
            <CardContent className="rounded-xl border border-muted-foreground/20 p-5">
              <div className="space-y-2">
                <div className="flex w-full justify-between">
                  <p className="text-sm text-muted-foreground">Subtotal: </p>
                  <span className="text-base font-semibold text-accent-foreground">
                    {formatCurrency(total)}
                  </span>
                </div>
                <Separator className="bg-muted-foreground/20" />
                <div className="flex w-full justify-between">
                  <p className="text-sm text-muted-foreground">Desconto: </p>
                  <span className="text-base font-medium text-accent-foreground">
                    R$ 0,00
                  </span>
                </div>
                <Separator className="bg-muted-foreground/20" />
                <div className="flex w-full justify-between">
                  <p className="font-semibold">Total: </p>
                  <span className="text-base font-semibold text-accent-foreground">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-4">
            <Button className="w-full bg-[#D52B1E]">Finalizar compra</Button>
          </div>
        </div>
      </div>
    </SheetContent>
  );
};

export default CartSheetContent;
