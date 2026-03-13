/**
 * Maintainer mode
 */

import {
  CatalogCategoryDataModel,
} from "@/models/models/catalog";
import BaseClient from "../baseClient";

class CatalogClient extends BaseClient {

  async getCategoryData(id: string, locale: string, options?: { page?: number; q?: string }) {
    const data = await this.request<any[]>({
      query: id,
      method: "GET",
      headers: {},
    });
  
    return CatalogCategoryDataModel(data, id)

  }

  async getAllCategories() {
    return ["1", "2"];
  }
}

export const client = new CatalogClient({
  basePath: "categories",
  tag: "CatalogClient",
});

