# useListing

Generic React hook for paginated, filterable listings with full delegation over pagination transitions and URL sync.

---

## Architecture

The hook follows a **delegation pattern**: all pagination logic and URL handling is provided by the caller, not hardcoded in the hook. This makes `useListing` reusable across pagination strategies (page numbers, cursors, offsets) and keeps listing-specific behavior in the component layer.

```
SpecificListingComponent (owns pagination rules + URL behavior)
  └─ PaginatedList (render-prop wrapper, manages filter re-fetch side effect)
       └─ useListing (core: fetch lifecycle, loading state, abort, item accumulation)
            └─ fetchFunction / setPaginationForFilter / setPaginationForNextPage / updateSearchParmasFunction
               (all provided by caller via delegation)
```

### Key design decisions

- **`PaginationData<TPage>`** replaces separate `page`/`hasMore`/`cursor` props. It is an open object `{ page: TPage; hasMore?: boolean; [key: string]: unknown }` so callers can attach extra fields (e.g. `totalCount`, `endCursor`).
- **`setPaginationForFilter`** — pure function called when filters change. The caller controls what the "reset" looks like (e.g. reset to page 1, or keep page but clear cursor).
- **`setPaginationForNextPage`** — pure function called when loading more. The caller controls how the page/cursor advances.
- **`updateSearchParmasFunction`** — called by the hook whenever filters or pagination change. The caller owns the URL structure and push strategy.
- **Race conditions** are prevented by computing `nextPaginationData` once per action and using the same value for both state update and the outgoing fetch request.

---

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `initialItems` | `TItem[]` | ✓ | Server-rendered initial dataset |
| `filters` | `TFilters` | ✓ | Active filter model, controlled by the caller |
| `fetchFunction` | `DelegatedFetchFunction<TItem, TFilters, TPage>` | ✓ | Fetch adapter — receives `{ filters, paginationData, signal }` |
| `initialPaginationData` | `PaginationData<TPage>` | ✓ | Initial pagination state, typically passed from server |
| `setPaginationForFilter` | `(prev: PaginationData<TPage>) => PaginationData<TPage>` | ✓ | Returns new pagination when filters change |
| `setPaginationForNextPage` | `(prev: PaginationData<TPage>) => PaginationData<TPage>` | ✓ | Returns new pagination for load-more |
| `updateSearchParmasFunction` | `(ctx: { filters, paginationData }) => void` | ✓ | Caller-owned URL sync handler |
| `syncSearchParams` | `boolean` | — | Set `false` to disable URL sync entirely (default: `true`) |

---

## Return value

```ts
{
  items: TItem[];
  loading: boolean;        // full-page load in progress
  loadingMore: boolean;    // load-more in progress
  error: Error | null;
  paginationData: PaginationData<TPage>;
  hasMore: boolean;        // shorthand for paginationData.hasMore
  currentPage: TPage;      // shorthand for paginationData.page
  fetchFiltered: () => Promise<void>;
  fetchNextPage: () => Promise<void>;
  refetch: () => Promise<void>;
  reset: () => void;
}
```

---

## Examples

### Fetch adapter — REST API

```ts
type Item = { id: string; title: string };
type Filters = { color?: string[]; size?: string[] };

const fetchItems = async ({
  filters,
  paginationData,
  signal,
}: ListingFetchContext<Filters, number>): Promise<
  ListingFetchResult<Item, Filters, number>
> => {
  const params = new URLSearchParams();
  if (paginationData?.page) params.set("page", String(paginationData.page));
  if (filters.color?.length) params.set("color", filters.color.join(","));
  if (filters.size?.length) params.set("size", filters.size.join(","));

  const res = await fetch(`/api/items?${params.toString()}`, { signal });
  const data = await res.json();

  return {
    items: data.items as Item[],
    paginationData: {
      page: data.page as number,
      hasMore: data.hasMore as boolean,
    },
  };
};
```

### Fetch adapter — GraphQL (cursor-based)

```ts
type CursorPage = { endCursor: string | null; hasNextPage: boolean };

const fetchItems = async ({
  filters,
  paginationData,
  signal,
}: ListingFetchContext<Filters, CursorPage>): Promise<
  ListingFetchResult<Item, Filters, CursorPage>
> => {
  const res = await fetch("/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: `
        query Items($filters: ItemFilterInput, $cursor: String) {
          items(filters: $filters, after: $cursor) {
            nodes { id title }
            pageInfo { endCursor hasNextPage }
          }
        }
      `,
      variables: { filters, cursor: paginationData?.page?.endCursor },
    }),
    signal,
  });

  const json = await res.json();
  const page = json.data.items;

  return {
    items: page.nodes,
    paginationData: {
      page: { endCursor: page.pageInfo.endCursor, hasNextPage: page.pageInfo.hasNextPage },
      hasMore: page.pageInfo.hasNextPage,
    },
  };
};
```

### Direct hook usage

```tsx
const {
  items,
  loading,
  loadingMore,
  hasMore,
  paginationData,
  fetchNextPage,
  fetchFiltered,
  reset,
} = useListing<Item, Filters, number>({
  initialItems,
  filters,
  fetchFunction: fetchItems,
  initialPaginationData: { page: 1, hasMore: true },

  // Reset to page 1 when filters change
  setPaginationForFilter: (prev) => ({ ...prev, page: 1, hasMore: true }),

  // Advance page on load-more
  setPaginationForNextPage: (prev) => ({ ...prev, page: prev.page + 1 }),

  // Caller owns URL structure
  updateSearchParmasFunction: ({ filters, paginationData }) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", String(paginationData.page));
    const f = JSON.stringify(filters);
    f === "{}" ? params.delete("filters") : params.set("filters", f);
    window.history.pushState(null, "", `?${params.toString()}`);
  },
});
```

### Via PaginatedList component (recommended for UI)

`PaginatedList` is a render-prop wrapper that handles the filter change side-effect and exposes listing state via children. It accepts all delegation callbacks and forwards them to `useListing`.

```tsx
<PaginatedList<Item, Filters, number>
  initialItems={initialItems}
  filters={filters}
  fetchFunction={fetchItems}
  initialPaginationData={{ page: 1, hasMore: true }}
  setPaginationForFilter={(prev) => ({ ...prev, page: 1, hasMore: true })}
  setPaginationForNextPage={(prev) => ({ ...prev, page: prev.page + 1 })}
  updateSearchParmasFunction={({ filters, paginationData }) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", String(paginationData.page));
    window.history.pushState(null, "", `?${params.toString()}`);
  }}
>
  {({ items, fetchNextPage, paginationData }) => (
    <div>
      {items.map((item) => <ItemCard key={item.id} item={item} />)}
      {paginationData?.hasMore && (
        <button onClick={fetchNextPage}>Load more</button>
      )}
    </div>
  )}
</PaginatedList>
```
