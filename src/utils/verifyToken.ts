import { jwtDecode } from "jwt-decode";
import type { TTokenUser } from "../types/global.types";

export const verifyToken = (token: string) => {
  const decoded = jwtDecode(token);
  return decoded as TTokenUser;
};
