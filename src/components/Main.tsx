"use client";

import { LineIcon, PointedArrow } from "@/icons/icons";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Blog from "./Blog";
import Contact from "./Contact";
import Navbar from "./Navbar";
import { Projects } from "./Projects";
import Tools from "./Tools";

const client = new ApolloClient({
  uri: "https://gql.hashnode.com",
  // uri: "https://mblessed.hashnode.dev",
  cache: new InMemoryCache(),
  headers: {
    Authorization: process.env.NEXT_PUBLIC_API_HASHNODE_TOKEN!,
  },
});

const Main = () => {
  return (
    <div className="py-20 flex flex-col justify-center md:w-[768px] lg:w-[1100px] m-auto">
      {/* Introduction */}
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
          <span className="ml-2 md:text-xl">Software Engineer</span>
          {/* <span className="ml-2 md:text-xl font-light">Product Engineer</span> */}
        </div>
      </div>

      <div className="my-16 text-sm md:text-xl tracking-wide font-extralight w-[340px] md:w-[768px] lg:w-[1000px] mx-auto md:mx-auto">
        I am a <span className="text-[#6965D8]">data-driven engineer</span> with
        3+ years of excellent software engineering experience transforming
        complex data into user-friendly solutions that{" "}
        <span className="text-[#6965D8]">drive</span> customer success across
        various industries — having delivered and maintained over a number
        projects for several companies, demonstrating a commitment to
        collaboration and tailored solutions.
      </div>

      <div className="flex justify-evenly">
        <a
          href="https://docs.google.com/document/d/151mUem2Jq3V_028rhx_ICpoDixSKmP_mkMTUZhzesWM/view"
          target="_blank"
        >
          <div className="bg-[#e6e6e6] rounded-[4px] p-4 text-gray-900 font-medium text-sm md:text-base flex items-center hover:underline">
            <span className="mr-2">View My Resume</span>{" "}
            <PointedArrow color="black" />
          </div>
        </a>

        <a href="#contact">
          <div className="border border-[#e6e6e6] rounded-[4px] p-4 text-white font-medium text-sm md:text-base flex items-center">
            <span className="mr-2">Get In Touch</span>{" "}
            <PointedArrow color="white" />
          </div>
        </a>
      </div>
      {/* End of Introduciton */}

      {/* Navbar */}
      <Navbar />
      <div className="mt-6 mb-22 space-y-4 mx-auto flex flex-col items-center">
        {/* <h2 className="text-xl tracking-wider font-extralight">Scroll down</h2> */}
        {/* <ArrowDown /> */}
        <p className="text-7xl text-center animate-bounce">↓</p>
      </div>
      {/* End of Navbar */}

      {/* Projects */}
      <div id="projects" className="mt-40"></div>
      <Projects />
      {/* End of Projects */}

      {/* Tools */}
      <div id="tools" className="mt-40"></div>
      <Tools />
      {/* End of Tools */}

      {/* Blog */}
      <ApolloProvider client={client}>
        <div id="blog" className="mt-40"></div>
        <Blog />
      </ApolloProvider>
      {/* End of Blog */}

      {/* Contact */}
      <div id="contact" className="mt-40 md:mt-20"></div>
      <Contact />
      {/* End of Contact */}
    </div>
  );
};

export default Main;
