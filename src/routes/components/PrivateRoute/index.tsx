import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import Layout from "@/components/layout";
import Loader from "@/components/Loader";

interface IPrivateRoute {
  children: ReactNode;
  requiredRole?: number;
  allowedRoles?: number[];
  redirectTo?: string;
}

const PrivateRoute: FC<IPrivateRoute> = ({
  children,
  requiredRole,
  allowedRoles,
  redirectTo = "/403",
}) => {
  const { initialized, authenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  if (!initialized) {
    return <Loader />;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole !== undefined && user?.role !== requiredRole) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles !== undefined && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Layout>{children}</Layout>;
};

export default PrivateRoute;
