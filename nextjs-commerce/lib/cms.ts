// Adapt these functions to your CMS (Contentful, Sanity, Strapi, etc.)

export async function getPageBySlug(slug: string, locale: string) {
  // Example: fetch from your CMS API
  const res = await fetch(
    `${process.env.CMS_API_URL}/pages?locale=${locale}`,
    { next: { revalidate: 600 } } // ISR: revalidate every 10 minutes
  );

  if (!res.ok) return null;

  const data = await res.json();
  const page = data[slug]
  return page ?? null;
}

export async function getAllPages() {
  /* const res = await fetch(`${process.env.CMS_API_URL}/pages`);
  if (!res.ok) return []; */
  return ['product', 'test']
}