import React from "react";
import { Route, Routes } from "react-router";
import Login from "../components/Login";
import Products from "../pages/Products";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/HomePage";
import SiteHeader from "../app/Header";

const AppRoutes: React.FC = () => {
  return (
    <SiteHeader>
      {" "}
      <Routes>
        <Route index element={<HomePage />} />

        {/* <Route element={<AuthLayout />}> */}

        <Route path="products" element={<Products />} />
        <Route
          path="payment"
          element={
            <ProtectedRoute redirectPath="/login?redir=/payment">
              payment
            </ProtectedRoute>
          }
        ></Route>

        <Route path="login" element={<Login />} />
        {/* <Route path="register" element={<Register />} /> */}
        {/* </Route> */}
      </Routes>
    </SiteHeader>
  );
};

export default AppRoutes;
