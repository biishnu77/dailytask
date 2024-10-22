import React, { useState } from "react";
import { format } from "date-fns";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  timeSpent: number;
}

interface TaskItemProps {
  task: Task;
  onTaskUpdated: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onTaskUpdated }) => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    setIsTimerRunning(true);
    const interval = setInterval(async () => {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...task, timeSpent: task.timeSpent + 1 }),
      });
      if (response.ok) {
        onTaskUpdated();
      }
    }, 1000);
    setTimerInterval(interval);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    if (timerInterval) {
      clearInterval(timerInterval);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <li>
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-indigo-600 truncate">{task.title}</p>
          <div className="ml-2 flex-shrink-0 flex">
            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              {task.status}
            </p>
          </div>
        </div>
        <div className="mt-2 sm:flex sm:justify-between">
          <div className="sm:flex">
            <p className="flex items-center text-sm text-gray-500">
              {task.description}
            </p>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
            <p>Time spent: {formatTime(task.timeSpent)}</p>
            <button
              onClick={isTimerRunning ? stopTimer : startTimer}
              className={`ml-2 px-3 py-1 rounded-md text-sm font-medium ${
                isTimerRunning
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {isTimerRunning ? "Stop" : "Start"}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default TaskItem;