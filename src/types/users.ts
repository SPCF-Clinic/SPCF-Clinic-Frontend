export interface UserIndex {
	id: number;
	username: string;
	name: string;
	contact_number: string | null;
	access: UserAccess;
}

export const USER_ACCESSES = ["Student", "Admin", "Super Admin"] as const;
export type UserAccess = (typeof USER_ACCESSES)[number];
