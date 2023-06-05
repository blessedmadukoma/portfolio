import { TOOLS } from "@/data/tools";

const Tools = () => {
  const tools = TOOLS;

  return (
    <div className="md:my-24">
      <div className="text-start mx-5 md:mx-4 lg:mx-8 mb-8 text-3xl font-semibold">
        Tools
      </div>
      <div className="rounded-2xl mx-5 md:mx-4 lg:mx-8 bg-[#18173B] text-start p-6">
        <h2 className="text-lg">Tools</h2>

        <div className="mt-2">
          <span className="text-sm font-light mx-auto">
            My primary stack includes Go, Svelte, Next.js and PostgreSQL. Some
            of the languages, frameworks, libraries, applications and software
            tools I use/used include:
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10 mb-6">
          {tools.map((tool, id) => (
            <div key={id} className="flex items-center text-center">
              <img src={`${tool.image}`} alt={tool.name} className="w-5 h-5" />
              <span className="text-sm font-extralight ml-1">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;
