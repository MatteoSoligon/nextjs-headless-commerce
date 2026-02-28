export async function getProductData(id: string, locale: string) {
  // Replace with your actual data fetching logic
  const res = await fetch(
    `${process.env.CMS_API_URL}/products`,
    { next: { revalidate: 600 } } // ISR: revalidate every 10 minutes
  );
  if (!res.ok) return null;

  const data = await res.json();
  const page = data.find((product: any) => product.id == id);
  return page ?? null;
}

export async function getAllProducts() {
  /* const res = await fetch(`${process.env.CMS_API_URL}/pages`);
  if (!res.ok) return []; */
  return ['1', '2']
}

