"use client";

import Link from "next/link";
import { Button, Grid, GridItem } from "../atoms";
import { Card, CardDescription, CardHeader, CardTitle } from "../blocks";
import { CatalogFilters, CatalogItemData } from "@/models/interfaces/catalog";
import type {
  ListingFetchContext,
  ListingFetchResult,
  PaginationData,
  ListingPageData,
} from "@/models/types/Listing";
import { client } from "@/lib/clients/catalog/item";
import { useAtom } from "jotai";
import { selectedFiltersAtom } from "@/store/jotai";
import { useHydrateAtoms } from "jotai/utils";
import { useCallback } from "react";
import PaginatedList from "../blocks/PaginatedList";

const ListingList = ({
  initialItems,
  initialFilters,
  initialPaginationData,
}: ListingPageData<CatalogItemData, CatalogFilters, number>) => {
  const hydratedFilters =
    (initialFilters as Record<string, unknown[]>) ?? { color: [] };

  // Initialize filters atom with default empty filters
  // keep it global to access it from other components and to persist filter state across navigations
  useHydrateAtoms([[selectedFiltersAtom, hydratedFilters]] as const);
  const [rawFilters] = useAtom(selectedFiltersAtom);
  const filters = (rawFilters ?? {}) as CatalogFilters;

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

  return (
    <PaginatedList
      initialItems={initialItems}
      filters={filters}
      fetchFunction={fetchItems}
      initialPaginationData={initialPaginationData}
      updateSearchParmasFunction={updateSearchParmasFunction}
      setPaginationForFilter={setPaginationForFilter}
      setPaginationForNextPage={setPaginationForNextPage}
    >
      {({ items, fetchNextPage, paginationData }) => (
        <div>
          <Grid layout="12-col" cols={1} colsMd={2} colsLg={4} gap="sm">
            {items.map((item) => (
              <GridItem key={item.id}>
                <Link
                  href={`/item/${item.id}?from=${paginationData?.page}`}
                  passHref
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription>
                        {item.description}- {item.color} - {item.size} -{" "}
                        {item.brand}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </GridItem>
            ))}
          </Grid>
          {paginationData?.hasMore && (
            <Button onClick={fetchNextPage}>Load more</Button>
          )}
        </div>
      )}
    </PaginatedList>
  );
};

export default ListingList;
