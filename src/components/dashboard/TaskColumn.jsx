import TaskCard from "./TaskCard";

export default function TaskColumn({ title, tasks = [] }) {
  return (
    <div className="flex flex-col h-fit shadow-sm bg-gray-50 rounded-xl p-4 w-full min-w-[280px] max-w-xs">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>

      <div className={`flex flex-col gap-4 overflow-y-auto h-fit`}>
        {tasks.length > 0 ? (
          tasks.map((task, idx) => (
            <TaskCard
              key={idx}
              data={task}
            />
          ))
        ) : (
          <p className="text-gray-400 text-sm text-center">
            Record not available
          </p>
        )}
      </div>
    </div>
  );
}
