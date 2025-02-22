"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";
import NavBar from "@/components/NavBar";

export default function LoginPage() {
  const { user, login, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError("");
    try {
      await login(email, password);
      router.refresh();
      router.replace("/browse");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setLocalError(error.message);
      } else {
        setLocalError("Login error");
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="relative">
      <div>
        <NavBar></NavBar>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <div className="w-full max-w-md p-8 bg-gray-800 rounded shadow-lg space-y-4">
          <h1 className="text-2xl font-bold text-center">Login</h1>
          {localError && (
            <p className="text-red-500 text-center">{localError}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white"
              required
            />
            <button
              type="submit"
              className="w-full p-2 bg-blue-600 rounded hover:bg-blue-700 font-semibold"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
