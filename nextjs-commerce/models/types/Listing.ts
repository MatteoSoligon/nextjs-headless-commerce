/* maintainer mode */

export interface ListingFetchContext<TFilters, TPage = number> {
  filters: TFilters;
  page?: TPage;
  signal?: AbortSignal;
}

export interface ListingFetchResult<TItem, TFilters, TPage = number> {
  items: TItem[];
  page?: TPage;
  hasMore?: boolean;
  filters?: TFilters;
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
) => Promise<ListingFetchResult<TItem, TFilters, TPage>>;