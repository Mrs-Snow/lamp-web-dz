export interface AreaPageQuery {
  code: string;
  fullName: string;
  longitude: string;
  latitude: string;
  level: string;
  source: string;
  state: boolean;
  label: string;
  parentId: string;
  sortValue: number;
}

export interface AreaSaveDTO {
  code: string;
  fullName: string;
  longitude: string;
  latitude: string;
  level: string;
  source: string;
  state: boolean;
  label: string;
  parentId: string;
  sortValue: number;
}

export interface AreaUpdateDTO {
  id: string;
  code: string;
  fullName: string;
  longitude: string;
  latitude: string;
  level: string;
  source: string;
  state: boolean;
  label: string;
  parentId: string;
  sortValue: number;
}

export interface Area {
  code: string;
  fullName: string;
  longitude: string;
  latitude: string;
  level: string;
  source: string;
  state: boolean;
  id: string;
  label: string;
  sortValue: number;
  parentId: string;
  createTime: string;
  createdBy: string;
  updateTime: string;
  updatedBy: string;
  echoMap: Recordable;
}
