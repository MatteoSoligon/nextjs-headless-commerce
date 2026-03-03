import Image from "next/image";

import { Container, Heading } from "@/components/atoms";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import Slider from "@/components/atoms/Slider";
import getMetadata from "@/lib/meta";
import { client } from "@/lib/clients/cms";



export async function generateMetadata({ params }: any) {
  const { locale } = await params;
  return getMetadata("home", locale);
}

export default async function Home({ params }: any) {
  const { locale } = await params;
  const t = await getTranslations("HomePage");
  const pageData = await client.getPageBySlug('home', locale);

  const sliderItems = pageData.slides.map((item: any, i: number) => (
    <div key={item.id}>
      <p>{item.content}</p>
      <Image
        className=""
        src={item.src}
        alt={item.alt}
        width={item.width}
        height={item.height}
        priority
        fetchPriority={i === 0 ? "high" : "auto"}
      />
    </div>
  ));

  return (
    <Container maxWidth="xl" py="lg">
      <Heading level="h2" className="mb-6">
        {t("title")}
      </Heading>
      <Suspense>
        <div className="w-full">
          <Slider>{sliderItems}</Slider>
        </div>
      </Suspense>
    </Container>
  );
}
