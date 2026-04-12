import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "../pages/Auth";
import Dashboard from "../pages/Dashboard";
import History from "../pages/History";
import ProtectedRoute from "../components/common/ProtectedRoute";
import { useAuthStore } from "../store/useAuthStore";

export default function AppRoutes() {
  const token = useAuthStore((s) => s.token);

  return (
    <Routes>
      {/* Public */}
      <Route
        path="/"
        element={token ? <Navigate to="/dashboard" /> : <Auth />}
      />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}