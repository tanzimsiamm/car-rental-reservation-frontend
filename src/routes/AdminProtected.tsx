import { jwtDecode } from "jwt-decode";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { logout } from "../redux/features/authentication/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export type TJwtDecoded = {
  email: string;
  exp: number;
  iat: number;
  role: string;
};

export default function AdminProtected({ children }: { children: ReactNode }) {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  // decode the jwt token
  const decoded: TJwtDecoded = jwtDecode(token);
  console.log(decoded);

  if (decoded.role === "admin") {
    return children;
  } else {
    dispatch(logout());
    <Navigate to={"/login"} />;
    return;
  }
}
