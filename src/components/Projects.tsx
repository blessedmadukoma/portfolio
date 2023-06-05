import { LinkIcon } from "@/icons/icons";
import { PROJECTS } from "../data/projects";

export const Projects = () => {
  const projects = PROJECTS;
  return (
    <div className="py-24" id="projects">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {projects.map((project, id) => (
          <div
            className="flex flex-col w-[340px] mx-auto bg-[#fff]/[0.07] px-5 py-4 rounded-[4px]"
            key={id}
          >
            <div className="mt-4 rounded-[4px] text-lg tracking-wider font-medium mx-auto">
              <img
                src={project.imageURL}
                className="h-[170px] max-h-[170px] w-[300px]"
                alt={project.alt}
              />
            </div>
            <div className="text-start mt-6 items-start">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="py-2 mt-4 text-base font-light text-[#a7a4a5] h-[50px]">
                {project.description}
              </p>
            </div>

            <div className="flex tracking-wide text-sm mb text-start space-x-6 py-6 text-white">
              <a
                href={`${project.github}`}
                className="hover:text-[#a7a4a5] hover:border-b"
              >
                <div className="flex items-center">
                  <span className="mr-1">Github</span>
                  <LinkIcon />
                </div>
              </a>

              <a
                href={`${project.live}`}
                className={`${
                  project.live
                    ? "visible hover:text-[white] hover:border-b"
                    : "hidden"
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-1">Live</span>
                  <LinkIcon />
                </div>
              </a>
            </div>

            {/* tools used */}
            <div className="flex flex-wrap mb-4">
              {project.technologies.map((tech, id) => (
                <span
                  className="text-xs flex space-x-8 mb-2 py-1 px-2 rounded-[4px] flex-wrap text-gray-900 mr-3 bg-[#fff]"
                  key={id}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
