import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col p-4 gap-4 overflow-y-auto">
        <Navbar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}