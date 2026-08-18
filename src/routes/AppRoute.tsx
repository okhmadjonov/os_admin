import { Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";

const AppRoute = () => {
  return (
      <Routes>
        {publicRoutes.map((route) => {
          const Element = route.element;
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <PublicRoute>
                  <Element />
                </PublicRoute>
              }
            />
          );
        })}

        {privateRoutes.map((route) => {
          const Element = route.element;
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <PrivateRoute
                  allowedRoles={route.allowedRoles}
                  requiredRole={route.requiredRole}
                  redirectTo={route.redirectTo}
                >
                  <Element />
                </PrivateRoute>
              }
            />
          );
        })}

        <Route path="*" element={<NotFound />} />
      </Routes>
  );
};

export default AppRoute;
