export interface Org {
  id: string;
  label: string;
  parentId: string;
  sortValue: number;
  updatedTime: string;
  updatedBy: string;
  createdTime: string;
  createdBy: string;
  type: string;
  abbreviation: string;
  state: boolean;
  describe: string;
  children: Org[];
}
export interface OrgSaveDTO {
  label: string;
  parentId: string;
  sortValue: number;
  type: string;
  abbreviation: string;
  state: boolean;
  describe: string;
}

export interface OrgUpdateDTO {
  id: string;
  label: string;
  parentId: string;
  sortValue: number;
  type: string;
  abbreviation: string;
  state: boolean;
  describe: string;
}
