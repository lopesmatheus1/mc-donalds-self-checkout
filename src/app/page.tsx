import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center pt-20">
      {/* LOGO MCDONALDS */}
      <div className="mb-24 flex flex-col items-center">
        <Image
          alt=""
          src={"/mcLogo.png"}
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
      <div className="flex w-full items-center justify-around px-5">
        <Link href={"/restaurant"}>
          <div className="flex w-40 flex-col items-center gap-8">
            <Image
              alt="Para comer aqui"
              src={"/burger.png"}
              quality={100}
              width={80}
              height={80}
            />
            <span className="text-sm font-semibold">Para comer aqui</span>
          </div>
        </Link>

        <Link href={"/restaurant"}>
          <div className="flex w-40 flex-col items-center gap-8">
            <Image
              alt="Para levar"
              src={"/delivery.png"}
              quality={100}
              width={80}
              height={80}
            />
            <span className="text-sm font-semibold">Para levar</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
