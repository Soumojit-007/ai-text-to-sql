import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {open && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Drawer */}
          <div className="fixed top-0 left-0 h-full w-64 bg-black z-50 shadow-lg overflow-y-auto">
            <Sidebar onItemClick={() => setOpen(false)}/>
          </div>
        </>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col p-3 md:p-4 gap-4 overflow-y-auto">
        <Navbar onMenuClick={() => setOpen(true)} />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}