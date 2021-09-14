import { Enum } from '/@/api/model/baseModel';

export interface ApplicationPageQuery {
  clientId: string;
  clientSecret: string;
  website: string;
  name: string;
  icon: string;
  appType: Enum;
  describe: string;
  state: boolean;
}

export interface ApplicationSaveDTO {
  clientId: string;
  clientSecret: string;
  website: string;
  name: string;
  icon: string;
  appType: Enum;
  describe: string;
  state: boolean;
}

export interface ApplicationUpdateDTO {
  id: string;
  clientId: string;
  clientSecret: string;
  website: string;
  name: string;
  icon: string;
  appType: Enum;
  describe: string;
  state: boolean;
}

export interface Application {
  clientId?: string;
  clientSecret?: string;
  website?: string;
  name?: string;
  icon?: string;
  appType?: Enum;
  describe?: string;
  state?: boolean;
  id?: string;
  createdBy?: string;
  createTime?: string;
  updatedBy?: string;
  updateTime?: string;
  echoMap?: Recordable;
}
