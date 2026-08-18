import { createModel } from "@rematch/core";
import { RootModel } from "./index";
import { AuthState, LoginParams } from "@/types/auth";
import { UserRole } from "@/types/user";

const MOCK_USERS = [
  {
    id: "usr_1",
    username: "admin",
    password: "admin123",
    fullName: "Edvard salvator",
    email: "admin@osadmin.uz",
    role: UserRole.Admin,
    department: "Tizim ma'muriyati",
    position: "Bosh administrator",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
  },
  {
    id: "usr_2",
    username: "user",
    password: "user123",
    fullName: "Jamshid Qodirov",
    email: "user@osadmin.uz",
    role: UserRole.Ministry,
    department: "Vazirlik sektori",
    position: "Yetakchi mutaxassis",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
  },
];

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
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const targetUser = MOCK_USERS.find(
          (u) =>
            u.username.toLowerCase() === params.username.toLowerCase() &&
            u.password === params.password
        );

        if (!targetUser) {
          dispatch.auth.setError("Foydalanuvchi nomi yoki parol noto'g'ri!");
          return false;
        }

        const { password, ...userWithoutPassword } = targetUser;
        const fakeToken = `mock-jwt-token-${targetUser.id}-${Date.now()}`;

        localStorage.setItem("auth_token", fakeToken);
        localStorage.setItem("auth_user", JSON.stringify(userWithoutPassword));

        dispatch.auth.setAuthSuccess({
          user: userWithoutPassword,
          token: fakeToken,
        });

        return true;
      } catch (err: any) {
        dispatch.auth.setError(err.message || "Tizimga kirishda xatolik yuz berdi");
        return false;
      }
    },

    checkAuth() {
      try {
        const token = localStorage.getItem("auth_token");
        const savedUserStr = localStorage.getItem("auth_user");

        if (token && savedUserStr) {
          const user = JSON.parse(savedUserStr);
          dispatch.auth.setAuthSuccess({ user, token });
        } else {
          dispatch.auth.setInitialized(true);
        }
      } catch (e) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        dispatch.auth.setInitialized(true);
      }
    },

    logout() {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      dispatch.auth.setLogout();
    },
  }),
});
