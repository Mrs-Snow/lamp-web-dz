export interface ModelSelectReqDTO {
  name?: string;
  key?: string;
}
export interface ModelSaveVO {
  name: string;
  key: string;
  description?: string;
}
export interface ModelPublishReqDTO {
  modelId: string;
}
export interface Model {
  id?: string;
  name?: string;
  key?: string;
  category?: string;
  createdTime?: string;
  version?: string;
  metaInfo?: string;
  deploymentId?: string;
}
