import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, History ,Upload } from "lucide-react";
import clsx from "clsx";

export default function Sidebar() {
  const { pathname } = useLocation();

  const navItem = (path: string) =>
    clsx(
      "flex items-center gap-3 px-4 py-2 rounded-lg transition text-sm",
      pathname === path
        ? "bg-white/10 text-white"
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    );

  return (
    <div className="glass w-64 h-full p-4 flex flex-col gap-2">
      <Link to="/dashboard" className={navItem("/dashboard")}>
        <LayoutDashboard size={18} />
        Dashboard
      </Link>

      <Link to="/history" className={navItem("/history")}>
        <History size={18} />
        History
      </Link>

      <Link to="/upload" className={navItem("/upload")}>
      <Upload size={18}/>
      </Link>
    </div>
  );
}