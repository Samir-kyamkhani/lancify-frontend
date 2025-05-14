import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TitlesPages from "../TitlesPages";

function Layout() {
  const locationPath = useLocation().pathname;
  return (
    <div className={`bg-gray-200 px-3 min-h-screen  py-1}`}>
      <TitlesPages />
      {locationPath != "/signup" && locationPath != "/login"  && <Navbar />}
      <main>
        <Outlet />
      </main>
      {locationPath != "/signup" && locationPath != "/login" && <Footer />}
    </div>
  );
}

export default Layout;
