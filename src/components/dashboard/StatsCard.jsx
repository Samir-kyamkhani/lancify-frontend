export const StatsCard = ({ title, value, color, icon: Icon }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className={`text-2xl font-bold ${color} mt-1`}>{value}</p>
      </div>
      <div
        className={`w-12 h-12 rounded-xl ${color
          .replace("text-", "bg-")
          .replace("-600", "-100")} flex items-center justify-center`}
      >
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
    </div>
  </div>
);
