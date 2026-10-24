export type ToolCategory =
  | "language"
  | "web"
  | "database"
  | "devops"
  | "data"
  | "research";

export interface Tool {
  name: string;
  URL: string;
  image: string;
  category: ToolCategory;
  // Dark icons (black or navy) turn white in dark mode so they stay visible.
  darkInvert?: boolean;
}

export const TOOL_CATEGORIES: { key: ToolCategory; label: string }[] = [
  { key: "language", label: "Languages" },
  { key: "web", label: "Frameworks & Libraries" },
  { key: "database", label: "Databases" },
  { key: "devops", label: "DevOps, Cloud & Infra" },
  { key: "data", label: "Data, ML & LLMs" },
  { key: "research", label: "Research & Writing" },
];

export const TOOLS: Tool[] = [
  {
    name: "Go",
    URL: "https://go.dev/",
    image:
      "https://res.cloudinary.com/dqjowwy5k/image/upload/v1685996009/portfolio-images/icons/logo_go_w6kgro.svg",
    category: "language",
  },
  {
    name: "Python",
    URL: "https://www.python.org/",
    // image:
    //   "https://res.cloudinary.com/dqjowwy5k/image/upload/v1685996011/portfolio-images/icons/logos_python_v4xkxb.svg",
    image: "https://cdn.simpleicons.org/python",
    category: "language",
  },
  {
    name: "Javascript",
    URL: "https://www.javascript.com/",
    image:
      "https://res.cloudinary.com/dqjowwy5k/image/upload/v1685996008/portfolio-images/icons/jslogo_ldlcqj.svg",
    category: "language",
  },
  {
    name: "Typescript",
    URL: "https://www.typescriptlang.org/",
    // image:
    //   "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1280px-Typescript_logo_2020.svg.png",
    image: "https://cdn.simpleicons.org/typescript",
    category: "language",
  },
  {
    name: "VueJS",
    URL: "https://vuejs.org",
    image:
      "https://res.cloudinary.com/dqjowwy5k/image/upload/v1689718701/portfolio-images/icons/vue-logo_b4lpou.svg",
    category: "web",
  },
  {
    name: "Nuxt",
    URL: "https://nuxt.com",
    image:
      "https://res.cloudinary.com/dqjowwy5k/image/upload/v1713428802/portfolio-images/nuxt_ubxyan.png",
    category: "web",
  },
  // {
  //   name: "NestJS",
  //   URL: "https://nestjs.org/",
  //   image: "https://docs.nestjs.com/assets/logo-small.svg",
  // },
  // {
  //   name: "React",
  //   URL: "https://reactjs.org/",
  //   // image:
  //   //   "https://res.cloudinary.com/dqjowwy5k/image/upload/v1685996010/portfolio-images/icons/logo_ract_okeq3a.svg",
  //   image: "https://cdn.simpleicons.org/react",
  // },
  {
    name: "NextJS",
    URL: "https://nextjs.org/",
    image:
      "https://res.cloudinary.com/dqjowwy5k/image/upload/v1685996009/portfolio-images/icons/logo_next_m8h67m.svg",
    category: "web",
  },
  {
    name: "TailwindCSS",
    URL: "https://tailwindcss.com/",
    image:
      "https://res.cloudinary.com/dqjowwy5k/image/upload/v1685996010/portfolio-images/icons/logo_tailwind_cznw0z.svg",
    category: "web",
  },
  {
    name: "PostgreSQL",
    URL: "https://www.postgresql.org/",
    image: "https://cdn.simpleicons.org/postgresql",
    category: "database",
  },
  {
    name: "MySQL",
    URL: "https://www.mysql.com/",
    image: "https://cdn.simpleicons.org/mysql",
    category: "database",
  },
  {
    name: "Redis",
    URL: "https://redis.io/",
    image: "https://cdn.simpleicons.org/redis",
    category: "database",
  },
  {
    name: "Docker",
    URL: "https://www.docker.com/",
    image: "https://cdn.simpleicons.org/docker",
    // image:
    //   "https://res.cloudinary.com/dqjowwy5k/image/upload/v1685996008/portfolio-images/icons/docker-icon_kfykje.svg",
    category: "devops",
  },
  // Hidden 24 Oct 2026: low signal for the roles he targets.
  // {
  //   name: "Git",
  //   URL: "https://git-scm.com/",
  //   image:
  //     "https://res.cloudinary.com/dqjowwy5k/image/upload/v1685996008/portfolio-images/icons/logo_git_qpfmlr.svg",
  //   category: "devops",
  // },
  {
    name: "NodeJS",
    URL: "https://nodejs.org/en/",
    image:
      "https://res.cloudinary.com/dqjowwy5k/image/upload/v1688022741/portfolio-images/icons/nodejs-icon_prfnyy.svg",
    category: "web",
  },
  {
    name: "Kafka",
    URL: "https://kafka.apache.org/",
    image: "https://cdn.simpleicons.org/apachekafka",
    category: "devops",
    darkInvert: true,
  },
  {
    name: "pytest",
    URL: "https://docs.pytest.org/",
    image: "https://cdn.simpleicons.org/pytest",
    category: "devops",
  },
  {
    name: "Ollama",
    URL: "https://ollama.com/",
    image: "https://cdn.simpleicons.org/ollama",
    category: "data",
    darkInvert: true,
  },
  // {
  //   name: "ExpressJS",
  //   URL: "https://expressjs.com/",
  //   image:
  //     "https://res.cloudinary.com/dqjowwy5k/image/upload/v1688022741/portfolio-images/icons/expressjs-icon_ddjpgu.svg",
  //   category: "web",
  // },
  // {
  //   name: "PHP",
  //   URL: "https://www.php.net/",
  //   image:
  //     "https://res.cloudinary.com/dqjowwy5k/image/upload/v1688022741/portfolio-images/icons/php-icon_z3tw82.svg",
  // },
  // {
  //   name: "Laravel",
  //   URL: "https://laravel.com/",
  //   image:
  //     "https://res.cloudinary.com/dqjowwy5k/image/upload/v1688022741/portfolio-images/icons/laravel-icon_mdwpno.svg",
  // },
  // {
  //   name: "Svelte",
  //   URL: "https://svelte.dev/",
  //   image:
  //     "https://res.cloudinary.com/dqjowwy5k/image/upload/v1688022741/portfolio-images/icons/devicon_svelte_zijbow.svg",
  // },
  // {
  //   name: "MongoDB",
  //   URL: "https://www.mongodb.com/",
  //   image:
  //     "https://res.cloudinary.com/dqjowwy5k/image/upload/v1688022741/portfolio-images/icons/logos_mongodb-icon_mxddbt.svg",
  // },
  {
    name: "Pandas",
    URL: "https://pandas.pydata.org/",
    image: "https://cdn.simpleicons.org/pandas",
    category: "data",
    darkInvert: true,
  },
  // Hidden 24 Oct 2026: low signal for the roles he targets.
  // {
  //   name: "Streamlit",
  //   URL: "https://streamlit.io/",
  //   image: "https://cdn.simpleicons.org/streamlit",
  //   category: "data",
  // },
  {
    name: "GitHub Actions",
    URL: "https://github.com/features/actions",
    image: "https://cdn.simpleicons.org/githubactions",
    category: "devops",
  },
  {
    name: "scikit-learn",
    URL: "https://scikit-learn.org/",
    image: "https://cdn.simpleicons.org/scikitlearn",
    category: "data",
  },
  // Hidden 24 Oct 2026: low signal for the roles he targets.
  // {
  //   name: "Plotly",
  //   URL: "https://plotly.com/",
  //   image: "https://cdn.simpleicons.org/plotly",
  //   category: "data",
  // },
  // {
  //   name: "Flask",
  //   URL: "https://flask.palletsprojects.com/",
  //   image: "https://cdn.simpleicons.org/flask",
  //   category: "web",
  // },
  {
    name: "FastAPI",
    URL: "https://fastapi.tiangolo.com/",
    image: "https://cdn.simpleicons.org/fastapi",
    category: "web",
  },
  {
    name: "DuckDB",
    URL: "https://duckdb.org/",
    image: "https://cdn.simpleicons.org/duckdb",
    category: "database",
  },
  // {
  //   name: "Airflow",
  //   URL: "https://airflow.apache.org/",
  //   image: "https://cdn.simpleicons.org/apacheairflow",
  //   category: "devops",
  // },
  // {
  //   name: "XGBoost",
  //   URL: "https://xgboost.ai/",
  //   image: "https://cdn.simpleicons.org/xgboost",
  //   category: "data",
  // },
  {
    name: "HTMX",
    URL: "https://htmx.org/",
    image: "https://cdn.simpleicons.org/htmx",
    category: "web",
  },
  {
    name: "Ansible",
    URL: "https://www.ansible.com/",
    image: "https://cdn.simpleicons.org/ansible",
    category: "devops",
  },
  // {
  //   name: "VS Code",
  //   URL: "https://code.visualstudio.com/",
  //   image:
  //     "https://res.cloudinary.com/dqjowwy5k/image/upload/v1685996010/portfolio-images/icons/logo_vscode_cmy0ix.svg",
  // },
  // Hidden 24 Oct 2026: low signal for the roles he targets.
  // {
  //   name: "GitHub",
  //   URL: "https://github.com",
  //   // image:
  //   //   "https://res.cloudinary.com/dqjowwy5k/image/upload/v1685996008/portfolio-images/icons/logo_github_tpt08t.svg",
  //   image: "https://cdn.simpleicons.org/github",
  //   category: "devops",
  // },
  // {
  //   name: "Bitbucket",
  //   URL: "https://bitbucket.org/",
  //   image:
  //     "https://res.cloudinary.com/dqjowwy5k/image/upload/v1685996008/portfolio-images/icons/logo_bitbucket_tq2qnj.svg",
  // },
  {
    name: "LaTeX",
    URL: "https://www.latex-project.org/",
    image: "https://cdn.simpleicons.org/latex",
    category: "research",
  },
  // Hidden 24 Oct 2026: low signal for the roles he targets.
  // {
  //   name: "Overleaf",
  //   URL: "https://www.overleaf.com/",
  //   image: "https://cdn.simpleicons.org/overleaf",
  //   category: "research",
  // },
  {
    name: "Obsidian",
    URL: "https://obsidian.md/",
    image: "https://cdn.simpleicons.org/obsidian",
    category: "research",
  },
  // Hidden 24 Oct 2026: low signal for the roles he targets.
  // {
  //   name: "Jupyter",
  //   URL: "https://jupyter.org/",
  //   image: "https://cdn.simpleicons.org/jupyter",
  //   category: "data",
  // },
  // Hidden 24 Oct 2026: low signal for the roles he targets.
  // {
  //   name: "NumPy",
  //   URL: "https://numpy.org/",
  //   image: "https://cdn.simpleicons.org/numpy",
  //   category: "data",
  // },
  // Hidden 24 Oct 2026: low signal for the roles he targets.
  // {
  //   name: "SciPy",
  //   URL: "https://scipy.org/",
  //   image: "https://cdn.simpleicons.org/scipy",
  //   category: "data",
  // },
  // Hidden 24 Oct 2026: low signal for the roles he targets.
  // {
  //   name: "Matplotlib",
  //   URL: "https://matplotlib.org/",
  //   image:
  //     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg",
  //   category: "data",
  // },
];
