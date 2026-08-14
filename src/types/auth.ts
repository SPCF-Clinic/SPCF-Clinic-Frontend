export interface User {
	id: number;
	username: string;
	full_name: string;
	role: UserRole;
}

export type UserRole = "Student" | "Admin" | "Super Admin";
