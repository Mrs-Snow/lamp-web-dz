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
  createdTime: string;
  updatedBy: string;
  updatedTime: string;
  echoMap: Recordable;
}
