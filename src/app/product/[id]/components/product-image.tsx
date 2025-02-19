import { Product } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

interface ProductImageProps {
  product: Pick<Product, "imageUrl">;
}

const ProductImage = ({product}: ProductImageProps) => {
  return (
    <div className="relative h-[350px] w-full">
      <Image
        alt=""
        src={product?.imageUrl}
        fill
        className="bg-muted-foreground/20 object-contain"
        quality={100}
      />

      <Button className="absolute left-5 top-5 h-10 w-10 rounded-full bg-white p-0 text-accent-foreground">
        <ChevronLeftIcon size={20} />
      </Button>
    </div>
  );
};

export default ProductImage;
