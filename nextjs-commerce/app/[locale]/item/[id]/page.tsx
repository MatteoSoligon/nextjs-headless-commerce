import DetailsPage from "@/components/pages/DetailsPage";
import { client } from "@/lib/clients/catalog/item";
import getMetadata from "@/lib/meta";


type Props = {
    params: Promise<{ id: string, locale: string }>;
}
export async function generateStaticParams() {
    // Fetch all items to pre-generate their pages at build time
    return await client.getAllItems()
}

export async function generateMetadata({ params }: Props) {
  const { locale, id } = await params;
  return getMetadata(id, locale);
}


export default async function ItemPage({ params }: Props) {
    const { id, locale } = await params;
    const itemData = await client.getCatalogItemData(id, locale);
    return <DetailsPage itemData={itemData} />;
}