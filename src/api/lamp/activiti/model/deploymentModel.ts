export interface ProcessDefinitionDO {
  id?: string;
  createTime?: string;
  createdBy?: string;
  updateTime?: string;
  updatedBy?: string;
  name: string;
  key: string;
  version: string;
  category: string;
  description: string;
  deploymentId: string;
  deploymentName: string;
  deploymentTime: string;
  diagramResourceName: string;
  resourceName: string;
  suspendState: string;
  suspendStateName: string;
}

export interface DefinitionUploadVO {
  name?: string;
  // file name
  file: File | Blob;
}
