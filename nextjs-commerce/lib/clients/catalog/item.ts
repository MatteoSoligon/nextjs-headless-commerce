/**
 * Maintainer mode
 */

import { CatalogItemDataModel } from "@/models/models/catalog";
import BaseClient from "../baseClient";
import { CatalogFilters, CatalogItemData } from "@/models/interfaces/catalog";
import { ListingFetchResult } from "@/models/types/Listing";

const ITEMS_PER_PAGE = 4; // Adjust as needed

class CatalogClient extends BaseClient {
  async getCatalogItemData(id: string, locale: string) {
    const data = await this.request<any[]>({
      query: id,
      method: "GET",
      headers: {},
    });
    return CatalogItemDataModel(data, id) ?? null;
  }


  async getCatalogItems(
    locale: string,
    options?: { page?: number; q?: string; filters?: CatalogFilters; getFromStart?: boolean },
  ): Promise<ListingFetchResult<CatalogItemData, CatalogFilters, number>> {
    const data  = await this.request<any[]>({
      query: "/",
      method: "GET",
      headers: {},
    });

    const cursor = {
      start: options?.getFromStart ? 0 : ITEMS_PER_PAGE * ((options?.page || 1) - 1),
      end: ITEMS_PER_PAGE * (options?.page || 1),
    }

    const filteredData = data.filter((item) => {
      return options?.filters?.color?.length ? options?.filters?.color.includes(item.color) : true
    })


    return {
      items: filteredData.map((item) => CatalogItemDataModel(data, item.id)).slice(cursor.start, cursor.end), // Simple pagination logic, adjust as needed
      page: options?.page,
      hasMore: filteredData.length > cursor.end, // Simple heuristic, adjust as needed
      filters: options?.filters,
    };
  }

  async getAllItems() {
    const { data } = await this.request<any[]>({
      query: "",
      method: "GET",
      headers: {},
    });
    // TODO: Implement actual API call to fetch all items from your CMS
    return ["item1", "item2", "item3"]; // Placeholder return value
  }
}

export const client = new CatalogClient({
  basePath: "items",
  tag: "CatalogClient",
});
