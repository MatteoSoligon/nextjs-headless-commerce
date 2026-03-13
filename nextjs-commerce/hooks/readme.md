## Example for useListing ##

# With rest api # 
type Item = { id: string; title: string };
type Filters = { color?: string[]; size?: string[] };

const fetchItems = async ({ filters, cursor, signal }: {
  filters: Filters;
  cursor?: number;
  signal?: AbortSignal;
}) => {
  const params = new URLSearchParams();
  if (cursor) params.set("page", String(cursor));
  if (filters.color?.length) params.set("color", filters.color.join(","));
  if (filters.size?.length) params.set("size", filters.size.join(","));

  const res = await fetch(`/api/items?${params.toString()}`, { signal });
  const data = await res.json();

  return {
    items: data.items as Item[],
    nextPage: data.nextPage as number | undefined,
    hasMore: data.hasMore as boolean,
  };
};

# With gql #
const fetchItems = async ({ filters, cursor, signal }) => {
  const query = `
    query Items($filters: ItemFilterInput, $cursor: String) {
      items(filters: $filters, cursor: $cursor) {
        nodes { id title }
        pageInfo { endCursor hasNextPage }
      }
    }
  `;

  const res = await fetch("/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables: { filters, cursor } }),
    signal,
  });

  const json = await res.json();
  const page = json.data.items;

  return {
    items: page.nodes,
    nextPage: page.pageInfo.endCursor,
    hasMore: page.pageInfo.hasNextPage,
  };
};

## Hook usage ##

const {
  items,
  loading,
  loadingMore,
  hasMore,
  fetchNextPage,
  fetchFiltered,
} = useListing<Item, Filters, number>({
  initialItems,
  filters,
  cursor: 1,
  fetchFunction: fetchItems,
  autoFetch: true,
});
