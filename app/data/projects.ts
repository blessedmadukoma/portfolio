export interface ProjectReference {
  label: string;
  url: string;
}

export interface Project {
  title: string;
  briefText: string;
  description: string;
  live: string;
  apiDoc: string;
  github: string;
  alt: string;
  technologies: string[];
  imageURL?: string;
  references?: ProjectReference[];
}

export const PROJECTS: Project[] = [
  {
    title: "Athletics Performance Outlier Detection",
    briefText: "Comparative Analysis of Anomaly Detection Methods in Sports",
    description:
      "An anomaly-detection platform for 1.6 million athletics performances, with eight detection methods and supporting records for investigators.",
    live: "https://athletics-performance.mblessed.space",
    apiDoc: "",
    github: "",
    alt: "athletics-performance-outlier-detection",
    technologies: [
      "Python",
      "FastAPI",
      "HTMX",
      "PostgreSQL",
      "DuckDB",
      "Redis",
      "Docker",
      "Ansible",
    ],
    references: [
      { label: "Paper", url: "https://arxiv.org/abs/2604.21953" },
    ],
  },
  {
    title: "Sedge",
    briefText: "Safe AI queries over company data",
    description:
      "A data operating system (MVP) that catalogues what a company’s data means and lets AI answer questions over it in SQL. I built the Go backend, and I am adding the checks every AI-written query must pass before it runs (in code review).",
    live: "https://sedge.app",
    apiDoc: "",
    github: "",
    alt: "sedge-data-workspace",
    technologies: ["Go", "PostgreSQL", "MySQL", "Redis", "Docker"],
  },
  {
    title: "What Agent Traces Do Not Record: Code and Data",
    briefText: "Code and data for my study of LLM data agents",
    description:
      "Code and data for my study of LLM agents that write code to analyse data: parsers for public agent traces, a checker that blocks code naming missing columns, keys or files, and the scripts for every experiment.",
    live: "",
    apiDoc: "",
    github: "https://github.com/blessedmadukoma/data-agent-traces",
    alt: "data-agent-traces",
    technologies: ["Python"],
    references: [
      { label: "DOI", url: "https://doi.org/10.5281/zenodo.22999967" },
    ],
  },
  {
    title: "MININFRA Infrastructure Intelligence",
    briefText: "Construction-permit and land-use data for urban planning",
    description:
      "An infrastructure intelligence platform combining permit and land-use data with 12+ indicators for urban planning in Rwanda.",
    live: "https://insights.mininfra.gov.rw/",
    apiDoc: "",
    github: "",
    alt: "mininfra-infrastructure-intelligence",
    technologies: ["Grafana", "Data Engineering"],
  },
  {
    title: "Go-ZeptoMail",
    briefText: "Zeptomail Golang Package",
    description:
      "Native Golang SDK for ZeptoMail’s transactional email API with type-safe developer integrations.",
    live: "",
    apiDoc: "",
    github: "https://github.com/blessedmadukoma/go-zeptomail",
    alt: "go-zeptomail",
    technologies: ["Go"],
  },
  // Hidden for the application cycle (9 Oct 2026).
  // {
  //   title: "Telco Customer Churn Analysis",
  //   briefText: "Customer Churn Analysis",
  //   description:
  //     "ML-powered customer retention platform delivering actionable churn reduction strategies for telecom companies.",
  //   live: "",
  //   apiDoc: "",
  //   github: "https://github.com/blessedmadukoma/telco-customer-analysis-readme",
  //   alt: "telco-customer-churn-analysis",
  //   technologies: ["Python", "scikit-learn", "Plotly"],
  // },
  // {
  //   title: "CoreSentiment",
  //   briefText: "Stock Market Analysis Tool",
  //   description:
  //     "Stock prediction platform analyzing Wikipedia pageview sentiment for major tech companies with automated ETL workflows and real-time dashboards.",
  //   live: "",
  //   apiDoc: "",
  //   github: "https://github.com/blessedmadukoma/CDE-airflow-capstone-project",
  //   alt: "core-sentiment",
  //   technologies: ["Python", "Docker", "Airflow", "PostgreSQL", "Streamlit"],
  // },
  // {
  //   title: "GDP & Aviation Trends",
  //   briefText: "Economic Growth & Air Transport Development Analysis",
  //   description:
  //     "Economic analysis framework processing four decades of World Bank data to model U.S. aviation growth patterns.",
  //   live: "",
  //   apiDoc: "",
  //   github:
  //     "https://github.com/blessedmadukoma/gdp-air-passengers-relationship-readme",
  //   imageURL:
  //     "https://res.cloudinary.com/dqjowwy5k/image/upload/v1745412129/portfolio-images/gdp-aviation-trends.png",
  //   alt: "gdp-aviation-trends",
  //   technologies: ["Python", "Pandas"],
  // },
  // {
  //   title: "ThreeThirtyOne Consulting",
  //   briefText: "Consulting Firm Website",
  //   description:
  //     "Modern consulting platform connecting clients with strategic solutions through collaborative project management and outcome tracking.",
  //   live: "https://threethirtyOne-consulting.netlify.app/",
  //   apiDoc: "",
  //   github: "",
  //   imageURL: "/logos/imgs/threethirtyone.png",
  //   alt: "threethirtyone",
  //   technologies: ["VueJS", "TailwindCSS"],
  // },
  // {
  //   title: "BudgetSmart",
  //   briefText: "Personal Finance Management App",
  //   description:
  //     "A full-stack web application that helps users (myself) manage their personal finances by tracking income, expenses, and savings goals. Features include budget planning, expense categorization, and financial reporting.",
  //   live: "",
  //   apiDoc: "",
  //   github: "",
  //   alt: "athletics-performance-outlier-detection",
  //   technologies: [
  //     "Python",
  //     "Flask",
  //     "PostgreSQL",
  //     "Docker",
  //     "BeautifulSoup",
  //     "BeautifulSoup",
  //     "Ansible",
  //   ],
  // },
];
