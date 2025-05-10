import React from "react";
import { BsPlus } from "react-icons/bs";
import TaskCard from "./TaskCard";

export default function TaskColumn({ title, tasks }) {
  return (
    <div className="flex flex-col shadow-sm bg-gray-50 rounded-xl p-4 w-full min-w-[280px] max-w-xs">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="flex flex-col gap-4">
        {tasks.map((task, idx) => (
          <TaskCard key={idx} data={task} />
        ))}
      </div>
    </div>
  );
}
