"use client";

import { usePathname } from "next/navigation";

import { Button } from "./ui/button";

const CategoryItem = ({ name, id }: { name: string; id: string }) => {
  const pathname = usePathname();
  const currentCategoryId = pathname.split("/")[2];
  const active = currentCategoryId === id;
  return (
    <Button
      variant={`${active ? "default" : "outline"}`}
      className={`rounded-full border border-muted-foreground/60 ${active ? "text-white" : "text-muted-foreground hover:bg-primary hover:text-white"}`}
      size={"sm"}
    >
      {name}
    </Button>
  );
};

export default CategoryItem;
