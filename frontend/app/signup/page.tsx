// /app/signup/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function SignupPage() {
  const { user, signup, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError("");
    try {
      await signup(email, password, username);
      router.refresh();
      router.replace("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setLocalError(error.message || "Signup error");
      } else {
        setLocalError("Signup error");
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded shadow-lg space-y-4">
        <h1 className="text-2xl font-bold text-center">Signup</h1>
        {localError && <p className="text-red-500 text-center">{localError}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-white"
            required
          />
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
            className="w-full p-2 bg-green-600 rounded hover:bg-green-700 font-semibold"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
