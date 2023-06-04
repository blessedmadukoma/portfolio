"use client";

import { NameIcon } from "@/icons/icons";
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

  // const filtered = links
  //   .filter((link) => {
  //     if (link.name == "memoji") {
  //       return false;
  //     }
  //     return true;
  //   })
  //   .map((link) => {
  //     return (
  //       <span className="text-[#939196] text-sm md:text-base" key={id}>
  //             {link.name}
  //           </span>
  //     )
  //   });

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
          {links
            .filter((link) => {
              if (link.name == "Memoji") {
                return false;
              }
              return true;
            })
            .map((link, id) => {
              return (
                <a href={link.url} target="_blank">
                  <span
                    className="text-[#939196] text-sm md:text-base"
                    key={id}
                  >
                    {link.name}
                  </span>
                </a>
              );
            })}
        </div>
      </div>

      <div className="mt-5 flex justify-between pl-8 px-[20px] md:px-[150px] text-end items-end">
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
