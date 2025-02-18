import { db } from "@/lib/prisma";

import CategoryItem from "./category-item";

const CategoryList = async () => {
  const restaurant = await db.restaurant.findFirst({
    include: {
      menuCategories: true,
    },
  });
  return (
    <div className="flex gap-3 overflow-x-auto p-5 pt-0">
      {restaurant?.menuCategories.map((category) => (
        <CategoryItem name={category.name} key={category.id} />
      ))}
    </div>
  );
};

export default CategoryList;
