import { client } from "@/lib/clients/catalog/item";
import { CatalogFilters, CatalogItemData } from "@/models/interfaces/catalog";
import { ListingFetchContext, ListingFetchResult, PaginationData } from "@/models/types/Listing";
import { useCallback } from "react";

const useTestList = () => {
  const setPaginationForFilter = (paginationData: PaginationData<number>) => ({
    ...paginationData,
    page: 1,
    hasMore: true,
  });

  const setPaginationForNextPage = (
    paginationData: PaginationData<number>,
  ) => ({
    ...paginationData,
    page: (paginationData?.page ?? 0) + 1,
  });

  const updateSearchParmasFunction = useCallback(
    ({
      filters,
      paginationData,
    }: {
      filters: CatalogFilters;
      paginationData: PaginationData<number>;
    }) => {
      const params = new URLSearchParams(window.location.search);
      const page = paginationData.page;

      if (page === undefined || page === null) {
        params.delete("page");
      } else {
        params.set("page", String(page));
      }

      const serializedFilters = JSON.stringify(filters ?? {});
      if (serializedFilters === "{}") {
        params.delete("filters");
      } else {
        params.set("filters", serializedFilters);
      }

      const nextQuery = params.toString();
      const currentQuery = window.location.search.replace("?", "");

      if (nextQuery === currentQuery) {
        return;
      }

      const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ""}${window.location.hash}`;
      window.history.pushState(null, "", nextUrl);
    },
    [],
  );

  // fetchItems is called by the PaginatedList component for loadmore or filter requests
  // It defines the logic to call for loading items
  const fetchItems = async ({
    filters,
    paginationData,
    getFromStart,
  }: ListingFetchContext<CatalogFilters, number>): Promise<
    ListingFetchResult<CatalogItemData, CatalogFilters, number>
  > => {
    const data = await client.getCatalogItems("en", {
      page: paginationData?.page,
      filters,
      getFromStart,
    });

    return {
      items: data.items as CatalogItemData[],
      paginationData: data.paginationData,
    };
  };

  return {
    updateSearchParmasFunction,
    fetchItems,
    setPaginationForFilter,
    setPaginationForNextPage,
  }
};

export default useTestList;
