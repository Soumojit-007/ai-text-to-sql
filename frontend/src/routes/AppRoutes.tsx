import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "../pages/Auth";
import Dashboard from "../pages/Dashboard";
import History from "../pages/History";
import ProtectedRoute from "../components/common/ProtectedRoute";
import { useAuthStore } from "../store/useAuthStore";
import Upload from "../pages/Upload";
import Landing from "../pages/Landing";

export default function AppRoutes() {
  const token = useAuthStore((s) => s.token);

  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* Auth Page */}
      <Route
        path="/auth"
        element={token ? <Navigate to="/dashboard" replace /> : <Auth />}
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

      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <Upload />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}