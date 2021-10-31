export interface DefUserAvatarUpdateVO {
  id: string;
  appendixAvatar: any;
}
export interface DefUserPasswordUpdateVO {
  id: string;
  oldPassword: string;
  password: string;
  confirmPassword: string;
}
export interface DefUserBaseInfoUpdateVO {
  id: string;
  nickName: string;
  sex: string;
  nation: string;
  education: string;
  workDescribe: string;
}
