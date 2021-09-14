export interface ResourcePageQuery {
  code: string;
  name: string;
  menuId: string;
}

export interface ResourceSaveDTO {
  describe: string;
  code: string;
  name: string;
  menuId: string;
}

export interface ResourceUpdateDTO {
  id: string;
  describe: string;
  code: string;
  name: string;
  menuId: string;
}

export interface Resource {
  describe: string;
  code: string;
  name: string;
  menuId: string;
  id: string;
  createdBy: string;
  createTime: string;
  updatedBy: string;
  updateTime: string;
  echoMap: Recordable;
}
