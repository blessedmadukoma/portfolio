import type { Component } from "vue";

import Blog from "~/components/navs/blog.vue";
import Experience from "~/components/navs/experience.vue";
import Projects from "~/components/navs/projects.vue";
import Research from "~/components/navs/research.vue";
import Tools from "~/components/navs/tools.vue";

type NavBarComponentMap = {
  [key: string]: Component;
};

export const NavBarComponents: NavBarComponentMap = {
  thoughts: Blog,
  experience: Experience,
  research: Research,
  projects: Projects,
  tools: Tools,
};
