"use client";
import { useState, useEffect } from "react";
import pb from "../lib/pocketbase_init";

export interface User {
  id: string;
  email: string;
  username?: string;
  usertype?: string; // ✅ Add this field (either "volunteers" or "organization")
}

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch full user data when authenticated
  const fetchUserData = async (userId: string) => {
    try {
      const fullUser = await pb.collection("users").getOne(userId);
      setUser(fullUser as unknown as User);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      setUser(null);
    }
  };

  // ✅ Check if a user is already logged in on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authUser = pb.authStore.model; // Only contains default fields
        if (authUser) {
          await fetchUserData(authUser.id); // Fetch full user data
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // ✅ Login method (fetches full user data)
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const authData = await pb.collection("users").authWithPassword(email, password);
      await fetchUserData(authData.record.id); // ✅ Fetch full user details
      return authData;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Login failed");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Signup method (fetches full user data after signup)
  const signup = async (email: string, password: string, username: string, usertype: string) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await pb.collection("users").create({
        email,
        password,
        passwordConfirm: password,
        username,
        usertype, // ✅ Ensure the usertype is saved on signup
      });
      await login(email, password); // ✅ Auto-login after signup
      return newUser;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Signup failed");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout method
  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      pb.authStore.clear();
      setUser(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Logout failed");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, login, signup, logout };
}
