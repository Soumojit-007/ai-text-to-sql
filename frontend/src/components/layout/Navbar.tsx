import { LogOut } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/" , {replace:true});
    // window.location.href = "/";
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">
      <h1 className="text-lg font-semibold tracking-wide">
        QueryForge
      </h1>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-sm px-3 py-1 rounded-lg bg-white/5 hover:bg-red-500/20 transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}