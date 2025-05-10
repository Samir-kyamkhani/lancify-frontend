import { FiDownload, FiBarChart2 } from "react-icons/fi";
import { reportOptions } from "../..";



export default function ReportsPage() {
  return (
    <div className="">
      <div className="mb-6">
        <p className="text-gray-600 mt-1">
          Create detailed, customizable reports that give you a clear overview
          of team performance and project progress.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {reportOptions.map((report, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-lg p-5 bg-white hover:shadow-md transition"
          >
            <h3 className="text-md font-semibold text-gray-800 mb-2">
              {report.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{report.description}</p>
            <button
              disabled
              className="w-full flex items-center justify-center gap-2 text-sm font-medium border border-gray-300 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-50 transition"
            >
              <FiDownload className="text-gray-500" />
              Generate Report
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 border border-dashed border-gray-300 bg-gray-50 text-center py-8 rounded-lg">
        <FiBarChart2 className="mx-auto text-2xl text-gray-500 mb-2" />
        <p className="font-semibold text-gray-700">
          Reporting Features Coming Soon!
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Gain valuable insights by generating detailed reports.
        </p>
      </div>
    </div>
  );
}
