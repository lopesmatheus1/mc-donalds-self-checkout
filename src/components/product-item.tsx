import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { formatCurrency } from "@/helpers/formatCurrency";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { slug } = useParams<{ slug: string }>();
  return (
    <div>
      <Link href={`/${slug}/menu/${product.id}`}>
        <div className="flex w-full items-center justify-between">
          <div className="pr-3">
            <h2 className="w-48 truncate text-sm font-medium">
              {product.name}
            </h2>
            {product.ingredients.length > 0 ? (
              <span className="line-clamp-2 h-9 text-xs text-muted-foreground">
                {product.ingredients.join(", ")}
              </span>
            ) : (
              ""
            )}
            <p className="text-sm font-bold">
              {" "}
              {formatCurrency(product.price)}
            </p>
          </div>

          <div className="relative max-h-[75px] min-h-[75px] min-w-[75px] max-w-[75px]">
            <Image
              alt=""
              src={product.imageUrl}
              fill
              className="rounded-2xl bg-foreground/10 object-contain"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
