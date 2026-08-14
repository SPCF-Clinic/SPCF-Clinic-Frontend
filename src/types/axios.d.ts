/* eslint-disable @typescript-eslint/no-explicit-any */
import "axios";
import type { ApiResponse } from "./api";

declare module "axios" {
  export interface AxiosInstance {
    get<T = any, R = ApiResponse<T>, D = any>(
      url: string,
      config?: AxiosRequestConfig<D>,
    ): Promise<R>;
    post<T = any, R = ApiResponse<T>, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>,
    ): Promise<R>;
    put<T = any, R = ApiResponse<T>, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>,
    ): Promise<R>;
    delete<T = any, R = ApiResponse<T>, D = any>(
      url: string,
      config?: AxiosRequestConfig<D>,
    ): Promise<R>;
  }
}
