import { LineIcon, PointedArrow } from "@/icons/icons";

const Main = () => {
  return (
    <div className="py-28 flex flex-col justify-center md:w-[768px] lg:w-[1280px] m-auto">
      <div className="mx-auto">
        <div>
          <h2 className="text-2xl md:text-5xl font-bold text-[#5651dd]">
            Madukoma{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#5651dd] via-[#6e6ad6] to-[#fafafa]">
              Blessed
            </span>
          </h2>
        </div>
        <div className="flex items-center justify-end">
          <LineIcon />
          <span className="ml-2 md:text-xl">Backend Engineer</span>
        </div>
      </div>

      <div className="my-36 text-sm md:text-2xl lg:text-2xl font-extralight w-[340px] md:w-[860px] lg:w-[1000px] m-auto">
        I am a software engineer with 3+ years experience, tasked with
        <span className="text-[#6965D8]"> demystifying </span> the amazing world
        of scalable, performant systems by designing and developing high-quality
        backend services.
      </div>

      <div className="flex justify-evenly">
        <a
          href="https://drive.google.com/file/d/14yXfFGJreY509NT031tIQZClXqt_JtRa/view?usp=sharing"
          target="_blank"
        >
          <div className="bg-[#e6e6e6] rounded-[4px] p-4 text-gray-900 font-medium text-sm md:text-base flex items-center">
            <span className="mr-2">View My Resume</span>{" "}
            <PointedArrow color="black" />
          </div>
        </a>

        <div className="border border-[#e6e6e6] rounded-[4px] p-4 text-white font-medium text-sm md:text-base flex items-center">
          <span className="mr-2">Get In Touch</span>{" "}
          <PointedArrow color="white" />
        </div>
      </div>
    </div>
  );
};

export default Main;
