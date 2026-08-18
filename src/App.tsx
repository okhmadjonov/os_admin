import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "@/redux";
import AppRoute from "./routes/AppRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    dispatch.auth.checkAuth();
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <div className="container">
        <AppRoute />
      </div>
      <ToastContainer position="top-right" autoClose={4000} theme="dark" />
    </ErrorBoundary>
  );
}

export default App;
