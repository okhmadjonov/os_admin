export * from "../types/user";
export * from "../types/auth";

export interface IRouteConfig {
  path: string;
  element: React.ComponentType;
  name?: string;
  nameKey?: string;
  requiredRole?: number;
  allowedRoles?: number[];
  redirectTo?: string;
}
