import { createModel } from "@rematch/core";
import { RootModel } from "./index";
import { AuthState, LoginParams } from "@/types/auth";
import { IUser, UserRole } from "@/types/user";
import { authApi } from "@/services/api";
import { CookieManager } from "@/utils/cookies";

const initialState: AuthState = {
  initialized: false,
  authenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const auth = createModel<RootModel>()({
  state: initialState,
  reducers: {
    setLoading(state, loading: boolean) {
      return { ...state, loading, error: null };
    },
    setError(state, error: string | null) {
      return { ...state, error, loading: false };
    },
    setAuthSuccess(state, payload: { user: AuthState["user"]; token: string }) {
      return {
        ...state,
        authenticated: true,
        user: payload.user,
        token: payload.token,
        loading: false,
        error: null,
        initialized: true,
      };
    },
    setLogout() {
      return {
        ...initialState,
        initialized: true,
      };
    },
    setInitialized(state, initialized: boolean = true) {
      return {
        ...state,
        initialized,
      };
    },
  },
  effects: (dispatch) => ({
    async login(params: LoginParams) {
      dispatch.auth.setLoading(true);
      try {
        const response = await authApi.login(params.username, params.password);

        if (!response.isSuccess || !response.data) {
          dispatch.auth.setError(response.message || "Foydalanuvchi nomi yoki parol noto'g'ri!");
          return false;
        }

        const authData = response.data;
        const displayFullName =
          [authData.user.firstName, authData.user.lastName].filter(Boolean).join(" ") ||
          authData.user.userName;

        const mappedUser: IUser = {
          id: authData.user.id,
          username: authData.user.userName,
          fullName: displayFullName,
          email: authData.user.email,
          role: UserRole.Admin,
          avatar: authData.user.photoUrl || undefined,
          department: authData.user.role || "Tizim ma'muriyati",
          position: authData.user.role || "SuperAdmin",
        };

        CookieManager.setAuthToken(authData.accessToken);
        if (authData.refreshToken) {
          CookieManager.setRefreshToken(authData.refreshToken);
        }
        CookieManager.setAuthUser(mappedUser);

        dispatch.auth.setAuthSuccess({
          user: mappedUser,
          token: authData.accessToken,
        });

        return true;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data?.Errors?.[0] ||
          err.message ||
          "Tizimga kirishda xatolik yuz berdi";
        dispatch.auth.setError(errorMessage);
        return false;
      }
    },

    checkAuth() {
      try {
        const token = CookieManager.getAuthToken();
        const user = CookieManager.getAuthUser<IUser>();

        if (token && user) {
          dispatch.auth.setAuthSuccess({ user, token });
        } else {
          dispatch.auth.setInitialized(true);
        }
      } catch (e) {
        CookieManager.clearAuthCookies();
        dispatch.auth.setInitialized(true);
      }
    },

    logout() {
      CookieManager.clearAuthCookies();
      dispatch.auth.setLogout();
    },
  }),
});
