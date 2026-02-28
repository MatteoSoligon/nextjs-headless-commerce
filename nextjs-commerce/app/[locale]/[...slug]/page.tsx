import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getPageBySlug, getAllPages } from "@/lib/cms";
import getMetadata from "@/lib/meta";

type Props = {
  params: Promise<{ locale: string; slug: string[] }>;
};

// Pre-generate known CMS pages at build time
export async function generateStaticParams() {
  const pages = await getAllPages();
  return pages
}

export default async function CmsPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);;

  const page = await getPageBySlug(slug.join("/"), locale);

  if (!page) {
    notFound();
  }

  // Render CMS content — adapt to your CMS's content model
  return (
    <main>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </main>
  );
}