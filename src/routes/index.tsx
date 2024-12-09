import { Route, Routes } from "react-router-dom";
import { LoginPage, RegisterPage } from "../pages";

import { ProtectedAuth } from "../components/protect-route";
import DashboardWrapper from "../pages/Dashboard/DashboardWrapper";
import { Brands, Categories, Main, Products } from "../pages/Dashboard";


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
      <Route path="/" element={<DashboardWrapper />}>
        <Route index  element={<Main />} />
        <Route path="/products" element={<Products />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/categories" element={<Categories />} />
      </Route>
    </Routes>
  );
};

export default CustomRoutes;

