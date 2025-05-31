import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { clientStatusData, pieColors, revenueData } from "../..";

// Custom icons for analytics
const TrendUpIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    <path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
  </svg>
);

const PieChartIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    <path d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
    <path d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
  </svg>
);

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-gray-100 rounded-xl p-3 shadow-lg">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm text-gray-600">
            <span className="font-medium" style={{ color: entry.color }}>
              {entry.name}:
            </span>{" "}
            {typeof entry.value === "number" && entry.name === "revenue"
              ? `$${entry.value.toLocaleString()}`
              : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom legend component
const CustomLegend = (props) => {
  const { payload } = props;
  return (
    <div className="flex flex-wrap gap-4 justify-center mt-4">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-gray-600 font-medium">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function AnalyticsSection() {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between px-4">
        <div>
          <h2 className="text-3xl font-bold  text-gray-900">
            Analytics Overview
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Track your business performance and client insights
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Overview */}
        <div className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors duration-300">
                <TrendUpIcon />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Revenue Overview
                </h3>
                <p className="text-sm text-gray-500">
                  Monthly performance tracking
                </p>
              </div>
            </div>
          </div>

          {/* Chart Container */}
          <div className="h-64 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={revenueData}
                margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
              >
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="revenue"
                  fill="url(#blueGradient)"
                  radius={[6, 6, 0, 0]}
                  className="hover:opacity-80 transition-opacity duration-200"
                />
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#1E40AF" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Chart Footer */}
          <div className="mt-4 pt-4 border-t border-gray-50">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Total Revenue</span>
              <span className="font-semibold text-gray-900">
                $
                {revenueData
                  ?.reduce((sum, item) => sum + item.revenue, 0)
                  .toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Client Status Distribution */}
        <div className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg text-purple-600 group-hover:bg-purple-100 transition-colors duration-300">
                <PieChartIcon />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Client Distribution
                </h3>
                <p className="text-sm text-gray-500">
                  Status breakdown overview
                </p>
              </div>
            </div>
          </div>

          {/* Chart Container */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={clientStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  innerRadius={45}
                  paddingAngle={2}
                  className="drop-shadow-sm"
                >
                  {clientStatusData?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index % pieColors.length]}
                      className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Chart Footer */}
          <div className="mt-4 pt-4 border-t border-gray-50">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Total Clients</span>
              <span className="font-semibold text-gray-900">
                {clientStatusData?.reduce((sum, item) => sum + item.value, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <TrendUpIcon />
            </div>
            <div>
              <p className="text-sm text-blue-600 font-medium">Growth Rate</p>
              <p className="text-lg font-semibold text-blue-900">+12.5%</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-600 rounded-lg text-white">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-green-600 font-medium">Avg. Revenue</p>
              <p className="text-lg font-semibold text-green-900">$8,420</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-600 rounded-lg text-white">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-purple-600 font-medium">
                Active Clients
              </p>
              <p className="text-lg font-semibold text-purple-900">
                {clientStatusData?.find((item) => item.name === "Active")
                  ?.value || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
