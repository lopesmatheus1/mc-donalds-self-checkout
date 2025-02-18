import { Button } from "./ui/button";

const CategoryItem = ({ name }: { name: string }) => {
  return (
    <Button
      variant={"outline"}
      className="rounded-full border border-muted-foreground/60 text-muted-foreground hover:bg-primary hover:text-white"
      size={"sm"}
    >
      {name}
    </Button>
  );
};

export default CategoryItem;
