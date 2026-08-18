import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import Loader from "@/components/Loader";

interface IPublicRoute {
  children: ReactNode;
}

const PublicRoute: FC<IPublicRoute> = ({ children }) => {
  const { initialized, authenticated } = useSelector(
    (state: RootState) => state.auth
  );

  if (!initialized) {
    return <Loader />;
  }

  if (authenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
