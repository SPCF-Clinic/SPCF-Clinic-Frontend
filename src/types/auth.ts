export interface LoginReqBody {
    username: string,
    password: string
}

export interface LoginResBody {
    user: User,
    token: string,
}
export interface User {
	id: number;
	username: string;
	full_name: string;
	role: UserRole;
}

export type UserRole = "Student" | "Admin" | "Super Admin";
