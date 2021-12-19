export class Item {

  public get count(): number|undefined {
    return this._count;
  }
  public get name(): string|undefined {
    return this._name;
  }
  public get code(): string {
    return this._code;
  }
  public get id(): number {
    return this._id;
  }

  constructor(
    private _id: number,
    private _code: string,
    private _name?: string,
    private _count?: number){}
}
