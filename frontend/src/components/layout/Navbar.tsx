import { LogOut } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="glass flex justify-between items-center px-6 py-4">
      <h1 className="text-lg font-semibold tracking-wide">
        QueryForge
      </h1>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-sm text-gray-300 hover:text-red-400 transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}