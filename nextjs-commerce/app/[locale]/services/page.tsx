import Image from "next/image";

import Slider from "@/components/blocks/Slider";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

const getPageData = async (locale: string) => {
  const res = await fetch(
    `http://localhost:3000/pages/contact.json?locale=${locale}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch home page data");
  }
  return res.json();
}

export default async function Home() {
  const t = await getTranslations("HomePage");
  const pageData = await getPageData("en");

  const sliderItems = pageData.map((item: any, i: number) => (
    <div key={item.id}>
      <p>{item.content}</p>
      <Image
        className=""
        src="/Moon_-_iPhone_-_29April12.jpg"
        alt={item.alt}
        width={3000}
        height={2000}
        priority
        fetchPriority={i === 0 ? "high" : "auto"}
      />
    </div>
  ))

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main>
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-foreground dark:text-zinc-50">
          {t("title")} Service page
        </h1>
        <Suspense>
          <div className="w-[500px]">
            <Slider
            >
              {sliderItems}
            </Slider>
          </div>
        </Suspense>
      </main>
    </div>
  );
}
