import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/dashboard/Sidebar";
import Navbar from "./components/dashboard/Navbar";
import TitlesPages from "./components/dashboard/TitlesPages";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 768);

  // Handle responsive toggle on resize
  useEffect(() => {
    let prevWidth = window.innerWidth;

    const handleResize = () => {
      const currentWidth = window.innerWidth;

      if (currentWidth !== prevWidth) {
        if (currentWidth < 768) {
          setIsOpen(false);
        } else {
          setIsOpen(true);
        }
        prevWidth = currentWidth;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      <TitlesPages />
      <Sidebar
        isOpen={isOpen}
        toggleSidebar={() => setIsOpen(!isOpen)}
        className={`fixed z-40 md:static transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      />

      {/* Overlay on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col transition-all duration-300 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-auto p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
