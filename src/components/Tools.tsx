import { TOOLS, OTHER_TOOLS } from "@/data/tools";
import { ArrowRight } from "@/icons/icons";

const Tools = () => {
  const tools = TOOLS;

  return (
    <div className="md:my-24 tracking-wide">
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
                <div key={id} className="flex items-center text-center">
                  <img
                    src={`${tool.image}`}
                    alt={tool.name}
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-extralight ml-1 tracking-wider">
                    {tool.name}
                  </span>
                </div>
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
              <div key={id} className="flex items-center text-center">
                <img
                  src={`${tool.image}`}
                  // alt={tool.name}
                  className="w-5 h-5"
                />
                <span className="text-sm font-extralight ml-1 tracking-wider">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
