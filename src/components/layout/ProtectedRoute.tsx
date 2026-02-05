import React from "react";
import {
  logout,
  selectCurrentToken,
} from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router";
import { verifyToken } from "../../utils/verifyToken";
import type { TTokenUser } from "../../types/global.types";

const ProtectedRoute = ({
  children,
  role,
}: {
  children: React.ReactNode;
  role: string | undefined;
}) => {
  const token = useAppSelector(selectCurrentToken);

  let user: TTokenUser | null = null;

  if (token) {
    user = verifyToken(token);
  }

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
