export interface StationPageQuery {
  name: string;
  orgId: string;
  state: boolean;
  describe: string;
}

export interface StationSaveDTO {
  name: string;
  orgId: string;
  state: boolean;
  describe: string;
}

export interface StationUpdateDTO {
  id: string;
  name: string;
  orgId: string;
  state: boolean;
  describe: string;
}

export interface Station {
  name: string;
  orgId: string;
  state: boolean;
  describe: string;
  id: string;
  createTime: string;
  createdBy: string;
  updateTime: string;
  updatedBy: string;
  echoMap: Recordable;
}
