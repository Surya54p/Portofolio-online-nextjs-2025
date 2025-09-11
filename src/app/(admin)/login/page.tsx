"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // ⬅️ tambahin ini

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.ok) {
      router.push("/admin");
    } else {
      alert("Login gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form onSubmit={handleLogin} className="w-full max-w-md">
        <fieldset className="border border-black rounded-lg p-6 relative">
          <legend className="text-3xl font-serif px-2">Login Admin</legend>

          <label htmlFor="email" className="block mb-1 mt-4 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full mb-4 p-3 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full mb-6 p-3 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* 🔗 Tambahin link reset password */}
          <div className="mb-6 text-right">
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Lupa password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="focus:outline-none focus:ring-2 focus:ring-black w-full bg-black text-white py-3 rounded hover:opacity-90 transition flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Login"
            )}
          </button>
        </fieldset>
      </form>
    </div>
  );
}
