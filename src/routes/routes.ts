import { lazy, ComponentType } from "react";

const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Forbidden = lazy(() => import("@/pages/Forbidden"));

export interface RouteConfig {
  path: string;
  element: ComponentType;
  name?: string;
  nameKey?: string;
  requiredRole?: number;
  allowedRoles?: number[];
  redirectTo?: string;
}

export const publicRoutes: RouteConfig[] = [
  {
    path: "/login",
    element: Login,
    name: "Kirish",
    nameKey: "login",
  },
  {
    path: "/403",
    element: Forbidden,
    name: "Ruxsat yo'q",
    nameKey: "forbidden",
  },
];

export const privateRoutes: RouteConfig[] = [
  {
    path: "/",
    element: Home,
    name: "Asosiy",
    nameKey: "home",
  },
  {
    path: "/dashboard",
    element: Home,
    name: "Boshqaruv paneli",
    nameKey: "dashboard",
  },
];