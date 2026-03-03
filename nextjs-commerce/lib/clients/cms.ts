// Adapt these functions to your CMS (Contentful, Sanity, Strapi, etc.)

import BaseClient from "./baseClient";

export async function getAllPages() {
  /* const res = await fetch(`${process.env.CMS_API_URL}/pages`);
  if (!res.ok) return []; */
  return ['product', 'test']
}

class CMSClient extends BaseClient {
  async getPageBySlug(slug: string, locale: string) {
    
    const data = await this.request({ query: slug, method: "GET", headers: {} });
    const page = data[slug]
    return page ?? null;
  }
}

export const client = new CMSClient({
  basePath: 'pages',
  tag: 'CMSClient',
});