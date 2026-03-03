import { Container } from "@/components/atoms";
import { getAllProducts, client } from "@/lib/clients/catalog";
import getMetadata from "@/lib/meta";


type Props = {
    params: Promise<{ id: string, locale: string }>;
}
export async function generateStaticParams() {
    // Fetch all products to pre-generate their pages at build time
    return getAllProducts()
}

export async function generateMetadata({ params }: Props) {
  const { locale, id } = await params;
  return getMetadata(id, locale);
}


export default async function ProductPage({ params }: Props) {
    const { id, locale } = await params;
    const productData = await client.getProductData(id, locale);
    return <Container maxWidth="xl" py="lg">Product Page {productData?.title}</Container>;
}