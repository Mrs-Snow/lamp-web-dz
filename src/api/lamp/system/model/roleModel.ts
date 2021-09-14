import { Enum } from '/@/api/model/baseModel';

export interface RolePageQuery {
  id: string;
  name: string;
  code: string;
  describe: string;
  state: boolean;
  readonly: boolean;
  dsType: Enum;
  orgList: string[];
}

export interface RoleSaveDTO {
  name: string;
  code: string;
  describe: string;
  state: boolean;
  readonly: boolean;
  dsType: Enum;
}

export interface RoleUpdateDTO {
  id: string;
  name: string;
  code: string;
  describe: string;
  state: boolean;
  readonly: boolean;
  dsType: Enum;
}

export interface Role {
  name?: string;
  code?: string;
  describe?: string;
  state?: boolean;
  readonly?: boolean;
  dsType?: Enum;
  id?: string;
  createdBy?: string;
  createdTime?: string;
  updatedBy?: string;
  updatedTime?: string;
  echoMap?: Recordable;
}

export interface RoleAuthoritySaveDTO {
  menuIdList: string[];
  resourceIdList: string[];
  roleId: string;
}
export interface UserRoleSaveDTO {
  userIdList: string[];
  roleId: string;
}
