"use client";

import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  console.log(`Current path: ${pathname}`);

  const isHome = pathname === "/";

  const active = "text-white border-b-2 border-[#A7A4A5]";

  return (
    <nav className="mt-24 py-8 sticky top-0 md:top-[64px] z-0 md:z-0 backdrop-blur-sm border-[#292844] border-y-[0.8px]">
      <div className="flex justify-evenly text-[#A7A4A5] text-sm md:text-base">
        <a href="/" className={`${isHome ? `hidden` : "visible"}`}>
          <div>Home</div>
        </a>

        <a
          href="#projects"
          className={`${pathname == "#projects" ? active : ""}`}
        >
          <div>Projects</div>
        </a>

        <a href="#tools" className={`${pathname == "#tools" ? active : ""}`}>
          <div>Tools</div>
        </a>

        <a href="#blog" className={`${pathname == "#blog" ? active : ""}`}>
          <div>Blog</div>
        </a>

        <a
          href="#contact"
          className={`${pathname == "#contact" ? active : ""}`}
        >
          <div>Contact</div>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
