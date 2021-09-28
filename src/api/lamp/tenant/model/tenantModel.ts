import { Enum } from '/@/api/model/baseModel';

export interface TenantPageQuery {
  name?: string;
  code?: string;
  registerType?: Enum | string;
  status?: Enum | string;
}
export interface TenantSaveDTO {
  name: string;
  code: string;
  duty: string;
  expirationTime: string;
  logo: string;
  describe: string;
}

export interface TenantUpdateDTO {
  id: number;
  name: string;
  code: string;
  registerType: Enum;
  connectType: Enum;
  status: Enum;
  duty: string;
  expirationTime: string;
  logo: string;
  describe: string;
}

export interface Tenant {
  id: number;
  name: string;
  code: string;
  registerType: Enum;
  connectType: Enum;
  status: Enum;
  duty: string;
  expirationTime: string;
  logo: string;
  describe: string;
  createdTime: string;
  createdBy: string;
  updatedTime: string;
  updatedBy: string;
}

export interface TenantConnectDTO {
  id: number;
  tenant: string;
  connectType: string;
  authorityDatasource: string;
  fileDatasource: string;
  msgDatasource: string;
  oauthDatasource: string;
  gateDatasource: string;
}
