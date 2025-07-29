import Link from "next/link";
import AboutCard from "../components/AboutCard";
export default function About() {
  return (
    <main className="flex-grow w-full sm:w-[80%] md:max-w-[70%] lg:max-w-[50%] mx-auto p-7 rounded box-shadow-paper-effect-3d hover:shadow-none">
      {" "}
      <div>
        <h5 className="text-[48px]">About me</h5>
        <h5 className="text-[28px]">Discover what I’m passionate about!</h5>
      </div>
      <div>
        My name is Surya Ario, but you can call me Surya. I'm currently a student at Indo Global Mandiri University,
        majoring in Informatics Engineering (Teknik Informatika). During my studies, I've been learning various topics
        in the field of technology, such as machine learning, game development using Roblox Studio, and website
        development. I'm interested in the world of websites, including front-end, back-end, and even UI/UX design.
      </div>
      <AboutCard
        title="Websites"
        content="Ex aliqua fugiat laborum excepteur est enim laboris minim duis. Consequat nulla sunt ex amet. Anim exercitation et anim anim qui sint dolor excepteur pariatur aliquip est."
      />
      <AboutCard
        title="Machine Learning"
        content="Ex aliqua fugiat laborum excepteur est enim laboris minim duis. Consequat nulla sunt ex amet. Anim exercitation et anim anim qui sint dolor excepteur pariatur aliquip est."
      />
      <AboutCard
        title="Game Programing"
        content="Ex aliqua fugiat laborum excepteur est enim laboris minim duis. Consequat nulla sunt ex amet. Anim exercitation et anim anim qui sint dolor excepteur pariatur aliquip est."
      />
    </main>
  );
}
