/**
 * Maintainer mode
 */
import CatalogItemDataModel from "@/models/interfaces/catalog";
import BaseClient from "./baseClient";

class CatalogClient extends BaseClient {
  async getCatalogItemData(id: string, locale: string) {
    const data = await this.request<any[]>({
      query: id,
      method: "GET",
      headers: {},
    });
    return CatalogItemDataModel(data, id) ?? null;
  }

  async getAllProducts() {
    // TODO: Implement actual API call to fetch all products from your CMS
    return ["1", "2"];
  }
}

export const client = new CatalogClient({
  basePath: "products",
  tag: "CatalogClient",
});
