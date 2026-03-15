import { useCallback, useEffect, useRef, useState } from "react";
import type {
  DelegatedFetchFunction,
  ListingFetchResult,
  PaginationData,
} from "@/models/types/Listing";

/* maintainer mode */

interface RunFetchOptions<TPage> {
  paginationData: PaginationData<TPage>;
  append: boolean;
  asLoadMore: boolean;
}

export interface ListingProps<
  TItem = unknown,
  TFilters = Record<string, unknown>,
  TPage = number,
> {
  /** Initial dataset, typically server-rendered data. */
  initialItems: TItem[];
  /** Active filter model controlled by the caller. */
  filters: TFilters;
  /**
   * Delegated fetch adapter.
   * Supports legacy shape (() => Promise<TItem[]>) and context-aware shape.
   */
  fetchFunction: DelegatedFetchFunction<TItem, TFilters, TPage>;
  /** If true, keeps cursor and filters mirrored in URL search params. */
  syncSearchParams?: boolean;
  /** Search param key used for cursor value. */
  cursorSearchParamKey?: string;
  /** Search param key used for serialized filters value. */
  filtersSearchParamKey?: string;
  /** Initial pagination data, typically server-rendered. */
  initialPaginationData: PaginationData<TPage>;

  /** Delegated function to update search params, receives current filters and pagination data. */
  updateSearchParmasFunction: (context: {
    filters: TFilters;
    paginationData: PaginationData<TPage>;
  }) => void;
  /** Delegated function to calculate next pagination data when filters change, receives current pagination data. */
  setPaginationForNextPage: (
    paginationData: PaginationData<TPage>,
  ) => PaginationData<TPage>;
  /** Delegated function to calculate next pagination data when loading next page, receives current pagination data. */
  setPaginationForFilter: (
    paginationData: PaginationData<TPage>,
  ) => PaginationData<TPage>;
}

const useListing = <
  TItem = unknown,
  TFilters = Record<string, unknown>,
  TPage = number,
>(
  props: ListingProps<TItem, TFilters, TPage>,
) => {
  const {
    initialItems,
    filters,
    fetchFunction,
    updateSearchParmasFunction,
    syncSearchParams = true,
    initialPaginationData,
    setPaginationForFilter,
    setPaginationForNextPage,
  } = props;
  const initialPage = initialPaginationData?.page;

  const [items, setItems] = useState<TItem[]>(initialItems);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [paginationData, setPaginationData] = useState<PaginationData<TPage>>(
    initialPaginationData,
  );
  const currentPage = paginationData?.page;
  const hasMore = Boolean(paginationData?.hasMore);

  const abortRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);

  const updateSearchParams = useCallback(
    (nextFilters: TFilters, paginationData: PaginationData<TPage>) => {
      if (!syncSearchParams) {
        return;
      }

      updateSearchParmasFunction({
        filters: nextFilters,
        paginationData,
      });
    },
    [syncSearchParams, updateSearchParmasFunction],
  );

  const runFetch = useCallback(
    async ({ paginationData, append, asLoadMore }: RunFetchOptions<TPage>) => {
      const emptyResult: ListingFetchResult<TItem, TFilters, TPage> = {
        items: [],
        paginationData: {
          page: initialPage,
          hasMore: false,
        },
      };

      abortRef.current?.abort();

      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;

      const controller = new AbortController();
      abortRef.current = controller;

      setError(null);
      if (asLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      try {
        const response = await (
          fetchFunction as DelegatedFetchFunction<TItem, TFilters, TPage>
        )({
          filters,
          paginationData,
          signal: controller.signal,
        });

        if (requestId !== requestIdRef.current) {
          return emptyResult;
        }

        setItems((prev) =>
          append ? [...prev, ...response.items] : response.items,
        );

        setPaginationData(response.paginationData);
      } catch (unknownError) {
        if (controller.signal.aborted) {
          return emptyResult;
        }

        setError(
          unknownError instanceof Error
            ? unknownError
            : new Error("Failed to fetch listing data"),
        );
      } finally {
        if (requestId !== requestIdRef.current) {
          return emptyResult;
        }

        if (asLoadMore) {
          setLoadingMore(false);
        } else {
          setLoading(false);
        }
      }
    },
    [fetchFunction, filters, initialPage],
  );

  const fetchFiltered = useCallback(async () => {
    const nextPaginationData = setPaginationForFilter(paginationData);

    await runFetch({
      paginationData: nextPaginationData,
      append: false,
      asLoadMore: false,
    });
  }, [paginationData, runFetch, setPaginationForFilter]);

  const fetchNextPage = useCallback(async () => {
    if (loading || loadingMore || !hasMore) {
      return;
    }

    const nextPaginationData = setPaginationForNextPage(paginationData);

    await runFetch({
      paginationData: nextPaginationData,
      append: true,
      asLoadMore: true,
    });
  }, [
    hasMore,
    loading,
    loadingMore,
    paginationData,
    runFetch,
    setPaginationForNextPage,
  ]);

  const refetch = useCallback(async () => {
    await fetchFiltered();
  }, [fetchFiltered]);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    requestIdRef.current += 1;
    setItems(initialItems);
    setPaginationData(initialPaginationData);
    setError(null);
    setLoading(false);
    setLoadingMore(false);
  }, [initialItems, initialPaginationData]);

  useEffect(() => {
    updateSearchParams(filters, paginationData);
  }, [paginationData, filters, updateSearchParams]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      requestIdRef.current += 1;
    };
  }, []);

  /**
   * Usage summary:
   * - Pass filters from caller state and provide a fetch adapter.
   * - Call fetchNextPage for infinite loading.
   * - Call fetchFiltered/refetch when filter values change and autoFetch is false.
   */
  return {
    items,
    loading,
    loadingMore,
    error,
    paginationData,
    hasMore,
    currentPage,
    fetchFiltered,
    fetchNextPage,
    refetch,
    reset,
  };
};

export default useListing;
