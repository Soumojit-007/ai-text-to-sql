// import { Navigate, useLocation } from "react-router-dom";
import { Navigate} from "react-router-dom";
import { type ReactNode } from "react";
import { useAuthStore } from "../../store/useAuthStore";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const token = useAuthStore((s) => s.token);
  // const location = useLocation();

  if (!token) {
    // return <Navigate to="/auth" replace state={{ from: location }} />;

    return <Navigate to="/" replace /> // go the landing
  }

  return <>{children}</>;
  // return children;
}