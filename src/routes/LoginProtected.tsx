import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";

export default function LoginProtected({ children }: { children: ReactNode }) {
  const token = useAppSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return children;
}
