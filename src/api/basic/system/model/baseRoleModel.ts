import { Enum } from '/@/api/model/baseModel';

export interface BaseRolePageQuery {
  type?: string;
  name?: string;
  code?: string;
  remarks?: string;
  state?: boolean;
  readonly?: boolean;
  dsType?: Enum;
  createdOrgId?: string;
}

export interface BaseRoleSaveVO {
  type: string;
  name: string;
  code: string;
  remarks: string;
  state: boolean;
  readonly: boolean;
  dsType: Enum;
  createdOrgId: string;
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
  createdOrgId: string;
}

export interface BaseRoleResultVO {
  type?: string;
  name?: string;
  code?: string;
  remarks?: string;
  state?: boolean;
  readonly?: boolean;
  dsType?: Enum;
  createdOrgId?: string;
  id?: string;
  createdBy?: string;
  createdTime?: string;
  updatedBy?: string;
  updatedTime?: string;
  echoMap?: Recordable;
}

export interface RoleEmployeeSaveVO {
  flag: boolean;
  roleId: string;
  employeeIdList: string[];
}

export interface BaseRoleResourceRelSaveVO {
  roleId: string;
  applicationResourceMap: Recordable;
}
