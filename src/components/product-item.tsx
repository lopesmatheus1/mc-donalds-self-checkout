import { Product } from "@prisma/client";
import Image from "next/image";

import { formatCurrency } from "@/helpers/formatCurrency";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-col items-start pr-3">
        <h2 className="w-48 truncate text-sm font-medium">{product.name}</h2>
        {product.ingredients ? (
          <span className="line-clamp-2 inline-block text-xs text-muted-foreground">
            {product.ingredients.join(", ")}
          </span>
        ) : (
          ""
        )}
        <p className="text-sm font-bold"> {formatCurrency(product.price)}</p>
      </div>

      <Image alt="" width={80} height={80} src={product.imageUrl} />
    </div>
  );
};

export default ProductItem;
