import { jwtDecode } from "jwt-decode";

export const verifyToken = (token: string) => {
  const decoded = jwtDecode(token);
  console.log({decoded});
  return decoded;
};
