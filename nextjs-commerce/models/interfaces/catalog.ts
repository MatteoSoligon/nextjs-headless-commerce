export interface CatalogItemData {
  id: string;
  title: string;
  description: string;
  content: string;
  slides?: any[]; // Adjust this type based on your CMS's slide structure
  color?: string; // Example filterable attribute
  size?: string; // Example filterable attribute
  brand?: string; // Example filterable attribute
}

export interface CatalogCategoryData {
  id: string;
  title: string;
  description: string;
  items?: CatalogItemData[]; // Assuming categories have items, adjust as needed
}

export interface CatalogFilters {
  [key: string]: string | string[];
}
