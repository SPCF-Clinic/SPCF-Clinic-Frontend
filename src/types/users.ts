export interface UserIndex {
  id: number;
  username: string;
  name: string | null;
  contact_number: string | null;
  email: string | null;
  access: UserAccess;
}

export interface UserUpdateResponse {
  id: number;
  username: string;
  status: string;
  roles: string;
}

export const USER_ACCESSES = ["Student", "Admin", "Super Admin"] as const;
export type UserAccess = (typeof USER_ACCESSES)[number];
