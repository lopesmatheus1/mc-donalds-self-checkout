"use client";
import { MenuCategory, Prisma } from "@prisma/client";
import { useContext, useState } from "react";

import CartOpen from "@/app/[slug]/components/cart-open";
import { CartContext } from "@/context/cart";

import ProductItem from "./product-item";
import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface CategoryListProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: true;
      product: true;
    };
  }>;
}

const CategoryList = ({ restaurant }: CategoryListProps) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>();
  const { cartProducts } = useContext(CartContext);

  const handleCategoryClick = (category: MenuCategory) => {
    setSelectedCategory(category);
  };

  const categoryIsSelected = (category: MenuCategory) => {
    return selectedCategory?.id === category.id;
  };

  const selectedCategoryIsUndefined = () => {
    return selectedCategory === undefined;
  };
  return (
    <>
      <div className="p-5 pt-0">
        <ScrollArea>
          <div className="flex w-max gap-2">
            <Button
              variant={`${selectedCategoryIsUndefined() ? "default" : "outline"}`}
              className={`h-9 rounded-full border border-muted-foreground/60 ${selectedCategoryIsUndefined() ? "text-white" : "text-muted-foreground hover:bg-primary hover:text-white"}`}
              onClick={() => setSelectedCategory(undefined)}
              size={"sm"}
            >
              Todos os produtos
            </Button>
            {restaurant?.menuCategories.map((category) => (
              <Button
                onClick={() => handleCategoryClick(category)}
                key={category.id}
                variant={`${categoryIsSelected(category) ? "default" : "outline"}`}
                className={`rounded-full border border-muted-foreground/60 ${categoryIsSelected(category) ? "text-white" : "text-muted-foreground hover:bg-primary hover:text-white"}`}
                size={"sm"}
              >
                {category.name}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* PRODUTOSSSS */}
      <h2 className="px-5 font-semibold">
        {selectedCategory?.name || "Todos os produtos"}
      </h2>
      <div className="p-5 pb-0">
        <div className="h-full space-y-5">
          {restaurant?.product
            .filter((product) => {
              if (!selectedCategory) return true;
              return product.menuCategoryId === selectedCategory.id;
            })
            .map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
        </div>
      </div>

      {cartProducts.length > 0 && <CartOpen />}
    </>
  );
};

export default CategoryList;
