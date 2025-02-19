import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/formatCurrency";
import { db } from "@/lib/prisma";
interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    include: { restaurant: true },
    where: {
      id,
    },
  });

  if (!product) return notFound();
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative h-[350px] w-full">
        <Image
          alt=""
          src={product?.imageUrl}
          fill
          className="bg-muted-foreground/20 object-contain"
          quality={100}
        />
      </div>

      <div className="relative z-50 mt-[-1.5rem] flex-grow rounded-tl-3xl rounded-tr-3xl bg-white">
        <div className="space-y-1 p-5">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={product.restaurant.avatarImageUrl} />
            </Avatar>
            <p className="text-sm text-muted-foreground">
              {product.restaurant.name}
            </p>
          </div>

          <h2 className="text-lg font-semibold">{product.name}</h2>

          <div className="flex w-full justify-between">
            <p className="text-xl font-semibold">
              {formatCurrency(product.price)}
            </p>

            <div className="flex w-24 items-center justify-between">
              <Button className="h-8 w-8 rounded-lg bg-white p-0 text-accent-foreground">
                <ChevronLeftIcon size={16} />
              </Button>

              <span className="px-2">1</span>

              <Button className="h-8 w-8 rounded-lg bg-[#D52B1E] p-0">
                <ChevronRightIcon size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className="p-5 py-6">
          <p className="font-semibold">Sobre</p>
          <span className="text-sm text-muted-foreground">
            {product.description}
          </span>
        </div>

        <div className="px-5">
          <div className="flex items-center gap-1 pb-2 font-semibold">
            <ChefHatIcon size={18} />
            <p>Ingredientes</p>
          </div>

          <div>
            <ul className="list-disc px-5">
              {product.ingredients.map((ingredient) => (
                <li key={ingredient} className="text-sm text-muted-foreground">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full p-5">
        <Button className="w-full rounded-full bg-[#D52B1E] hover:bg-[#D52B1E]/80">
          Adionar à sacola
        </Button>
      </div>
    </div>
  );
};

export default ProductPage;
