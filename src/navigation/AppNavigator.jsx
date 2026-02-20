import React from "react";
import { useSelector } from "react-redux";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

export default function AppNavigator() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return isAuth ? <MainNavigator /> : <AuthNavigator />;
}
