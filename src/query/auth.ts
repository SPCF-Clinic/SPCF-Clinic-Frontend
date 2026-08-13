import { useMutation } from "@tanstack/react-query";

import useAuthStore from "../stores/auth";
import type { LoginReqBody, LoginResBody } from "../types/auth";
import { login } from "../services/auth"

export function useLogin(){
    return useMutation<LoginResBody, Error, LoginReqBody>({
        mutationFn: login
    })
}