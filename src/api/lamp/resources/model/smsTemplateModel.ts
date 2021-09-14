import { Enum } from '/@/api/model/baseModel';

export interface SmsTemplatePageQuery {
  providerType: Enum;
  appId: string;
  appSecret: string;
  url: string;
  customCode: string;
  name: string;
  content: string;
  templateParams: string;
  templateCode: string;
  signName: string;
  templateDescribe: string;
}

export interface SmsTemplateSaveDTO {
  providerType: Enum;
  appId: string;
  appSecret: string;
  url: string;
  customCode: string;
  name: string;
  content: string;
  templateParams: string;
  templateCode: string;
  signName: string;
  templateDescribe: string;
}

export interface SmsTemplateUpdateDTO {
  id: string;
  providerType: Enum;
  appId: string;
  appSecret: string;
  url: string;
  customCode: string;
  name: string;
  content: string;
  templateParams: string;
  templateCode: string;
  signName: string;
  templateDescribe: string;
}

export interface SmsTemplate {
  providerType?: Enum;
  appId?: string;
  appSecret?: string;
  url?: string;
  customCode?: string;
  name?: string;
  content?: string;
  templateParams?: string;
  templateCode?: string;
  signName?: string;
  templateDescribe?: string;
  id?: string;
  createdBy?: string;
  createTime?: string;
  updatedBy?: string;
  updateTime?: string;
  echoMap?: Recordable;
}
