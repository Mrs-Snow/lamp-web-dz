import { Enum } from '/@/api/model/baseModel';

export interface MenuPageQuery {
  describe: string;
  isGeneral: boolean;
  path: string;
  component: string;
  state: boolean;
  icon: string;
  group: string;
  readonly: boolean;
  label: string;
  parentId: string;
  sortValue: number;
}

export interface MenuSaveDTO {
  describe: string;
  isGeneral: boolean;
  path: string;
  component: string;
  state: boolean;
  icon: string;
  group: string;
  readonly: boolean;
  label: string;
  parentId: string;
  sortValue: number;
}

export interface MenuUpdateDTO {
  id: string;
  describe: string;
  isGeneral: boolean;
  path: string;
  component: string;
  state: boolean;
  icon: string;
  group: string;
  readonly: boolean;
  label: string;
  parentId: string;
  sortValue: number;
}

export interface Menu {
  describe: string;
  isGeneral: boolean;
  path: string;
  component: string;
  state: boolean;
  icon: string;
  group: string;
  readonly: boolean;
  id: string;
  label: string;
  sortValue: number;
  parentId: string;
  createdBy: string;
  createdTime: string;
  updatedBy: string;
  updatedTime: string;
  echoMap: Recordable;
}

export interface MenuResourceTreeVO {
  type: Enum;
  code: string;
  icon: string;
  describe: string;
  id: string;
  label: string;
  sortValue: number;
  parentId: string;
}
