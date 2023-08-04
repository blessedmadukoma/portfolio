"use client";

import { NameIcon, PointedArrow } from "@/icons/icons";
import useWindowSize from "@rooks/use-window-size";
import { LINKS } from "../data/profile_links";

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

  const links = LINKS;

  return (
    <div className="bg-footer mx-[20px] md:mx-14 max-w-full rounded-t-[50px] pb-12 pt-10">
      <div className="grid grid-cols-2 justify-between pl-8 px-[20px] md:px-[150px] m-auto w-full gap-10">
        <div className="flex flex-col text-start space-y-6">
          <h2 className="font-semibold md:text-xl">Categories</h2>
          <a href="#">
            <div className="text-[#939196] text-sm md:text-base flex items-center hover:underline hover:text-[#fafafa]">
              <span className="mr-1">Home</span>
              <PointedArrow color="#c5c5c5" />
            </div>
          </a>

          <a href="#">
            <div className="text-[#939196] text-sm md:text-base flex items-center hover:underline hover:text-[#fafafa]">
              <span className="mr-1">Projects</span>
              <PointedArrow color="#c5c5c5" />
            </div>
          </a>

          <a href="#">
            <div className="text-[#939196] text-sm md:text-base flex items-center hover:underline hover:text-[#fafafa]">
              <span className="mr-1">Tools</span>
              <PointedArrow color="#c5c5c5" />
            </div>
          </a>

          <a href="#">
            <div className="text-[#939196] text-sm md:text-base flex items-center hover:underline hover:text-[#fafafa]">
              <span className="mr-1">Blog</span>
              <PointedArrow color="#c5c5c5" />
            </div>
          </a>
        </div>

        <div className="flex flex-col text-start space-y-6">
          <h2 className="font-semibold md:text-xl">Links</h2>
          {links
            .filter((link) => {
              if (link.name == "Memoji") {
                return false;
              }
              return true;
            })
            .map((link, id) => {
              return (
                <a href={link.url} target="_blank" key={id}>
                  <div className="text-[#939196] text-sm md:text-base flex items-center hover:underline hover:text-[#fafafa]">
                    <span className="mr-1">{link.name}</span>
                    <PointedArrow color="#c5c5c5" />
                  </div>
                </a>
              );
            })}
        </div>
      </div>

      <div className="mt-5 md:flex md:justify-between md:pl-8 px-[20px] md:px-[150px] text-end items-end">
        <div className="hidden md:block text-[#939196] text-xs md:text-base">
          @2023 Blessed.
        </div>
        <div className="text-[#939196] text-center flex flex-col items-center">
          <div className="w-40 md:w-56 relative">
            <img src="./icons/memoji.png" alt="" />
            <div className="absolute -top-1 right-[14px] md:top-7 md:right-[3rem] animate-spin-slow">
              {width < 768 ? (
                <NameIcon width="130" />
              ) : (
                <NameIcon width="164" />
              )}
            </div>
          </div>
          <span className="text-xs md:text-base">
            Have a wonderful <span className="text-white">{day}</span> 🚀
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
