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
    /* const res = await fetch(`${process.env.CMS_API_URL}/pages`);
  if (!res.ok) return []; */
    return ["product", "test"];
  }
}

export const client = new CMSClient({
  basePath: "pages",
  tag: "CMSClient",
});
