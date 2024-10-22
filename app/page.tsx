import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-bold mb-8">Productivity Tracker</h1>
      <p className="text-xl mb-8">Track your tasks, boost your productivity, and challenge yourself!</p>
      {session ? (
        <Link href="/dashboard" className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-indigo-100 transition duration-300">
          Go to Dashboard
        </Link>
      ) : (
        <div className="space-x-4">
          <Link href="/login" className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-indigo-100 transition duration-300">
            Login
          </Link>
          <Link href="/register" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition duration-300">
            Register
          </Link>
        </div>
      )}
    </div>
  );
}