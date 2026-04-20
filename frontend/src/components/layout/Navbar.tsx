import { LogOut, Menu } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

interface NavbarProps{
  onMenuClick?: () => void
}
export default function Navbar({ onMenuClick }:NavbarProps) {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="flex justify-between items-center px-4 md:px-6 py-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">

      {/* LEFT: Mobile Menu */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-white/10"
          title="Toggle menu"
        >
          <Menu size={20} />
        </button>

        <h1 className="text-lg font-semibold tracking-wide">
          QueryForge
        </h1>
      </div>

      {/* RIGHT: Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-sm px-3 py-1 rounded-lg bg-white/5 hover:bg-red-500/20 transition"
      >
        <LogOut size={18} />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </div>
  );
}