import { lazy, ComponentType } from "react";

const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Forbidden = lazy(() => import("@/pages/Forbidden"));
const Users = lazy(() => import("@/pages/Users"));
const Orders = lazy(() => import("@/pages/Orders"));
const Products = lazy(() => import("@/pages/Products"));
const Analysis = lazy(() => import("@/pages/Analysis"));
const Blogs = lazy(() => import("@/pages/Blogs"));

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
  {
    path: "/users",
    element: Users,
    name: "Foydalanuvchilar",
    nameKey: "users",
  },
  {
    path: "/orders",
    element: Orders,
    name: "Buyurtmalar",
    nameKey: "orders",
  },
  {
    path: "/products",
    element: Products,
    name: "Mahsulotlar",
    nameKey: "products",
  },
  {
    path: "/analysis",
    element: Analysis,
    name: "Tahlil",
    nameKey: "analysis",
  },
  {
    path: "/blogs",
    element: Blogs,
    name: "Bloglar",
    nameKey: "blogs",
  },
];