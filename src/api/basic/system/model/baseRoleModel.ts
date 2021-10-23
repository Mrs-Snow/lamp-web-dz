import { Enum } from '/@/api/model/baseModel';

export interface BaseRolePageQuery {
  type?: string;
  name?: string;
  code?: string;
  remarks?: string;
  state?: boolean;
  readonly?: boolean;
  dsType?: Enum;
  orgId?: string;
  label?: string;
  parentId?: string;
  sortValue?: number;
}

export interface BaseRoleSaveVO {
  type: string;
  name: string;
  code: string;
  remarks: string;
  state: boolean;
  readonly: boolean;
  dsType: Enum;
  orgId: string;
  label: string;
  parentId: string;
  sortValue: number;
}

export interface BaseRoleUpdateVO {
  id: string;
  type: string;
  name: string;
  code: string;
  remarks: string;
  state: boolean;
  readonly: boolean;
  dsType: Enum;
  orgId: string;
  label: string;
  parentId: string;
  sortValue: number;
}

export interface BaseRoleResultVO {
  type?: string;
  name?: string;
  code?: string;
  remarks?: string;
  state?: boolean;
  readonly?: boolean;
  dsType?: Enum;
  orgId?: string;
  id?: string;
  createdBy?: string;
  createdTime?: string;
  updatedBy?: string;
  updatedTime?: string;
  echoMap?: Recordable;
}
