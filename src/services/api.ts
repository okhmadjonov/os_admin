import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { CookieManager } from "@/utils/cookies";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5247/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = CookieManager.getAuthToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    const isAuthEndpoint = originalRequest?.url?.includes("/Auth/");

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const accessToken = CookieManager.getAuthToken() || "";
      const refreshToken = CookieManager.getRefreshToken() || "";

      if (!refreshToken) {
        clearAuthAndRedirect();
        return Promise.reject(error);
      }

      try {
        const refreshResponse = await axios.post<ApiResponse<AuthResponseDto>>(
          `${BASE_URL}/Auth/refresh-token`,
          {
            accessToken,
            refreshToken,
          }
        );

        if (refreshResponse.data?.isSuccess && refreshResponse.data?.data) {
          const newAuthData = refreshResponse.data.data;
          CookieManager.setAuthToken(newAuthData.accessToken);
          if (newAuthData.refreshToken) {
            CookieManager.setRefreshToken(newAuthData.refreshToken);
          }

          processQueue(null, newAuthData.accessToken);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAuthData.accessToken}`;
          }
          return api(originalRequest);
        } else {
          throw new Error("Refresh token failed");
        }
      } catch (refreshErr) {
        processQueue(refreshErr as AxiosError, null);
        clearAuthAndRedirect();
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

function clearAuthAndRedirect() {
  CookieManager.clearAuthCookies();
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
}

export interface BackendUserDto {
  id: string;
  userName: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  photoUrl?: string | null;
  isActive: boolean;
  role: string;
  roles: string[];
}

export interface AuthResponseDto {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  refreshTokenExpiration: string;
  user: BackendUserDto;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  message: string;
  data: T;
  errors?: string[] | null;
  statusCode: number;
}

export interface RegisterParams {
  userName: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  role?: string;
}

export const authApi = {
  login: async (userNameOrEmail: string, password: string): Promise<ApiResponse<AuthResponseDto>> => {
    const response = await api.post<ApiResponse<AuthResponseDto>>("/Auth/login", {
      userNameOrEmail,
      password,
    });
    return response.data;
  },
  register: async (params: RegisterParams): Promise<ApiResponse<AuthResponseDto>> => {
    const response = await api.post<ApiResponse<AuthResponseDto>>("/Auth/register", params);
    return response.data;
  },
  refreshToken: async (accessToken: string, refreshToken: string): Promise<ApiResponse<AuthResponseDto>> => {
    const response = await api.post<ApiResponse<AuthResponseDto>>("/Auth/refresh-token", {
      accessToken,
      refreshToken,
    });
    return response.data;
  },
};

export default api;
