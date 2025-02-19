import { ConsuptionMethod } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
interface ConsumptionMethodOptionProps {
  imageUrl: string;
  buttonText: string;
  imageAlt: string;
  option: ConsuptionMethod;
  slug: string;
}

const ConsumptionMethodOption = ({
  buttonText,
  imageAlt,
  imageUrl,
  option,
  slug,
}: ConsumptionMethodOptionProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-8">
        <div className="relative h-20 w-20">
          <Image
            alt={imageAlt}
            src={imageUrl}
            quality={100}
            fill
            className="object-contain"
          />
        </div>
        <Button
          variant={"secondary"}
          className="rounded-full bg-accent-foreground/20 hover:bg-accent-foreground/10"
          asChild
        >
          <Link href={`/${slug}/menu?consumptionMethod=${option}`}>
            {buttonText}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConsumptionMethodOption;
