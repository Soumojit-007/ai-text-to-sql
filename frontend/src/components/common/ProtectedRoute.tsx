import { Navigate } from "react-router-dom";
import { type ReactNode } from "react";
import { useAuthStore } from "../../store/useAuthStore";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const token = useAuthStore((s) => s.token);

  // Optional: handle loading state if you add it later
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}