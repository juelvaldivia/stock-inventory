class HttpError extends Error {
  private _name: string;

  constructor(name: string, ...params: any[]) {
    super(...params);
    this._name = name;
  }

  get name(): string {
    return this._name;
  }
}

export default HttpError;
