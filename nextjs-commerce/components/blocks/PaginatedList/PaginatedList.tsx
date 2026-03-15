import useListing from "@/hooks/useListing";
import {
  DelegatedFetchFunction,
  ListingFetchResult,
  PaginationData,
} from "@/models/types/Listing";
import { useEffect, useRef } from "react";

/**
 * Use Render Props to create a paginated list of items.
 * This component will handle the pagination logic and provide the necessary props to render the list and pagination controls.
 */

interface PaginatedListProps<T, F, TPage = number> {
  initialItems: T[];
  filters: F;
  fetchFunction: DelegatedFetchFunction<T, F, TPage>;
  updateSearchParmasFunction: (context: {
    filters: F;
    paginationData: PaginationData<TPage>;
  }) => void;
  setPaginationForNextPage: (
    paginationData: PaginationData<TPage>,
  ) => PaginationData<TPage>;
  setPaginationForFilter: (
    paginationData: PaginationData<TPage>,
  ) => PaginationData<TPage>;
  children: (
    listingData: ListingFetchResult<T, F, TPage> & {
      fetchNextPage: () => void;
    },
  ) => React.ReactNode;
  initialPaginationData: PaginationData<TPage>;
}

const PaginatedList = <T, F, TPage = number>({
  children,
  initialItems,
  filters,
  fetchFunction,
  initialPaginationData,
  updateSearchParmasFunction,
  setPaginationForNextPage,
  setPaginationForFilter,
}: PaginatedListProps<T, F, TPage>) => {
  const isInitialFilterEffect = useRef(true);
  const { items, paginationData, fetchNextPage, fetchFiltered } =
    useListing<T, F, TPage>({
      initialItems,
      filters,
      fetchFunction,
      initialPaginationData,
      updateSearchParmasFunction,
      setPaginationForNextPage,
      setPaginationForFilter,
    });

  useEffect(() => {
    // Skip the effect on the initial render to avoid refetching with default filters
    if (isInitialFilterEffect.current) {
      isInitialFilterEffect.current = false;
      return;
    }

    fetchFiltered();
    // do not add fetchFiltered to the dependency array to avoid infinite loop
  }, [filters]);

  if (!children) {
    return false;
  }

  return (
    <>
      {children({
        items,
        fetchNextPage,
        paginationData,
      })}
    </>
  );
};

export default PaginatedList;
