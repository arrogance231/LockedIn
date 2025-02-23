"use client";
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const vol_data = {
      vol_name: name,
      email,
      pending_events : [],
      reward_points: 0,
      location: 'none',
      completed_events: [],
    }

    const data = {
      password,
      passwordConfirm: confirmPassword,
      email,
      emailVisibility: true,
      name,
      usertype: 'volunteers',
    };

    try {
      await pb.collection('users').create(data);
      await pb.collection('volunteers').create(vol_data);
      router.push('/login');
    } catch (err: any) {
      console.error("Signup Error:", err.response);
      setError(err.response?.message || "Failed to create account");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {/* Card Container */}
      <div className="relative bg-white max-w-4xl w-full rounded-2xl overflow-hidden shadow-lg flex flex-col md:flex-row">
        
        {/* Left Image/Graphic Section */}
        <Image
        src="/volunteer_sign.png"
        alt="Volunteers"
        width={600}
        height={400}
        />
          {/* Optional overlay shape or color tint */}
          <div className="absolute inset-0 bg-blue-600 bg-opacity-20" />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center relative">
          {/* Logo or Brand */}
          <div className="absolute top-4 right-4 text-red-500 text-xl font-bold">
            Bayani<span className="text-blue-600">One</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold mb-6 mt-6 md:mt-0">
            Hello, <span className="text-blue-600">VOLUNTEER!</span>
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-600 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-600 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-600 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-600 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm mt-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    
  );
}
