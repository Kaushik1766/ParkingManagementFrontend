export type User = {
  email: string;
  name: string;
  office: string;
  id: string;
  role: Roles
}

export enum Roles {
  ADMIN = 1,
  CUSTOMER = 0
}


