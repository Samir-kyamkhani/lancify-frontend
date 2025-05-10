import React from "react";
import {Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TitlesPages from "../TitlesPages";


function Layout() {
  

  return (
    <div
      className={`bg-gray-200 px-3 min-h-screen  py-1}`}
    >
      <TitlesPages/>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
