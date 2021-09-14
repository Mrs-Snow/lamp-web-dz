export interface BasicPageParams {
  page: number;
  pageSize: number;
}

export interface BasicFetchResult<T extends any> {
  items: T[];
  total: number;
}

export interface Enum {
  code: string | number;
  desc?: string;
  extra?: string;
}

export interface RemoteData {
  key: string | number;
  data?: any;
}

export interface PageParams<T extends any> {
  model: T;
  size: number;
  current: number;
  sort?: string;
  order?: string;
  extra?: any;
}

export interface PageResult<T extends any> {
  records: T[];
  offset: number;
  pages: number;
  current: number;
  total: number;
  size: number;
  orders: any[];
}
