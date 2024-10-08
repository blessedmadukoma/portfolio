import { LinkIcon } from "@/icons/icons";
import Image from "next/image";
import { PROJECTS } from "../data/projects";

export const Projects = () => {
  const projects = PROJECTS;
  return (
    <div className="py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, id) => (
          <div
            className="flex flex-col w-[340px] mx-auto bg-[#fff]/[0.07] px-5 py-4 rounded-[5px]"
            key={id}
          >
            <div className="mt-4 rounded-[4px] text-lg tracking-wider font-medium mx-auto">
              <Image
                src={project.imageURL}
                className="rounded-[5px] h-[170px]"
                alt={project.alt}
                width={300}
                height={170}
              />
              {/* <img
                src={project.imageURL}
                className="rounded-[5px] max-h-[170px] h-[170px]"
                alt={project.alt}
              /> */}
            </div>
            <div className="text-start mt-6 items-start">
              <h3 className="text-lg ">{project.title}</h3>
              <p className="py-2 mt-4 text-sm tracking-wide font-light text-[#a7a4a5] h-[80px]">
                {project.description}
              </p>
            </div>

            <div className="flex tracking-wide text-sm mb text-start py-6 text-white">
              <a
                href={`${project.github}`}
                target="_blank"
                className={`${
                  project.github
                    ? "visible hover:text-[#a7a4a5] hover:border-b mr-6"
                    : "hidden"
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-1">Github</span>
                  <LinkIcon />
                </div>
              </a>

              {project.live && !project.apiDoc ? (
                <a
                  href={`${project.live}`}
                  target="_blank"
                  className={`${
                    project.live
                      ? "visible hover:text-[#a7a4a5] hover:border-b"
                      : "hidden"
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-1">Live</span>
                    <LinkIcon />
                  </div>
                </a>
              ) : (
                <a
                  href={`${project.apiDoc}`}
                  className={`${
                    project.apiDoc
                      ? "visible hover:text-[#a7a4a5] hover:border-b"
                      : "hidden"
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-1">Doc</span>
                    <LinkIcon />
                  </div>
                </a>
              )}
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
