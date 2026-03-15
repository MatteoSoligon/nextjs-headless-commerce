/* maintainer mode */

export interface ListingFetchContext<TFilters, TPage = number> {
  filters: TFilters;
  signal?: AbortSignal;
  getFromStart?: boolean;
  paginationData?: PaginationData<TPage>;
}

export interface ListingFetchResult<TItem, TFilters, TPage = number> {
  items: TItem[];
  filters?: TFilters;
  paginationData: PaginationData<TPage>;
}

export interface ListingPageData<
  TItem,
  TFilters,
  TPage = number,
> {
  initialItems: TItem[];
  initialFilters?: TFilters;
  initialPaginationData: PaginationData<TPage>;
}

export type ListingFetchFunction<TItem, TFilters, TPage = number> = (
  context: ListingFetchContext<TFilters, TPage>,
) => Promise<ListingFetchResult<TItem, TFilters, TPage>>;

export type PaginationData<TPage = number> = {
  page: TPage;
  hasMore?: boolean;
  [key: string]: unknown;
}

export type DelegatedFetchFunction<
  TItem,
  TFilters,
  TPage = number,
> = ListingFetchFunction<
  TItem,
  TFilters,
  TPage
>;