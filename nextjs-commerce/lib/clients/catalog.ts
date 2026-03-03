import BaseClient from "./baseClient";

export async function getAllProducts() {
  /* const res = await fetch(`${process.env.CMS_API_URL}/pages`);
  if (!res.ok) return []; */
  return ['1', '2']
}

class CatalogClient extends BaseClient {
  async getProductData(id: string, locale: string) {
    const data = await this.request<any[]>({ query: id, method: "GET", headers: {} });
    const prod = data.find(p => p.id === id);
    return prod ?? null;
  }
}

export const client = new CatalogClient({
  basePath: 'products',
  tag: 'CatalogClient',
});


