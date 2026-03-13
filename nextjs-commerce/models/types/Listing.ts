/* maintainer mode */

export interface ListingFetchContext<TFilters, TPage = number> {
  filters: TFilters;
  cursor?: TPage;
  signal?: AbortSignal;
}

export interface ListingFetchResult<TItem, TPage = number> {
  items: TItem[];
  nextPage?: TPage;
  hasMore?: boolean;
}

export interface ListingPageData<
  TItem,
  TFilters,
  TPage = number,
> {
  initialItems: TItem[];
  initialPage?: TPage;
  initialFilters?: TFilters;
  initialHasMore?: boolean;
}

export type ListingFetchFunction<TItem, TFilters, TPage = number> = (
  context: ListingFetchContext<TFilters, TPage>,
) => Promise<ListingFetchResult<TItem, TPage> | TItem[]>;