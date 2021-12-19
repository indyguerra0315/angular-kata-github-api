import { Item } from "./Item";

export interface GitHubResponse {
  total_count: number;
  items: Item[];
}
