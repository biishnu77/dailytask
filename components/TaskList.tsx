import React from "react";
import TaskItem from "./TaskItem";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  timeSpent: number;
}

interface TaskListProps {
  tasks: Task[];
  onTaskUpdated: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskUpdated }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onTaskUpdated={onTaskUpdated} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;