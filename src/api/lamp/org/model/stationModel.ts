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
  createdTime: string;
  createdBy: string;
  updatedTime: string;
  updatedBy: string;
  echoMap: Recordable;
}
