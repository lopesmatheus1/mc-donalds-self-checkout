import { notFound } from "next/navigation";

import RestaurantDescription from "@/app/[slug]/components/restaurant-description";
import RestaurantImage from "@/app/[slug]/components/restaurant-image";
import CategoryList from "@/components/category-list";
import { db } from "@/lib/prisma";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string; categoryId?: string }>;
}
const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKE_AWAY", "dine-in", "take_away"].includes(
    consumptionMethod,
  );
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;

  if (!isConsumptionMethodValid(consumptionMethod)) return notFound();

  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    include: {
      product: {
        include: { menuCategory: true },
      },
      menuCategories: true,
    },
  });

  if (!restaurant) return notFound();

  return (
    <div className="h-screen w-full">
      <RestaurantImage/>

      {<RestaurantDescription restaurant={restaurant} />}

      {/* CATEGORIES */}
      <CategoryList restaurant={restaurant} />
    </div>
  );
};

export default RestaurantMenuPage;
