export type BaseClientProps = {
  basePath: string;
  tag: string;
  nextConfig?: NextFetchRequestConfig| undefined;
}

export type Requestprops = {
  query: string;
  payload?: Record<string, any>;
  options?: Record<string, any>;
  method: "POST" | "GET" | "PUT" | "DELETE";
  headers: Record<string, string>;
}