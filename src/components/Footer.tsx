"use client";

import { NameIcon } from "@/icons/icons";
import useWindowSize from "@rooks/use-window-size";

const Footer = () => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date = new Date();
  let day = weekday[date.getDay()];

  const size = useWindowSize();

  let width: number = size?.innerWidth?.valueOf() || 0;

  return (
    <div className="bg-footer mx-[20px] md:mx-14 max-w-full rounded-t-[50px] pb-12 pt-10">
      <div className="grid grid-cols-2 justify-between pl-8 px-[20px] md:px-[150px] m-auto w-full gap-10">
        <div className="flex flex-col text-start space-y-6">
          <h2 className="font-semibold md:text-xl">Categories</h2>
          <span className="text-[#939196] text-sm md:text-base">Home</span>
          <span className="text-[#939196] text-sm md:text-base">Projects</span>
          <span className="text-[#939196] text-sm md:text-base">Tools</span>
          <span className="text-[#939196] text-sm md:text-base">Blog</span>
          <span className="text-[#939196] text-sm md:text-base">
            Contact Me
          </span>
        </div>

        <div className="flex flex-col text-start space-y-6">
          <h2 className="font-semibold md:text-xl">Links</h2>
          <span className="text-[#939196] text-sm md:text-base">Github</span>
          <span className="text-[#939196] text-sm md:text-base">LinkedIn</span>
          <span className="text-[#939196] text-sm md:text-base">Twitter</span>
          <span className="text-[#939196] text-sm md:text-base">Hashnode</span>
        </div>
      </div>

      <div className="mt-10 flex justify-between pl-8 px-[20px] md:px-[150px] text-end items-end">
        <div className="text-[#939196] text-xs md:text-base">
          @2023 Blessed.
        </div>
        <div className="text-[#939196] text-center flex flex-col items-center">
          <div className="w-40 md:w-56 relative">
            <img src="./icons/memoji.png" alt="" />
            <div className="absolute -top-1 right-[14px] md:top-7 md:right-12 animate-spin-slow">
              {width < 768 ? (
                <NameIcon width="130" />
              ) : (
                <NameIcon width="164" />
              )}
            </div>
          </div>
          <span className="text-xs md:text-base">
            Have a wonderful {day} 🚀
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
