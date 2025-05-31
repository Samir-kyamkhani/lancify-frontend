import TaskCard from "./TaskCard";

export default function TaskColumn({ title, tasks = [], onAddTask, className = "" }) {
  return (
    <div
      className={`flex flex-col h-fit shadow-sm bg-gray-50 rounded-xl p-4 w-full min-w-[280px] max-w-xs
        ${className}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {onAddTask && (
          <button
            onClick={onAddTask}
            aria-label={`Add task to ${title}`}
            className="p-1 rounded-md text-blue-600 hover:bg-blue-100 transition"
          >
            <BsPlus />
          </button>
        )}
      </div>

      <div
        className="flex flex-col gap-4 overflow-y-auto max-h-[60vh] sm:max-h-[70vh]"
        style={{ scrollbarWidth: "thin" }}
      >
        {tasks.length > 0 ? (
          tasks.map((task, idx) => <TaskCard key={idx} data={task} />)
        ) : (
          <p className="text-gray-400 text-sm text-center">Record not available</p>
        )}
      </div>
    </div>
  );
}
