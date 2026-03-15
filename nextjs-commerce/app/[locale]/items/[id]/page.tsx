import ListingPage from "@/components/pages/ListingPage";
import { client } from "@/lib/clients/catalog/category";
import { client as itemsClient } from "@/lib/clients/catalog/item";
import getMetadata from "@/lib/meta";
import type { CatalogFilters, CatalogItemData } from "@/models/interfaces/catalog";
import type { ListingPageData } from "@/models/types/Listing";


type Props = {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{ page?: string; q?: string; filters?: string }>;
};

export async function generateStaticParams() {
    // Fetch all items to pre-generate their pages at build time
    return await client.getAllCategories()
}

export async function generateMetadata({ params }: Props) {
  const { locale, id } = await params;
  return getMetadata(id, locale);
}


export default async function ItemsPage({ params, searchParams }: Props) {
  const { locale, id } = await params;
  const { page, filters } = await searchParams;
  const options = { page: parseInt(page || "1"), filters: filters ? JSON.parse(filters) : {color: []}, getFromStart: true };
  const categoryData = await client.getCategoryData(id, locale, options);
  const data = await itemsClient.getCatalogItems(locale, options);
  const listingData: ListingPageData<CatalogItemData, CatalogFilters, number> = {
    initialItems: data.items,
    initialFilters: options.filters,
    initialPaginationData: {
      page: options.page,
      hasMore: data.paginationData?.hasMore,
    }
  };

  return (
    <ListingPage
      categoryData={categoryData}
      listingData={listingData}
    />
  );
}
