'use client';
import Image from "next/image";
import React, { useState } from "react";

const Home = () => {
  const [nama, setNama] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // hati hati!!!
    // nama folder api harus sama 
    const res = await fetch('/api/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nama })
    })
    const data = await res.json()
    if (data.success) {
      setSuccess(true)
      setNama('')
    }
  }


  return (
    <div className="w-full sm:w-[80%] md:max-w-[70%] lg:max-w-[50%] mx-auto p-7 rounded box-shadow-paper-effect-3d hover:shadow-none">
      
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <input
        type="text"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        placeholder="Masukkan namamu untuk like"
        className="border px-4 py-2 rounded hover:shadow-md transition-shadow"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
      >
        Like!
      </button>
      {success && <p className="text-green-600">Terima kasih sudah like!</p>}
    </form>

      {/* Hero Section */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex justify-center flex-col">
          <div className="mb-3">
            <span className="text-xl lg:text-4xl">Welcome to my</span>
            <br />
            <span className="lg:text-6xl text-3xl italic font-bold">
              Portofolio
            </span>
          </div>

          <span className="lg:text-[1.3rem] text-[1rem]">
            From this website you will know more about me! :)
          </span>
          <div className="mt-5">
            <a href="#aboutMe" className="border px-3 rounded-[25px] py-3">
              Who am I?
            </a>
          </div>
        </div>
        <Image
          src="/img/foto-santai-1.png"
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
            src="/img/foto-gaya-2.png"
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
        <h2 className="text-center text-2xl font-bold mb-8">
          Skill/Tech stack
        </h2>
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {/* Card 1 */}
          <div className="w-40 flex flex-col relative">
            <div className="border rounded-t-lg h-40 w-full"></div>
            <div className="border border-t-0 rounded-b-lg py-2 text-center">
              Coming soon
            </div>
          </div>

          {/* Card 2 */}
          <div className="w-40 flex flex-col relative">
            <div className="border rounded-t-lg h-40 w-full"></div>
            <div className="border border-t-0 rounded-b-lg py-2 text-center">
              Coming soon
            </div>
          </div>

          {/* Card 3 */}
          <div className="w-40 flex flex-col relative">
            <div className="border rounded-t-lg h-40 w-full"></div>
            <div className="border border-t-0 rounded-b-lg py-2 text-center">
              Coming soon
            </div>
            <div className="absolute left-[110%]">
              {/* Hamburger */}
              <button className="absolute bg-black text-white p-2 rounded-md hover:bg-gray-800 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              {/* Content that appears on click */}
              <div className="absolute top-11 bg-white border p-4 rounded shadow w-20 z-10">
                Hello World! 👋🔥
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="border rounded-full px-8 py-2 hover:bg-gray-50 transition-colors">
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
            <div className="border rounded-t-lg h-40 w-full"></div>
            <div className="border border-t-0 rounded-b-lg py-2 text-center">
              Coming soon
            </div>
          </div>

          {/* Card 2 */}
          <div className="w-40 flex flex-col">
            <div className="border rounded-t-lg h-40 w-full"></div>
            <div className="border border-t-0 rounded-b-lg py-2 text-center">
              Coming soon
            </div>
          </div>

          {/* Card 3 */}
          <div className="w-40 flex flex-col">
            <div className="border rounded-t-lg h-40 w-full"></div>
            <div className="border border-t-0 rounded-b-lg py-2 text-center">
              Coming soon
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="border rounded-full px-8 py-2 hover:bg-gray-50 transition-colors">
            Expand
          </button>
        </div>
      </div>

      {/* Experience */}
      <div className="mb-8 grid">
        <span className="text-2xl font-bold mb-4 block">Experience</span>
        <div className="grid grid-cols-5 border-b border-dotted border-gray-400 py-2">
          <span className="col-span-4">
            Event Lead – UI/UX Design Workshop: “Interactive UI & User-Friendly
            UX”
          </span>
          <span className="flex items-center justify-end">2025</span>
        </div>

        <div className="grid grid-cols-5 border-b border-dotted border-gray-400 py-2">
          <span className="col-span-4">Head of Teknova (IT) division</span>
          <span className="flex items-center justify-end">2025</span>
        </div>

        <div className="grid grid-cols-5 border-b border-dotted border-gray-400 py-2">
          <span className="col-span-4">
            Participant in Bank Indonesia Hackathon
          </span>
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
    </div>
  );
};

export default Home;
