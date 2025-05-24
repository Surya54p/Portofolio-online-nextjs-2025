"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const Home = () => {
  const [nama, setNama] = useState("");
  const [message, setMessage] = useState("");
  const [totalLikes, setTotalLikes] = useState<number | null>(null);

  // POST like
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama }),
    });

    const data = await res.json();

    if (data.status) {
      if (data.nameAlreadyLiked) {
        setMessage(data.messageAlreadyLiked);
      } else {
        setMessage(data.messageLike);
      }
    } else {
      setMessage(data.error);
    }
    setNama("");
  };

  // Get like
  useEffect(() => {
    const fetchLikes = async () => {
      const response = await fetch("/api/like");
      const data = await response.json();
      setTotalLikes(data.totalLikes);
    };

    fetchLikes();
  }, []);

  return (
    <div className="w-full sm:w-[80%] md:max-w-[70%] lg:max-w-[50%] mx-auto p-7 rounded box-shadow-paper-effect-3d hover:shadow-none">
      {/* Hero Section */}
      <div>
        <div className="border rounded flex   w-fit ">
          <div className="px-2 py-1 bg-black text-white">Total Likes </div>
          <div className="px-2 py-1">{totalLikes !== null ? totalLikes : "Loading..."}</div>
        </div>
      </div>
      <div className="flex items-center justify-between mb-10">
        <div className="flex justify-center flex-col">
          <div className="mb-3">
            <span className="text-xl lg:text-4xl">Welcome to my</span>
            <br />
            <span className="lg:text-6xl text-3xl italic font-bold">Portofolio</span>
          </div>

          <span className="lg:text-[1.3rem] text-[1rem]">From this website you will know more about me! :)</span>
          <div className="mt-5">
            <a href="#aboutMe" className="border px-3 rounded-[25px] py-3">
              Who am I?
            </a>
          </div>
        </div>
        <Image
          src="/foto-santai-1.webp"
          alt="Image Description"
          width={400}
          height={400}
          className="w-[40%] h-[40%] lg:w-[30%] lg:h-[30%] rounded-[15px]"
        />
      </div>

      {/* About Me */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-10">
        {/* Image */}
        <div className="w-full flex justify-center">
          <Image
            src="/foto-gaya-2.webp"
            alt="Image Description"
            width={300}
            height={300}
            className="max-w-[300px] rounded-[15px]"
          />
        </div>

        {/* Text */}
        <div className="w-full flex justify-center text-center flex-col">
          <span className="lg:text-4xl text-2xl">Hello there!</span>
          <span className="lg:text-lg text-sm">
            My name’s Surya Ario Pratama
            <br />
            But you can call me sur :)
            <br />
            I’m currently a student from
            <br />
            University of Indo Global Mandiri
            <br />
            Majoring in Informatics Engineering.
          </span>
        </div>
      </div>

      {/* Hard Skill */}
      <div className="mb-8">
        <h2 className="text-center text-2xl font-bold mb-8">Skill/Tech stack</h2>
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {/* Card 1 */}
          <div className="w-40 flex flex-col relative">
            <img className="border rounded-t-lg h-40 object-contain" src="/laravel-logo.png" alt="Laravel Logo" />
            <div className="border border-t-0 rounded-b-lg py-2 text-center">Laravel</div>
          </div>

          {/* Card 2 */}
          <div className="w-40 flex flex-col relative">
            <img className="border rounded-t-lg h-40 object-contain"  src="/still-under-construction.png"  alt="Logo Placeholder" />
            <div className="border border-t-0 rounded-b-lg py-2 text-center">Coming soon</div>
          </div>

          {/* Card 3 */}
          <div className="w-40 flex flex-col relative">
            <img className="border rounded-t-lg h-40 object-contain"  src="/still-under-construction.png"  alt="Logo Placeholder" />
            <div className="border border-t-0 rounded-b-lg py-2 text-center">Coming soon</div>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="px-4 py-2 rounded border border-gray-300 shadow-[-4px_5px_0px_rgba(0,0,0,0.25)] transition-all transform focus:translate-x-[-4px] focus:translate-y-[4px] focus:shadow-[0_0_0_0_rgba(0,0,0,0)]">
            Coming soon
          </button>
        </div>
      </div>

      {/* Soft Skill */}
      <div className="mb-8">
        <h2 className="text-center text-2xl font-bold mb-8">Soft Skill</h2>
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {/* Card 1 */}
          <div className="w-40 flex flex-col">
             <img className="border rounded-t-lg h-40 object-contain"  src="/still-under-construction.png"  alt="Logo Placeholder" />
            <div className="border border-t-0 rounded-b-lg py-2 text-center">Coming soon</div>
          </div>

          {/* Card 2 */}
          <div className="w-40 flex flex-col">
             <img className="border rounded-t-lg h-40 object-contain"  src="/still-under-construction.png"  alt="Logo Placeholder" />
            <div className="border border-t-0 rounded-b-lg py-2 text-center">Coming soon</div>
          </div>

          {/* Card 3 */}
          <div className="w-40 flex flex-col">
             <img className="border rounded-t-lg h-40 object-contain"  src="/still-under-construction.png"  alt="Logo Placeholder" />
            <div className="border border-t-0 rounded-b-lg py-2 text-center">Coming soon</div>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="px-4 py-2 rounded border border-gray-300 shadow-[-4px_5px_0px_rgba(0,0,0,0.25)] transition-all transform focus:translate-x-[-4px] focus:translate-y-[4px] focus:shadow-[0_0_0_0_rgba(0,0,0,0)]">
            Expand
          </button>
        </div>
      </div>

      {/* Experience */}
      <div className="mb-8 grid">
        <span className="text-2xl font-bold mb-4 block">Experience</span>
        <div className="grid grid-cols-5 border-b border-dotted border-gray-400 py-2">
          <span className="col-span-4">Event Lead – UI/UX Design Workshop: “Interactive UI & User-Friendly UX”</span>
          <span className="flex items-center justify-end">2025</span>
        </div>

        <div className="grid grid-cols-5 border-b border-dotted border-gray-400 py-2">
          <span className="col-span-4">Head of Teknova (IT) division</span>
          <span className="flex items-center justify-end">2025</span>
        </div>

        <div className="grid grid-cols-5 border-b border-dotted border-gray-400 py-2">
          <span className="col-span-4">Participant in Bank Indonesia Hackathon</span>
          <span className="flex items-center justify-end">2024</span>
        </div>
      </div>

      {/* Project */}
      <div className="mb-8">
        <span className="text-2xl font-bold mb-4 block">Project</span>
        <div className="grid grid-cols-5 border-b border-dotted border-gray-400 py-2">
          <span className="col-span-4">Coming soon</span>
          <span className="flex items-center justify-end">Coming soon</span>
        </div>

        <div className="grid grid-cols-5 border-b border-dotted border-gray-400 py-2">
          <span className="col-span-4">Coming soon</span>
          <span className="flex items-center justify-end">Coming soon</span>
        </div>

        <div className="grid grid-cols-5 border-b border-dotted border-gray-400 py-2">
          <span className="col-span-4">Coming soon</span>
          <span className="flex items-center justify-end">Coming soon</span>
        </div>
      </div>
      {/* form like */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4" method="post">
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Input nama untuk like"
          className="px-4 py-2 rounded border border-gray-300 shadow-[-4px_5px_0px_rgba(0,0,0,0.25)] transition-all transform focus:translate-x-[-4px] focus:translate-y-[4px] focus:shadow-[0_0_0_0_rgba(0,0,0,0)]"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded border border-gray-300 shadow-[-4px_5px_0px_rgba(0,0,0,0.25)] transition-all transform focus:translate-x-[-4px] focus:translate-y-[4px] focus:shadow-[0_0_0_0_rgba(0,0,0,0)]"
        >
          Like
        </button>
        {/* {message && <p className="text-green-600">{message}</p>} */}
        {message && (
          <p
            className={`text-gradient-animate ${
              message === "Nama anda kosong!"
                ? "bg-gradient-to-r from-white to-black"
                : "bg-gradient-to-r from-white to-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};
export default Home;
