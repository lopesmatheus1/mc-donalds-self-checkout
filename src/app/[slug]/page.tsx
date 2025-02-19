import Image from "next/image";
import { notFound } from "next/navigation";

import ConsumptionMethodOption from "@/components/consumption-method-option";
import { db } from "@/lib/prisma";

interface HomePageProps {
  params: Promise<{ slug: string }>;
}

const HomePage = async ({ params }: HomePageProps) => {
  const { slug } = await params;
  const restaurant = await db.restaurant.findUnique({
    where: { slug },
  });
  if (!restaurant) return notFound();
  return (
    <div className="flex h-full flex-col items-center justify-center pt-20">
      {/* LOGO MCDONALDS */}
      <div className="mb-24 flex flex-col items-center">
        <Image
          alt=""
          src={restaurant?.avatarImageUrl}
          quality={100}
          width={80}
          height={80}
        />
        <h2 className="mt-2 font-semibold">FSW Donalds&apos;s</h2>
      </div>

      {/* SEJA BEM VINDO */}
      <div className="mb-14 flex flex-col items-center p-6">
        <h1 className="text-center text-3xl font-semibold">Seja bem-vindo!</h1>
        <p className="mt-2 text-center text-base text-muted-foreground">
          Escolha como prefere aproveitar sua refeição. Estamos aqui para
          oferecer praticidade e sabor em cada detalhe!
        </p>
      </div>

      {/* OPÇÕES */}
      <div className="grid grid-cols-2 gap-6 px-5">
        <ConsumptionMethodOption
          slug={slug}
          option="DINE_IN"
          buttonText="Para comer aqui"
          imageAlt="Para comer aqui"
          imageUrl="/burger.png"
        />
        <ConsumptionMethodOption
          slug={slug}
          option="TAKE_AWAY"
          buttonText="Para levar"
          imageAlt="Para levar"
          imageUrl="/delivery.png"
        />
      </div>
    </div>
  );
};

export default HomePage;
