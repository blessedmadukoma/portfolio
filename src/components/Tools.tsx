/* eslint-disable @next/next/no-img-element */
import { TOOLS, OTHER_TOOLS } from "@/data/tools";
import { ArrowRight } from "@/icons/icons";

const Tools = () => {
  const tools = TOOLS;

  return (
    <div className="md:my-24 tracking-wide" id="tools">
      <div className="text-start mx-5 md:mx-4 lg:mx-8 mb-8 text-3xl font-semibold">
        Tools
      </div>
      <div className="rounded-2xl mx-5 md:mx-4 lg:mx-8 bg-[#18173B] text-start">
        <div className="p-6">
          <h2 className="text-lg">Tools</h2>

          <div className="mt-2">
            <span className="text-sm font-light mx-auto">
              My primary stack includes Go, Next.js and PostgreSQL. Some of the
              languages, frameworks, libraries, applications and software tools
              I use/used include:
            </span>
          </div>

          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10 mb-6">
              {tools.map((tool, id) => (
                <a
                  key={id}
                  target="_blank"
                  className="flex flex-row items-center m-4 space-x-2 grayscale hover:grayscale-0"
                  href="https://typescriptlang.org"
                >
                  <img src={tool.image} alt={tool.name} className="w-5" />
                  <span className="hover:from-gray-500 hover:to-gray-500 after:hover:from-gray-400 after:hover:to-gray-500 relative whitespace-nowrap  bg-gradient-to-r from-gray-500 to-gray-500 bg-clip-text text-gray-200 text-sm tracking-wider font-extralight decoration-green-500 decoration-2 transition-all after:absolute after:-bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gradient-to-r after:opacity-80 after:transition-transform after:duration-500 after:ease-spring hover:after:origin-bottom-left hover:after:scale-x-100 after:origin-right after:scale-x-0">
                    {tool.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-[0.1px] border-[rgb(255,255,255,30%)] rounded-b-2xl p-6 space-y-4">
          <div>
            <div className="flex items-center text-start">
              <ArrowRight />
              <span className="ml-2 font-light text-sm">
                Honourable mentions (Either used in ages past, or personal
                interest to take a deeper look):
              </span>
            </div>
          </div>

          <div className="lg:flex grid grid-cols-2 md:grid-cols-3 gap-6 lg:space-x-24 flex-wrap pt-4 pb-2">
            {OTHER_TOOLS.map((tool, id) => (
              <a
                key={id}
                target="_blank"
                className="flex flex-row items-center m-4 space-x-2 grayscale hover:grayscale-0"
                href="https://typescriptlang.org"
              >
                <img src={tool.image} alt={tool.name} className="w-[18px]" />
                <span className="hover:from-gray-500 hover:to-gray-500 after:hover:from-gray-400 after:hover:to-gray-500 relative whitespace-nowrap bg-gradient-to-r from-gray-500 to-gray-500 bg-clip-text text-gray-200 text-sm tracking-wider font-extralight decoration-green-500 decoration-2 transition-all after:absolute after:-bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gradient-to-r after:opacity-80 after:transition-transform after:duration-500 after:ease-spring hover:after:origin-bottom-left hover:after:scale-x-100 after:origin-right after:scale-x-0">
                  {tool.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
