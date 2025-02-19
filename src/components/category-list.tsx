import Link from "next/link";

import { db } from "@/lib/prisma";

import CategoryItem from "./category-item";

const CategoryList = async () => {
  const restaurant = await db.restaurant.findFirst({
    include: {
      menuCategories: true,
    },
  });
  return (
    <div className="flex gap-3 overflow-x-auto p-5 pt-0 [&::-webkit-scrollbar]:hidden">
      {restaurant?.menuCategories.map((category) => (
        <Link href={`/restaurant/${category.id}`} key={category.id}>
          <CategoryItem
            id={category.id}
            name={category.name}
            key={category.id}
          />
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
