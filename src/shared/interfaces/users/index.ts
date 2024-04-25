interface IUser {
  id: number;
  firstName: string | null;
  lastName: string | null;
  fatherName: string | null;
  mobilePhone: string | null;
  email: string;
  settings: IUserSettings
}

interface IUserSettings {
  workdayStartTime: string;
  workdayEndTime: string;
}

interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
}

interface IUpdateProfile {
  lastName?: string;
  firstName?: string;
  fatherName?: string;
}

interface IUpdateWorkspace {
  workdayStartTime: Date;
  workdayEndTime: Date;
}

export type {
  IUser,
  IUserSettings,
  IUpdatePassword,
  IUpdateProfile,
  IUpdateWorkspace
}