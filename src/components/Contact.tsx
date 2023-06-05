import { LineIcon, PointedArrow } from "@/icons/icons";
import React from "react";

const Contact = () => {
  return (
    <div className="text-start mx-6 md:mx-10">
      <h2 className="text-3xl font-semibold md:text-4xl">Contact Me</h2>
      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 bg-[#18173B] rounded-2xl my-6 p-4 md:p-8">
        <section className="hidden md:block text-end mr-10">
          <div className="">
            <div className="mx-auto text-end">
              <div>
                <h2 className="text-4xl tracking-widest font-bold text-[#5651dd]">
                  Madukoma{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#5651dd] via-[#6e6ad6] to-[#fafafa]">
                    Blessed
                  </span>
                </h2>
              </div>
              <div className="flex items-center justify-end">
                <LineIcon />
                <span className="ml-2 md:text-lg">Backend Engineer</span>
              </div>
            </div>
          </div>

          <div className="mt-20 tracking-wider font-extralight text-start text-lg">
            I am a software engineer with 3+ years of experience, tasked with
            <span className="text-[#6965D8]"> demystifying </span> the amazing
            world of scalable, performant systems by designing and developing
            high-quality backend services.
          </div>

          <div className="w-[200px] text-center mt-20">
            <a
              href="https://drive.google.com/file/d/14yXfFGJreY509NT031tIQZClXqt_JtRa/view?usp=sharing"
              target="_blank"
            >
              <div className="border border-[#e6e6e6] rounded-[4px] p-4 font-medium text-sm md:text-base flex items-center">
                <span className="mr-2">View My Resume</span>{" "}
                <PointedArrow color="white" />
              </div>
            </a>
          </div>
        </section>
        <div>2</div>
      </div>
    </div>
  );
};

export default Contact;
