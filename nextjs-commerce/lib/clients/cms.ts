/**
 * Maintainer mode
 */
// Adapt these functions to your CMS (Contentful, Sanity, Strapi, etc.)

import PageDataModel, { PageData } from "@/models/interfaces/cms";
import BaseClient from "./baseClient";
class CMSClient extends BaseClient {
  async getPageBySlug(slug: string, locale: string) {
    const data = await this.request<Record<string, PageData>>({
      query: slug,
      method: "GET",
      headers: {},
    });
    return PageDataModel(data, slug) ?? null;
  }
  async getAllPages() {
    // TODO: Implement actual API call to fetch all pages from your CMS
    return ["product", "test"];
  }
}

export const client = new CMSClient({
  basePath: "pages",
  tag: "CMSClient",
});
