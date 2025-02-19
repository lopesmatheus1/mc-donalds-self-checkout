import { notFound } from "next/navigation";

import CategoryList from "@/components/category-list";
import ProductItem from "@/components/product-item";
import { db } from "@/lib/prisma";

import RestaurantDescription from "./components/restaurant-description";
import RestaurantImage from "./components/restaurant-image";

const Restaurant = async () => {
  const restaurant = await db.restaurant.findFirst({
    include: {
      product: true,
    },
  });

  if (!restaurant) return notFound();
  return (
    <div className="h-screen w-full">
      <RestaurantImage />

      {/* DESCRIÇÃO DO RESDTAURANTE */}
      {<RestaurantDescription restaurant={restaurant} />}

      {/* CATEGORIES */}
      <CategoryList />

      {/* LANCHES */}
      <h2 className="px-5 font-semibold">Nossos produtos</h2>
      <div className="p-5">
        <div className="space-y-5">
          {restaurant?.product.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
