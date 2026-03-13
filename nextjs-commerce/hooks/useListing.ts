import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type {
  ListingFetchFunction,
  ListingFetchResult,
} from "@/models/types/Listing";

/* maintainer mode */

type DelegatedFetchFunction<TItem, TFilters> = ListingFetchFunction<
  TItem,
  TFilters,
  number
>;

interface RunFetchOptions {
  cursor?: number;
  append: boolean;
  asLoadMore: boolean;
}

interface ListingProps<
  TItem = unknown,
  TFilters = Record<string, unknown>,
> {
  /** Initial dataset, typically server-rendered data. */
  initialItems: TItem[];
  /** Active filter model controlled by the caller. */
  filters: TFilters;
  /** Starting cursor for first request (page number, token, id, etc). */
  cursor?: number;
  /**
   * Delegated fetch adapter.
   * Supports legacy shape (() => Promise<TItem[]>) and context-aware shape.
   */
  fetchFunction: DelegatedFetchFunction<TItem, TFilters>;
  /** If true, keeps cursor and filters mirrored in URL search params. */
  syncSearchParams?: boolean;
  /** Search param key used for cursor value. */
  cursorSearchParamKey?: string;
  /** Search param key used for serialized filters value. */
  filtersSearchParamKey?: string;
  /** Optional prop to set initial hasMore state from server */
  initialHasMore?: boolean; 
}


const useListing = <
  TItem = unknown,
  TFilters = Record<string, unknown>,
>(
  props: ListingProps<TItem, TFilters>,
) => {
  const {
    initialItems,
    filters,
    cursor,
    fetchFunction,
    syncSearchParams = true,
    cursorSearchParamKey = "page",
    filtersSearchParamKey = "filters",
    initialHasMore = true
  } = props;

  const searchParams = useSearchParams();

  const [items, setItems] = useState<TItem[]>(initialItems);
  const [currentCursor, setCurrentCursor] = useState<number | undefined>(
    cursor,
  );
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(initialHasMore);

  const abortRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);

  const updateSearchParams = useCallback(
    (nextFilters: TFilters, nextPage?: number) => {
      if (!syncSearchParams) {
        return;
      }

      const params = new URLSearchParams(searchParams.toString());

      if (nextPage === undefined || nextPage === null) {
        params.delete(cursorSearchParamKey);
      } else {
        params.set(cursorSearchParamKey, String(nextPage));
      }

      const serializedFilters = JSON.stringify(nextFilters ?? {});
      if (serializedFilters === "{}") {
        params.delete(filtersSearchParamKey);
      } else {
        params.set(filtersSearchParamKey, serializedFilters);
      }

      const nextQuery = params.toString();
      const currentQuery = searchParams.toString();

      if (nextQuery === currentQuery) {
        return;
      }
      // use native history API to avoid app reloading
      // https://nextjs.org/docs/app/getting-started/linking-and-navigating#native-history-api
      window.history.pushState(null, "", `?${params.toString()}`);
    },
    [
      cursorSearchParamKey,
      filtersSearchParamKey,
      searchParams,
      syncSearchParams,
    ],
  );

  const normalizeResult = useCallback(
    (
      result: ListingFetchResult<TItem, number> | TItem[],
      requestedCursor?: number,
    ): ListingFetchResult<TItem, number> => {
      if (Array.isArray(result)) {
        return {
          items: result,
          nextPage: requestedCursor,
          hasMore: result.length > 0,
        };
      }

      return {
        items: result.items,
        nextPage: result.nextPage,
        hasMore:
          typeof result.hasMore === "boolean"
            ? result.hasMore
            : result.nextPage !== undefined || result.items.length > 0,
      };
    },
    [],
  );

  const runFetch = useCallback(
    async ({
      cursor: nextPage,
      append,
      asLoadMore,
    }: RunFetchOptions) => {
      const emptyResult: ListingFetchResult<TItem, number> = {
        items: [],
        nextPage: undefined,
        hasMore: false,
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
        const response = await (fetchFunction as DelegatedFetchFunction<TItem, TFilters>)({
          filters,
          cursor: nextPage,
          signal: controller.signal,
        });

        if (requestId !== requestIdRef.current) {
          return emptyResult;
        }

        const normalized = normalizeResult(response, nextPage);

        setItems((prev) =>
          append ? [...prev, ...normalized.items] : normalized.items,
        );

        setCurrentCursor(normalized.nextPage ?? nextPage);
        setHasMore(Boolean(normalized.hasMore));
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
    [fetchFunction, filters, normalizeResult],
  );

  const fetchFiltered = useCallback(async () => {
    // Reset to first page when filters change
    // use currentCursor, and pass getFromStart if you want to keep the same page
    // I prefer resetting to first page to avoid edge cases with filters that reduce total pages and to simplify the API
    setCurrentCursor(1);
    await runFetch({ cursor: 1, append: false, asLoadMore: false });
  }, [runFetch]);

  const fetchNextPage = useCallback(async () => {
    if (loading || loadingMore || !hasMore) {
      return;
    }

    await runFetch({
      cursor: (currentCursor ?? 0) + 1,
      append: true,
      asLoadMore: true,
    });
  }, [currentCursor, hasMore, loading, loadingMore, runFetch]);

  const refetch = useCallback(async () => {
    await fetchFiltered();
  }, [fetchFiltered]);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    requestIdRef.current += 1;
    setItems(initialItems);
    setCurrentCursor(cursor);
    setHasMore(initialItems.length > 0);
    setError(null);
    setLoading(false);
    setLoadingMore(false);
  }, [cursor, initialItems]);

  useEffect(() => {
    updateSearchParams(filters, currentCursor);
  }, [currentCursor, filters, updateSearchParams]);

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
    hasMore,
    currentCursor,
    fetchFiltered,
    fetchNextPage,
    refetch,
    reset,
  };
};

export default useListing;
