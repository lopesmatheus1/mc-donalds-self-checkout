import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductDescription from "./components/product-description";
import ProductImage from "./components/product-image";
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
      <ProductImage product={product} />

      <ProductDescription product={product} />
    </div>
  );
};

export default ProductPage;
