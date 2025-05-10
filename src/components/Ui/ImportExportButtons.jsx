import { IoMdDownload } from "react-icons/io";
import { MdOutlineFileUpload } from "react-icons/md";

export const ImportExportButtons = () => (
  <>
    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100">
      <MdOutlineFileUpload /> Import
    </button>
    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100">
      <IoMdDownload /> Export
    </button>
  </>
);
