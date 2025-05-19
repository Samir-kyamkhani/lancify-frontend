import React from "react";
import { FaCheck } from "react-icons/fa";

function AuthSidebar() {
  return (
    <div className="flex flex-col justify-center w-fit space-y-6">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
        Manage your Freelance Business
        <br />
        with the Lancify tool
      </h1>
      <ul className="space-y-3 text-gray-600 text-sm lg:text-lg ">
        {[
          { name: "Track projects, deadlines, and deliverables" },
          { name: "Manage clients, contracts, and communication" },
          { name: "Handle invoices, payments, and reports" },
          { name: "Stay organized with a clean, intuitive dashboard" },
        ].map((items, idx) => (
          <li key={idx} className="flex gap-1 items-center">
            <FaCheck className="text-green-500" /> {items.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AuthSidebar;
