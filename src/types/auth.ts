export interface LoginReqBody {
    username: string,
    password: string
}

export interface LoginResBody {
    user: User,
    token: string,
}

interface User {
    id: number,
    username: string,
    full_name: string,
    role: string,
}