"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";
import DashboardStats from "@/components/DashboardStats";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchTasks();
    }
  }, [status, router]);

  const fetchTasks = async () => {
    const response = await fetch("/api/tasks");
    if (response.ok) {
      const data = await response.json();
      setTasks(data);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <DashboardStats tasks={tasks} />
            <div className="mt-8">
              <TaskForm onTaskAdded={fetchTasks} />
            </div>
            <div className="mt-8">
              <TaskList tasks={tasks} onTaskUpdated={fetchTasks} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}