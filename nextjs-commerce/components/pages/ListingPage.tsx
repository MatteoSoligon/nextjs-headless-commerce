import { CatalogCategoryData, CatalogFilters, CatalogItemData } from "@/models/interfaces/catalog";
import type { ListingPageData } from "@/models/types/Listing";
import ListingFilters from "../blocks/Filters/Filters";
import ListingList from "../sections/ListingList";
import { Container } from "../atoms";
import { Suspense } from "react";

interface Props {
  categoryData: CatalogCategoryData;
  listingData: ListingPageData<CatalogItemData, CatalogFilters, number>;
}

const ListingPage = async ({
  categoryData,
  listingData,
}: Props) => {
  return (
    <Container maxWidth="xl" py="lg">
      <h1>{categoryData.title}</h1>
      <p>{categoryData.description}</p>
      <Suspense>
        <ListingFilters />
      </Suspense>
      <Suspense>
        <ListingList
          initialItems={listingData.initialItems}
          initialPage={listingData.initialPage}
          initialFilters={listingData.initialFilters}
          initialHasMore={listingData.initialHasMore}
        />
      </Suspense>
    </Container>
  );
};

export default ListingPage;
