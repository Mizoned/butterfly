export interface IUser {
  id: number;
  firstName: string | null;
  lastName: string | null;
  fatherName: string | null;
  mobilePhone: string | null;
  email: string;
}

export interface JwtPayloadUser extends IUser {
  exp: number;
  iat: number;
}