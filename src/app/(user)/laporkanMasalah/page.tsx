"use client";

import { useState } from "react";

export default function TicketForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    noTelp: "",
    title: "",
    message: "",
    type: "bug",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch("/api/laporkanMasalah/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(`Terjadi kesalahan: ${res.statusText}`);
      }

      setSuccess("Keluhan berhasil dikirim! Tim kami akan menghubungi Anda dalam 24 jam.");
      setForm({ username: "", email: "", noTelp: "", title: "", message: "", type: "bug" });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan saat mengirim keluhan.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl p-6 mx-4 lg:mx-auto bg-white border my-8 border-gray-300 shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Laporkan Masalah</h1>
      <span>
        Sampaikan keluhanmu lewat form ini, dan tim kami akan menghubungimu dalam waktu kurang dari 24 jam jika ada
        informasi yang perlu diklarifikasi. Kamu juga bisa menghubungi kontak berikut untuk update terbaru atau
        follow-up dengan lebih mudah.
      </span>

      {success && <p className="mt-4 text-green-600">{success}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
      <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="border border-gray-300 rounded px-3 py-2"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border border-gray-300 rounded px-3 py-2"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="noTelp"
          placeholder="No. Telp"
          className="border border-gray-300 rounded px-3 py-2"
          value={form.noTelp}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Judul Masalah"
          className="border border-gray-300 rounded px-3 py-2"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Deskripsi Masalah"
          className="border border-gray-300 rounded px-3 py-2 h-32"
          value={form.message}
          onChange={handleChange}
          required
        ></textarea>

        <div className="flex gap-4">
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 flex-1"
            required
          >
            <option value="bug">Bug</option>
            <option value="product">Product</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Mengirim..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
