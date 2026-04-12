import { Navigate } from "react-router-dom";
import {useAuthStore} from "@/stores/authStore";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = useAuthStore((s) => s.token);
  return token ? children : <Navigate to="/" replace />;
}