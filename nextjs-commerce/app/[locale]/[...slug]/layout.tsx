import getMetadata from "@/lib/meta";
import React from "react";

type Props = {
  params: Promise<{ locale: string; slug: string[] }>;
};


export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  return getMetadata(slug.join("/"), locale);
}


export default async function CmsLayout({ children, params }: React.PropsWithChildren<Props>) {
    

    return (<div>{children}</div>)
}