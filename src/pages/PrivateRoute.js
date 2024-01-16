import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Divider } from "antd";

const PrivateRoute = ({ component: component, ...rest }) => {
  const token = localStorage.getItem("e_token");
  return token ? (
    <>
      <Navbar />
      <Divider />
      <Outlet />
    </>
  ) : (
    <Navigate to="/signin" />
  );
};

export default PrivateRoute;
