import { notFound } from "next/navigation";

import CategoryList from "@/components/category-list";
import ProductItem from "@/components/product-item";
import { db } from "@/lib/prisma";

import RestaurantDescription from "../components/restaurant-description";
import RestaurantImage from "../components/restaurant-image";

interface ProductsByCategoryProps {
  params: {
    id: string;
  };
}

const ProductsByCategory = async ({
  params: { id },
}: ProductsByCategoryProps) => {
  const products = await db.product.findMany({
    where: { menuCategoryId: id },
    include: { menuCategory: true },
  });
  const restaurant = await db.restaurant.findFirst({});
  if (!restaurant) return notFound();
  return (
    <div className="h-screen w-full">
      <RestaurantImage />

      {<RestaurantDescription restaurant={restaurant} />}

      {/* CATEGORIES */}
      <CategoryList />

      {/* FOOD BY CATEGORY */}
      <h2 className="px-5 font-semibold">{products[0].menuCategory.name}</h2>
      <div className="p-5">
        <div className="space-y-5 h-full">
          {products.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsByCategory;
