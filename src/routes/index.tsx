import { Route, Routes } from "react-router-dom";
import { LoginPage, RegisterPage } from "../pages";
import { ProtectedAuth } from "../components";

const CustomRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <ProtectedAuth>
            <LoginPage />
          </ProtectedAuth>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedAuth>
            <RegisterPage />
          </ProtectedAuth>
        }
      />
    </Routes>
  );
};

export default CustomRoutes;
