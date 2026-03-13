"use client";

import Link from "next/link";
import { Button, Grid, GridItem } from "../atoms";
import { Card, CardDescription, CardHeader, CardTitle } from "../blocks";
import useListing from "@/hooks/useListing";
import { CatalogFilters, CatalogItemData } from "@/models/interfaces/catalog";
import type { ListingFetchResult, ListingPageData } from "@/models/types/Listing";
import { client } from "@/lib/clients/catalog/item";
import { useAtom } from "jotai";
import { selectedFiltersAtom } from "@/store/jotai";
import { useEffect, useRef } from "react";
import { useHydrateAtoms } from 'jotai/utils'


const ListingList = ({
  initialItems,
  initialPage,
  initialFilters,
  initialHasMore = true,
}: ListingPageData<CatalogItemData, CatalogFilters, number>) => {
  const resolvedInitialPage = initialPage ?? 1;
  const resolvedInitialFilters = initialFilters ?? {};

  useHydrateAtoms([[selectedFiltersAtom, resolvedInitialFilters]]); // Initialize filters atom with default empty filters
  const [filters] = useAtom(selectedFiltersAtom);
  const isInitialFilterEffect = useRef(true);

  const fetchItems = async ({
    filters,
    cursor,
    signal,
    getFromStart
  }: {
    filters: CatalogFilters;
    cursor?: number;
    signal?: AbortSignal;
    getFromStart?: boolean;
  }): Promise<ListingFetchResult<CatalogItemData, number>> => {
    void signal;

    const data = await client.getCatalogItems("en", {
      page: cursor,
      filters: filters,
      getFromStart
    });

    return {
      items: data.items as CatalogItemData[],
      nextPage: data?.nextPage as number | undefined,
      hasMore: data?.hasMore as boolean,
    };
  };

  const { items, hasMore, fetchNextPage, fetchFiltered } =
    useListing<CatalogItemData, CatalogFilters>({
      initialItems,
      filters,
      cursor: resolvedInitialPage,
      fetchFunction: fetchItems,
      initialHasMore,
    });

  useEffect(() => {
    // Skip the effect on the initial render to avoid refetching with default filters
    if (isInitialFilterEffect.current) {
      isInitialFilterEffect.current = false;
      return;
    }

    fetchFiltered();
  }, [filters]);
  
  return (
    <div>
      <Grid layout="12-col" cols={1} colsMd={2} colsLg={4} gap="sm">
        {items.map((item) => (
          <GridItem key={item.id}>
            <Link href={`/item/${item.id}`} passHref>
              <Card>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}
                    - {item.color} - {item.size} - {item.brand}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </GridItem>
        ))}
      </Grid>
      {hasMore && <Button onClick={fetchNextPage}>Load more</Button>}
    </div>
  );
};

export default ListingList;

