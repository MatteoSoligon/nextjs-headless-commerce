export interface CatalogItemData {
  id: string;
  title: string;
  description: string;
  content: string;
  slides: any[]; // Adjust this type based on your CMS's slide structure
}

export default function CatalogItemDataModel(data: any, id: string): CatalogItemData {
  const item = data.find((p: CatalogItemData) => p.id === id);
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    content: item.content,
    slides: item.slides,
  };
}
