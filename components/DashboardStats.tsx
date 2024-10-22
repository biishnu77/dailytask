import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  timeSpent: number;
}

interface DashboardStatsProps {
  tasks: Task[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "completed").length;
  const totalTimeSpent = tasks.reduce((acc, task) => acc + task.timeSpent, 0);

  const categoryData = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = { name: task.category, count: 0, timeSpent: 0 };
    }
    acc[task.category].count += 1;
    acc[task.category].timeSpent += task.timeSpent;
    return acc;
  }, {} as Record<string, { name: string; count: number; timeSpent: number }>);

  const chartData = Object.values(categoryData);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Dashboard Statistics</h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Total Tasks</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{totalTasks}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Completed Tasks</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{completedTasks}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Total Time Spent</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {Math.floor(totalTimeSpent / 3600)} hours {Math.floor((totalTimeSpent % 3600) / 60)} minutes
            </dd>
          </div>
        </dl>
      </div>
      <div className="px-4 py-5 sm:px-6">
        <h4 className="text-lg leading-6 font-medium text-gray-900">Task Categories</h4>
        <div className="mt-5 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="count" fill="#8884d8" name="Task Count" />
              <Bar yAxisId="right" dataKey="timeSpent" fill="#82ca9d" name="Time Spent (seconds)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;