// import AboutCard from "@/app/components/AboutCard";
"use client";
import { FaLinkedin, FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa";
export default function Contact() {
  const openLink = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <main className="flex-grow w-full sm:w-[80%] md:max-w-[70%] lg:max-w-[50%] mx-auto p-7 rounded box-shadow-paper-effect-3d hover:shadow-none ">
      <div className="flex flex-col gap-4">
        <div className="text-[48px]">Contact</div>
        {/* konten */}
        <span>
          <span className="text-[23px]"> Tak kenal maka tak sayang 😁</span>, kalau hanya sebatas melihat tanpa
          interaksi tentu hambar rasanya, ayo saling terkoneksi agar bia menciptakan peluang yang lebih besar. Kamu bisa
          berkoneksi dengan saya melalui beberapa cara dibawah 😎.
        </span>

        {/* ================
        button koneksi media sosial 
        ================*/}
        <div className="lg:grid lg:grid-cols-2 flex flex-col gap-3">
          <button title="Kunjungi LinkedIn saya"  className="flex items-center justify-center gap-2 w-full py-2 rounded text-white bg-[#0A66C2] hover:bg-[#004182] transition-colors duration-200 active:scale-95">
            <FaLinkedin size={18} />
            LinkedIn
          </button>

          <button title="Hubungi saya lewat email" className="flex items-center justify-center gap-2 w-full py-2 rounded text-white bg-[#EA4335] hover:bg-[#C5221F] transition-colors duration-200 active:scale-95">
            <FaEnvelope size={18} />
            Email
          </button>

          <button title="Kunjungi Instagram saya" className="flex items-center justify-center gap-2 w-full py-2 rounded text-white bg-[#E4405F] hover:bg-[#C13584] transition-colors duration-200 active:scale-95">
            <FaInstagram size={18} />
            Instagram
          </button>

          <button title="Kunjungi Github saya" className="flex items-center justify-center gap-2 w-full py-2 rounded text-white bg-[#181717] hover:bg-[#000000] transition-colors duration-200 active:scale-95">
            <FaGithub size={18} />
            GitHub
          </button>
        </div>
      </div>
    </main>
  );
}
