import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-[#0a0a1f] via-[#1a1040] to-[#05050a] text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col p-6 gap-4 overflow-y-auto">
        <Navbar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}