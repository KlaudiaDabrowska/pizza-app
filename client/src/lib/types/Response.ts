export interface IPageableResponse<T> {
  data: T[];
  meta: IMetaOptions;
}

export interface IMetaOptions {
  page: number;
  items: number;
  total: number;
}
