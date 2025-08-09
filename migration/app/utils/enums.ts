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
  projects: Projects,
  experience: Experience,
  research: Research,
  blog: Blog,
  tools: Tools,
};
