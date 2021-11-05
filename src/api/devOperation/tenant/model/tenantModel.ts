import { AppendixSaveVO } from '/@/api/lamp/file/model/uploadModel';
import { Enum } from '/@/api/model/baseModel';

export interface TenantPageQuery {
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
  status: string;
  state: boolean;
  readonly: boolean;
  duty: string;
  expirationTime: string;
  describe: string;
  createdTime: string;
  createdBy: string;
  updatedTime: string;
  updatedBy: string;
}
export interface TenantSaveDTO {
  name: string;
  code: string;
  abbreviation?: string;
  creditCode?: string;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  provinceId?: string;
  provinceName?: string;
  cityId?: string;
  cityName?: string;
  districtId?: string;
  districtName?: string;
  address?: string;
  state?: boolean;
  duty?: string;
  expirationTime?: string;
  describe?: string;
  logos?: AppendixSaveVO[];
}

export interface TenantUpdateDTO {
  id: string;
  name: string;
  code: string;
  abbreviation?: string;
  creditCode?: string;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  provinceId?: string;
  provinceName?: string;
  cityId?: string;
  cityName?: string;
  districtId?: string;
  districtName?: string;
  address?: string;
  state?: boolean;
  duty?: string;
  expirationTime?: string;
  describe?: string;
  logos?: AppendixSaveVO[];
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
  status: string;
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

export interface DefTenantInitVO {
  id: string;
  connectType: Enum;
  baseDatasourceId?: string;
  extendDatasourceId?: string;
}
