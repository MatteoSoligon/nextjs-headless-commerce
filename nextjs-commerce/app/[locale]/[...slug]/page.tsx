import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { client } from "@/lib/clients/cms";
import getMetadata from "@/lib/meta";

type Props = {
  params: Promise<{ locale: string; slug: string[] }>;
};

// Pre-generate known CMS pages at build time
export async function generateStaticParams() {
  const pages = await client.getAllPages();
  return pages
}


export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  return getMetadata(slug.join("/"), locale);
}



export default async function CmsPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);;

  const page = await client.getPageBySlug(slug.join("/"), locale);

  if (!page) {
    notFound();
  }

  // Render CMS content — adapt to your CMS's content model
  return (
    <div>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
}