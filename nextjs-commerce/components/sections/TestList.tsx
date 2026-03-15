"use client";

import Link from "next/link";
import { Button, Grid, GridItem } from "../atoms";
import { Card, CardDescription, CardHeader, CardTitle } from "../blocks";
import { CatalogFilters, CatalogItemData } from "@/models/interfaces/catalog";
import type {
  ListingPageData,
} from "@/models/types/Listing";
import { useAtom } from "jotai";
import { selectedFiltersAtom } from "@/store/jotai";
import { useHydrateAtoms } from "jotai/utils";
import PaginatedList from "../blocks/PaginatedList";
import useTestList from "@/hooks/useTestList";

const TestList = ({
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

  const {
    updateSearchParmasFunction,
    fetchItems,
    setPaginationForFilter,
    setPaginationForNextPage,
  } = useTestList();
  
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

export default TestList;
