import { notFound } from "next/navigation";

import ProductDescription from "@/app/[slug]/components/product-description";
import ProductImage from "@/app/[slug]/components/product-image";
import { db } from "@/lib/prisma";

interface ProductPage2Props {
  params: Promise<{ slug: string; id: string }>;
}

const ProductPage = async ({ params }: ProductPage2Props) => {
  const { id, slug } = await params;
  const product = await db.product.findUnique({
    include: {
      restaurant: {
        select: {
          avatarImageUrl: true,
          name: true,
          slug: true,
        },
      },
    },
    where: {
      id,
    },
  });

  if (!product) return notFound();
  if (product.restaurant.slug.toUpperCase() !== slug.toUpperCase())
    return notFound();
  return (
    <div className="flex h-full flex-col">
      <ProductImage product={product} />

      <ProductDescription product={product} />
    </div>
  );
};

export default ProductPage;
