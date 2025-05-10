import React from "react";
import { files } from "../..";



const UserSharedFilesPage = () => {
  return (
    <div className="p-6 -m-4">
      <h2 className="text-2xl font-bold text-black mb-1">Shared Files</h2>
      <p className="text-gray-600 mb-4">
        Files shared with you across projects.
      </p>

      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm text-black">
          <thead className="bg-gray-50">
            <tr>
              {["File Name", "Project", "Type", "Size", "Date Shared", ""].map((title) => (
                <th
                  key={title}
                  className="sm:py-3 sm:px-4 py-1.5 px-2 border-b border-gray-200 text-left"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="sm:py-3 sm:px-4 py-1.5 px-2 text-xs lg:text-sm flex items-center gap-2">
                <span>{file.name}</span>
                </td>
                <td className="sm:py-3 sm:px-4 py-1.5 px-2 text-xs lg:text-sm">{file.project}</td>
                <td className="sm:py-3 sm:px-4 py-1.5 px-2 text-xs lg:text-sm">{file.type}</td>
                <td className="sm:py-3 sm:px-4 py-1.5 px-2 text-xs lg:text-sm">{file.size}</td>
                <td className="sm:py-3 sm:px-4 py-1.5 px-2 text-xs lg:text-sm">{file.dateShared}</td>
                <td className="sm:py-3 sm:px-4 py-1.5 px-2 text-xs lg:text-sm">
                  <button className="bg-white hover:bg-gray-100 border border-gray-300 text-sm px-4 py-1.5 rounded-md flex items-center gap-1">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserSharedFilesPage;
