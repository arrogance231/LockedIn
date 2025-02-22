"use client";
import { useState, useEffect } from "react";
import pb from "../lib/pocketbase";

export interface User {
  id: string;
  email: string;
  username?: string;
  // Add any additional fields you expect from PocketBase's user record
}

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if a user is already logged in when the hook mounts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // pb.authStore.model returns the authenticated user, if any
        const authUser = pb.authStore.model;
        setUser(authUser ? (authUser as unknown as User) : null);
      } catch (error: unknown) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login using PocketBase's authWithPassword method
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);
      setUser(authData.record ? (authData.record as unknown as User) : null);
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

  // Signup creates a new user record and then logs the user in
  const signup = async (email: string, password: string, username: string) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await pb.collection("users").create({
        email,
        password,
        passwordConfirm: password,
        username,
      });
      // Immediately log the user in after signup:
      await login(email, password);
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

  // Logout clears the PocketBase auth store and resets the user state
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
