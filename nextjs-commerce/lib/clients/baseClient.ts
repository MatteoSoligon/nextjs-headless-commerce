/**
 * Maintainer mode
 */
import { BaseClientProps, Requestprops } from "@/models/types/Client";

export default class BaseClient {
  lang = "en";
  basePath = "";
  tag = "";
  nextConfig: NextFetchRequestConfig | undefined = undefined;

  constructor({ basePath, tag, nextConfig }: BaseClientProps) {
    this.basePath = basePath;
    this.tag = tag;
    if (nextConfig) {
      this.nextConfig = nextConfig;
    }
  }

  async request<T>({ query, payload, options = {}, method, headers }: Requestprops): Promise<{ data: T }> {
    
    const fetchOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        ...headers,
      },
      body: payload ? JSON.stringify(payload) : undefined,
    };

    if (this.nextConfig) {
      fetchOptions.next = this.nextConfig;
    }

    let res: Response;
    try {
      res = await fetch(
        `${process.env.CMS_API_URL}/${this.basePath}`,
        fetchOptions
      );
    } catch (err) {
      console.error(`[${this.tag}] Network error during fetch:`, err);
      throw err;
    }

    if (!res.ok) {
      console.error(`[${this.tag}] HTTP error: ${res.status} ${res.statusText}`, { query, options });
      throw new Error(`CMS request failed with status ${res.status}`);
    }

    const json = await res.json();

    if (json.errors) {
      console.error(`[${this.tag}] GraphQL errors:`, json.errors, { query, options });
    }

    return json;
  }
}
