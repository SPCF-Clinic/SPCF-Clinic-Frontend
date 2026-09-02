import { apiClient } from "./axios";

import type { LoginReqBody } from "../types/auth";

export async function login(params:LoginReqBody) {
   const response = await apiClient.post(`/auth/login`, params)
   return response.data
}