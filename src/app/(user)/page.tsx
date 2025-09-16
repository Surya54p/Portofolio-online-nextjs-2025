"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import MiniCard from "../components/miniCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PrimaryButton from "../components/primaryButton";
import LikeMarquee from "../components/LikeMarquee";
// import ContributionChart from "@/app/components/chart/ContributionChart";
import TopLanguagesChart from "@/app/components/chart/TopLanguagePieChart";
import AboutCard from "../components/AboutCard";
import GithubContributionCard from "../components/GithubCard";
// import AnimatedSvg from "@/app/components/animated/animatedSvg";
import Script from "next/script";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [nama, setNama] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<boolean>(true);
  const [totalLikes, setTotalLikes] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const Spinner = () => (
    <div className="w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
  );

  // POST like
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama }),
    });
    const data = await res.json();

    if (data.status) {
      if (data.nameEmpty) {
        showCustomToast(data.message, data.status);
        setLoading(false);
        return;
      } else if (data.nameAlreadyLiked) {
        setLoading(false);
        showCustomToast(data.message, data.status);
      } else {
        setLoading(false);
        showCustomToast(data.message, data.status);
      }
    } else {
      setLoading(false);
      showCustomToast(data.message, data.status);
    }
    setNama("");
  };

  //
  // Get like
  //
  useEffect(() => {
    const fetchLikes = async () => {
      // ini alamat api harus benar karena penyebab 404 hanya alamat yang salah jadi kalau dapet 404 itu alamat di bawah ini yang salah.
      // kalau misal untuk page atau halaman biasa itu beda lagi karena di react itu ada cara sendiri untuk nentuin alamatnya

      // coba kamu cek nama foldernya lalu page nya juga
      const response = await fetch("/api/like");
      const data = await response.json();
      setTotalLikes(data.totalLikes);
    };
    // setLoading(true);
    fetchLikes();
  }, []);

  const showCustomToast = (message: string, status: boolean) => {
    setToastMsg(message);
    setToastType(status);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const minicardDefault = [
    {
      img: "still-under-construction.png",
      alt: "loroem",
      title: "titel 1",
    },
  ];

  //
  // ANIMATION EFFECT
  //
  const hardContainerRef = useRef<HTMLDivElement>(null);
  const softContainerRef = useRef<HTMLDivElement>(null);

  const hardCardsRef = useRef<HTMLDivElement[]>([]);
  const softCardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (hardCardsRef.current.length) {
      hardCardsRef.current.forEach((card) => {
        gsap.fromTo(
          card,
          {
            rotationY: 0,
            scale: 0.8,
            transformPerspective: 800,
            transformOrigin: "center",
          },
          {
            rotationY: 360,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card, // elemen ini yang jadi trigger
              start: "top 80%", // mulai ketika 80% dari viewport
              toggleActions: "play none none none",
              // markers: true,
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }

    softCardsRef.current.forEach((card) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          ease: "power3.out",
          stagger: 0.2,
          duration: 1,
        },
        {
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card, // elemen ini yang jadi trigger
            start: "top 80%", // mulai ketika 80% dari viewport
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);
  const infosRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!infosRef.current) return;

    infosRef.current.forEach((el) => {
      if (!el) return;

      // Fade in saat pertama kali muncul
      gsap.fromTo(
        el,
        { y: 80, scale: 0.95 },
        {
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
            // markers: true,
          },
        }
      );

      // Parallax scroll (bergerak ke atas)
      gsap.fromTo(
        el,
        {
          y: 0,
        },
        {
          y: -200,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
            // markers: true,
          },
        }
      );
    });
  }, []);

  const objekRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!objekRef.current) return;

    objekRef.current.forEach((elementObjek) => {
      if (!elementObjek) return;

      // Fade in saat pertama kali muncul
      gsap.fromTo(
        elementObjek,
        { y: 0, scale: 0.75 },
        {
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: elementObjek,
            start: "top 100%",
            toggleActions: "play none none reverse",
            // markers: true,
          },
        }
      );

      // fade out ketika keluar
      gsap.fromTo(
        elementObjek,
        {
          y: 1,
        },
        {
          y: -200,
          ease: "none",
          scrollTrigger: {
            trigger: elementObjek,
            start: "top top",
            end: "bottom top",
            scrub: true,
            // markers: true,
          },
        }
      );
    });
  }, []);

  return (
    <main className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full px-6 py-8">
      {/* Left (25%) */}
      <aside className="lg:col-span-3 hidden lg:block ">
        {/* <AnimatedSvg name="wave" className="w-[500px] text-green-600" /> */}
        {/* Google Analytics */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXX');
          `}
        </Script>
        {/* <AnimatedSvg  /> */}
      </aside>
      <section className="lg:col-span-6 bg-white rounded p-7 box-shadow-paper-effect-3d hover:shadow-none">
        <div
          ref={(el) => {
            if (el && !infosRef.current.includes(el)) infosRef.current.push(el);
          }}
        >
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
                <a
                  href="#about"
                  className="border hover:border-blue-500 px-3 rounded-[25px] py-3 hover:bg-blue-500 hover:text-white"
                >
                  About me
                </a>
              </div>
            </div>
            <Image
              src="/img/foto-santai-1.webp"
              alt="Image Description"
              width={400}
              height={400}
              className="w-[40%] h-[40%] lg:w-[30%] lg:h-[30%] rounded-[15px]"
            />
          </div>

          {/* About Me */}
          <div id="about" className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-10">
            {/* Image */}
            <div className="w-full flex justify-center">
              <Image
                src="/img/foto-gaya-2.webp"
                alt="Image Description"
                width={300}
                height={300}
                className="max-w-[300px] rounded-[15px]"
              />
            </div>

            {/* Text */}
            <div className="w-full flex justify-center text-center flex-col">
              <span className="lg:text-[48px] text-2xl">Hello there!</span>
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
          {/* </div> */}
          {/* <div
          ref={(elementObjek) => {
            if (elementObjek && !infosRef.current.includes(elementObjek)) infosRef.current.push(elementObjek);
          }}
          className="mb-8"
        > */}
          <div>
            <h5 className="text-[48px]">About me</h5>
            {/* <h5 className="text-[28px]">Discover what I’m passionate about!</h5> */}
          </div>

          {/* 
          about me
           */}

          <div>
            I&apos;m currently a student at Indo Global Mandiri University, majoring in Informatics Engineering (Teknik
            Informatika). During my studies, I&apos;ve been learning various topics in the fielementObjekd of
            technology, such as machine learning, game development using Roblox Studio, and website development.
            I&apos;m interested in the world of websites, including front-end, back-end, and even UI/UX design.
          </div>

          <div className="grid lg:grid-cols-2 grid-cols-1lg:gap-5 gap-2 ">
            <AboutCard
              title="Websites"
              content="Ex aliqua fugiat laborum excepteur est enim laboris minim duis. Consequat nulla sunt ex amet. Anim exercitation et anim anim qui sint dolor excepteur pariatur aliquip est1."
            />
            <AboutCard
              title="Machine Learning"
              content="Ex aliqua fugiat laborum excepteur est enim laboris minim duis. Consequat nulla sunt ex amet. Anim exercitation et anim anim qui sint dolor excepteur pariatur aliquip est."
            />
            <AboutCard
              title="Game Programing"
              content="Ex aliqua fugiat laborum excepteur est enim laboris minim duis. Consequat nulla sunt ex amet. Anim exercitation et anim anim qui sint dolor excepteur pariatur aliquip est."
            />
            <AboutCard
              title="UI/UX Design"
              content="Ex aliqua fugiat laborum excepteur est enim laboris minim duis. Consequat nulla sunt ex amet. Anim exercitation et anim anim qui sint dolor excepteur pariatur aliquip est."
            />
          </div>
        </div>
        {/* Hard Skill */}
        <div
          ref={(elementObjek) => {
            if (elementObjek && !objekRef.current.includes(elementObjek)) objekRef.current.push(elementObjek);
          }}
        >
          <div ref={hardContainerRef} className="mb-8">
            <h2 className="text-center text-2xl font-bold mb-8">Skill / Tech stack</h2>

            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {[0, 1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  ref={(elementObjek) => {
                    if (elementObjek) hardCardsRef.current[i] = elementObjek; // TypeScript safe
                  }}
                >
                  <MiniCard information={minicardDefault} />
                </div>
              ))}
            </div>
            {/* <div className="flex justify-center">
              <PrimaryButton buttonText="See more" />
            </div> */}
          </div>
        </div>
        {/* Soft Skill */}{" "}
        <div
          ref={(elementObjek) => {
            if (elementObjek && !objekRef.current.includes(elementObjek)) objekRef.current.push(elementObjek);
          }}
        >
          <div ref={softContainerRef} className="mb-8">
            <h2 className="text-center text-2xl font-bold mb-8">Soft Skill</h2>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {[0, 1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  ref={(elementObjek) => {
                    if (elementObjek) softCardsRef.current[i] = elementObjek; // TypeScript safe
                  }}
                >
                  <MiniCard information={minicardDefault} />
                </div>
              ))}
            </div>
            {/* <div className="flex justify-center">
              <PrimaryButton buttonText="See more" />
            </div> */}
          </div>
        </div>
        {/* Experience */}
        <div
          ref={(elementObjek) => {
            if (elementObjek && !objekRef.current.includes(elementObjek)) objekRef.current.push(elementObjek);
          }}
        >
          <div className="mb-8 grid">
            <span className="text-2xl font-bold mb-4 block">Experience</span>
            <div className="grid grid-cols-5 border-b border-dotted border-gray-400 py-2">
              <span className="col-span-4">
                Event Lead – UI/UX Design Workshop: “Interactive UI & User-Friendly UX”
              </span>
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
              <span className="col-span-4">Website Pendaftarakan Skripsi Teknik Informatika UIGM (proyek KP)</span>
              <span className="flex items-center justify-end">2025</span>
            </div>

            <div className="grid grid-cols-5 border-b border-dotted border-gray-400 py-2">
              <span className="col-span-4">Bank Soal Kating</span>
              <span className="flex items-center justify-end">2024</span>
            </div>

            <div className="grid grid-cols-5 border-b border-dotted border-gray-400 py-2">
              <span className="col-span-4">Coming soon</span>
              <span className="flex items-center justify-end">Coming soon</span>
            </div>
          </div>
        </div>
        {/* 
        contribution chard github 
        */}
        <div className="mb-8">
          <span className="text-2xl font-bold mb-4 block">Github Activity</span>

          <div
            ref={(elementObjek) => {
              if (elementObjek && !objekRef.current.includes(elementObjek)) objekRef.current.push(elementObjek);
            }}
          >
            <div className="border border-gray-300 rounded-xl mb-8 py-8 px-10">
              <div className="flex mb-4 flex-col">
                <h3 className="text-2xl font-bold mb-3 text-center">Github Contribution</h3>
                <span>Hari-hari reboisasi :)</span>
                <div className="">
                  Untuk lihat lebih lengkap, kamu bisa kunjungi profil GitHub saya 🚀
                  <a
                    href="https://github.com/surya54p"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-500  ms-1"
                  >
                    Click disini!
                  </a>
                </div>
                <div className="grid lg:grid-cols-3 mt-2 lg:mt-3 gap-2 lg:gap-5">
                  <GithubContributionCard title="In Total" timeType="total" />
                  <GithubContributionCard title="This Year" timeType="thisYear" />
                  <GithubContributionCard title="This Month" timeType="thisMonth" />
                </div>
              </div>
              {/* <ContributionChart /> */}
            </div>
          </div>

          {/* 
            top language chart
            */}
          <div
            ref={(elementObjek) => {
              if (elementObjek && !objekRef.current.includes(elementObjek)) objekRef.current.push(elementObjek);
            }}
            className="border border-gray-300 rounded-xl mb-8 py-8 px-10"
          >
            <div>
              <h3 className="text-2xl font-bold mb-3 text-center">Top Language</h3>
              <span>The most language i used in my project. 🦾</span>
            </div>
            <TopLanguagesChart />
          </div>
        </div>
        {/*
      CARD LIKE
      */}
        <div
          ref={(elementObjek) => {
            if (elementObjek && !objekRef.current.includes(elementObjek)) objekRef.current.push(elementObjek);
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 border border-gray-300 rounded-xl mb-8 py-8 px-10 lg:gap-15 gap-3">
            {/* Kiri: teks */}
            <div className="flex flex-col items-start w-fit mb-5 lg:mb-0 lg:w-100 ">
              <span className="text-2xl font-bold mb-3 block">Like kalau kamu suka🚀</span>
              <span>
                Kalau kamu mau kasih like masukin aja namamu, kalau komentar boleh pribadi lewat ig @surya54p_ 😁
              </span>
            </div>
            {/* form like */}
            <form onSubmit={handleSubmit} className="flex flex-col grid- items-center gap-4 w-full  " method="post">
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Input nama untuk like"
                className="px-6 py-3 bg-[#fff]  rounded-full w-full shadow-[0px_0.5px_10px_rgba(0,0.5,0,0.25)]"
              />

              <PrimaryButton
                type="submit"
                buttonText={
                  loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Spinner /> Processing
                    </div>
                  ) : (
                    "Submit"
                  )
                }
                className="w-full"
              />
            </form>
          </div>
          {showToast && (
            <div
              className={`toast-anim border-2 px-4 py-2 rounded
    ${toastType ? "bg-green-100 text-green-800 border-green-500" : "bg-red-100 text-red-800 border-red-500"}
  `}
            >
              {toastMsg}
            </div>
          )}
          <LikeMarquee />
        </div>
      </section>
      {/* Right (25%) */}
      <aside className="lg:col-span-3 hidden lg:block"></aside>
    </main>
  );
};

export default Home;
