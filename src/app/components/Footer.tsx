import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex justify-center ">
      <div className="w-[100%]  text-white rounded-t-4xl h-58 p-16 md:w-[70%] md:items-center bg-gray-900 flex flex-row justify-between items-center">
        <div className="flex flex-col justify-center gap-2">
          <div>
            <h1 className="text-xl font-bold">Surya Ario Pratama Portfolio</h1>
            <p className="text-sm text-gray-400">Website | Ui & Ux | Machine Learning Enthusiast</p>
          </div>

          <div className="flex justify-between items-end">
            <div className="flex space-x-4">
              <a
                href="https://github.com/surya54p"
                className="hover:text-blue-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/username"
                className="hover:text-blue-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com/surya54p_"
                className="hover:text-blue-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="relative w-40 h-40 invisible md:visible">
          <div className="absolute w-28 h-40 top-0 left-1/2 -translate-x-1/2 z-30">
            <Image
              src="/img/bank-soal-1.webp"
              alt="Bank Soal"
              width={112}
              height={160}
              className="object-cover rounded shadow-lg rotate-[-25deg]"
            />
          </div>

          <div className="absolute w-28 h-40 top-2 left-1/2 -translate-x-1/2 z-20">
            <Image
              src="/img/foodie-1.webp"
              alt="Foodie"
              width={112}
              height={160}
              className="object-cover rounded shadow-lg rotate-[0deg]"
            />
          </div>

          <div className="absolute w-28 h-40 top-4 left-1/2 -translate-x-1/2 z-10">
            <Image
              src="/img/wireframe-1.webp"
              alt="Wireframe"
              width={112}
              height={160}
              className="object-cover rounded shadow-lg rotate-[25deg]"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
