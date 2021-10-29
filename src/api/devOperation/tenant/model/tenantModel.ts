import { Enum } from '/@/api/model/baseModel';

export interface TenantPageQuery {
  name?: string;
  code?: string;
  registerType?: Enum | string;
  status?: Enum | string;
  abbreviation: string;
  creditCode: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  provinceId: string;
  provinceName: string;
  cityId: string;
  cityName: string;
  districtId: string;
  districtName: string;
  address: string;
  state: boolean;
}
export interface TenantSaveDTO {
  name: string;
  code: string;
  duty: string;
  expirationTime: string;
  state: boolean;
  describe: string;
  abbreviation: string;
  creditCode: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  provinceId: string;
  provinceName: string;
  cityId: string;
  cityName: string;
  districtId: string;
  districtName: string;
  address: string;
}

export interface TenantUpdateDTO {
  id: string;
  name: string;
  code: string;
  registerType: Enum;
  connectType: Enum;
  status: Enum;
  duty: string;
  expirationTime: string;
  state: boolean;
  describe: string;
  abbreviation: string;
  creditCode: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  provinceId: string;
  provinceName: string;
  cityId: string;
  cityName: string;
  districtId: string;
  districtName: string;
  address: string;
}

export interface Tenant {
  id: string;
  name: string;
  code: string;
  abbreviation: string;
  creditCode: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  provinceId: string;
  provinceName: string;
  cityId: string;
  cityName: string;
  districtId: string;
  districtName: string;
  address: string;
  registerType: Enum;
  connectType: Enum;
  status: Enum;
  state: boolean;
  readonly: boolean;
  duty: string;
  expirationTime: string;
  describe: string;
  createdTime: string;
  createdBy: string;
  updatedTime: string;
  updatedBy: string;

  employeeState: boolean;
  isDefault: boolean;
}

export interface TenantConnectDTO {
  id: string;
  tenant: string;
  connectType: string;
  authorityDatasource: string;
  fileDatasource: string;
  msgDatasource: string;
  oauthDatasource: string;
  gateDatasource: string;
}
