import { CatalogCategoryData, CatalogItemData } from "../interfaces/catalog";

export function CatalogItemDataModel(data: any, id: string): CatalogItemData {
  const item = data.find((p: CatalogItemData) => p.id === id);
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    content: item.content,
    slides: item.slides,
    color: item.color,
    size: item.size,
    brand: item.brand,
  };
}

export function CatalogCategoryDataModel(
  data: any,
  id: string,
): CatalogCategoryData {
  const currentCategoryData = data.find((cat: any) => cat.id === id);
  return {
    id: currentCategoryData.id,
    title: currentCategoryData.name,
    description: currentCategoryData.description,
    items: currentCategoryData.items || [], // Assuming items are part of the category data, adjust as needed
  };
}
