export interface PageData {
  title: string;
  description: string;
  content: string;
  slides: any[]; // Adjust this type based on your CMS's slide structure
}

export default function PageDataModel(data: any, slug: string): PageData | null {
  const page = data[slug];
  if (!page) return null;
  return {
    title: page.title,
    description: page.description,
    content: page.content,
    slides: page.slides,
  };
}
