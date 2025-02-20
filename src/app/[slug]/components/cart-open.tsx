import { useContext } from "react";

import CartSheetContent from "@/components/cart-sheet-content";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { CartContext } from "@/context/cart";
import { formatCurrency } from "@/helpers/formatCurrency";

const CartOpen = () => {
  const { totalProductQuantity, toggleCart, cartIsOpen, total } =
    useContext(CartContext);
  return (
    <>
      <div className="sticky bottom-0 right-5 z-50 flex w-full items-center justify-between bg-white p-5">
        <div>
          <span className="text-sm text-muted-foreground">
            Total dos pedidos
          </span>
          <div className="flex">
            <p className="mr-1 font-semibold">{formatCurrency(total)}</p>
            <span className="text-sm text-muted-foreground">
              /{totalProductQuantity}
              {totalProductQuantity > 1 ? " itens" : " item"}
            </span>
          </div>
        </div>
        <Button onClick={toggleCart} className="bg-[#D52B1E]">
          Ver sacola
        </Button>
      </div>

      <Sheet open={cartIsOpen} onOpenChange={toggleCart}>
        <CartSheetContent />
      </Sheet>
    </>
  );
};

export default CartOpen;
