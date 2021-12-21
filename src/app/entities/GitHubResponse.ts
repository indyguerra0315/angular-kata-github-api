import { Item } from "./Item";

export class GitHubResponse {

  constructor(
    private _total_count: number,
    private _items: Item[],
    private _page: number ) {}

  public get items(): Item[] {
    return this._items;
  }

  public get total_count(): number {
    return this._total_count;
  }
  public get page(): number {
    return this._page;
  }

  public addItems(items: Item[]): void {
    this._items = [ ...this._items, ...items];
  }
}
