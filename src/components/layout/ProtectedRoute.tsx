import React from "react";
import {
  logout,
  selectCurrentToken,
  selectCurrentUser,
} from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router";

const ProtectedRoute = ({
  children,
  role,
}: {
  children: React.ReactNode;
  role: string | undefined;
}) => {
  const token = useAppSelector(selectCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  if (role && user?.role !== role) {
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
