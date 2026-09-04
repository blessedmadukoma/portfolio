export interface ResearchPaper {
  title: string;
  authors: string[];
  status: "in-progress" | "published";
  venue?: string;
  conference?: string;
  location?: string;
  date?: string;
  year?: number;
  abstract: string;
  pdfUrl?: string;
  arxivUrl?: string;
  tags: string[];
}

interface ResearchProjectBase {
  title: string;
  status: string;
  summary: string;
  tags: string[];
  href: string;
}

export type ResearchProject = ResearchProjectBase &
  (
    | { stage: "completed"; finding: string }
    | { stage: "in-progress"; progress: string }
  );

export const RESEARCH_PROJECTS: ResearchProject[] = [
  {
    title: "Football Tactical Analysis Agent",
    stage: "in-progress",
    status: "In development",
    summary:
      "Developing a tool-using agent for evidence-backed match analysis as a workload for studying execution reliability and data/evidence validity.",
    progress:
      "Work started with small tool-using prototypes. The football workflow is in development; this is not a completed research result.",
    tags: [
      "AI agents",
      "Sports analytics",
      "Execution reliability",
      "Evidence validity",
    ],
    href: "/blog/building-toward-reliable-ai-agents",
  },
  {
    title: "Historical Trace Coverage for Regression Selection in Stochastic Tool-Using Agents",
    stage: "completed",
    status: "Completed empirical pilot",
    summary:
      "I tested whether historical execution traces can safely identify agent tasks that need rerunning after a tool implementation changes.",
    finding:
      "Repeated traces reduced observed exposure misses, but the proposed frequency-based selector added too little value to support a new method claim.",
    tags: ["AI agents", "Regression testing", "Negative result", "tau2-bench"],
    href: "/blog/can-old-agent-traces-guide-regression-testing",
  },
  {
    title: "Semantic Monitoring Under Component Evolution",
    stage: "completed",
    status: "Completed controlled pilot",
    summary:
      "I tested whether a deterministic safety monitor remains trustworthy when its upstream semantic extractor changes.",
    finding:
      "Model downsizing produced false-safe decisions despite schema-valid outputs; the pilot establishes a failure mode, not a general monitoring solution.",
    tags: ["AI systems", "Monitoring", "Component evolution", "Negative result"],
    href: "/blog/can-safety-checker-trust-changed-ai-extractor",
  },
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    title:
      "Performance Anomaly Detection in Athletics: A Benchmarking System with Visual Analytics",
    authors: ["Blessed Madukoma", "Prasenjit Mitra"],
    status: "published",
    // venue: "IEEE SDS 2026 (Poster)",
    conference: "IEEE Swiss Conference on Data Science and AI (SDS2026)",
    location: "Zurich, Switzerland",
    date: "May 06-07 2026",
    year: 2026,
    // abstract:
    //   "Analyzing athlete performance patterns using statistical methods and machine learning to identify anomalous performances that deviate from expected norms. This research explores techniques for detecting performance outliers in sports data, helping coaches and analysts identify exceptional performances, or unusual patterns in athletic performance metrics. View <a href='https://athletics-performance.mblessed.space' target='_blank' rel='noopener noreferrer' style='text-decoration: underline; color: #60a5fa;'>here</a> for the project website.",
    abstract:
      "Research on detecting anomalous athletic performances using statistical and machine learning methods to identify deviations from expected patterns in sports data. The work received an <a href='/images/awards/sds2026-certificate.jpg' data-certificate-url='/images/awards/sds2026-certificate.jpg' style='text-decoration: underline; color: #60a5fa;'><b>Honorable Mention - Best Full Paper Award</b></a> and explores techniques for identifying exceptional performances, and unusual athlete trends. View <a href='https://athletics-performance.mblessed.space' target='_blank' rel='noopener noreferrer' style='text-decoration: underline; color: #60a5fa;'>here</a> for the project website.",
    pdfUrl: "https://ieeexplore.ieee.org/document/11540487",
    arxivUrl: "https://arxiv.org/abs/2604.21953",
    tags: [
      "Machine Learning",
      "Sports Analytics",
      "Outlier Detection",
      "Performance Analysis",
    ],
  },
  {
    title:
      "Unmasking COVID-19 Vulnerability in Nigeria: Mapping Risks Beyond Urban Hotspots",
    authors: ["Sheila Wafula", "Blessed Madukoma"],
    status: "published",
    // venue: "Women in Machine Learning Workshop @ NeurIPS 2025",
    conference: "Women in Machine Learning Workshop @ NeurIPS 2025",
    // conference: "NeurIPS 2025 WiML Workshop",
    location: "San Diego, California, United States",
    date: "Dec 01 2025",
    year: 2025,
    abstract:
      "This study investigates COVID-19 vulnerability across Nigeria, moving beyond traditional urban-focused analyses to map risks in diverse geographic contexts. The research identifies key socioeconomic and health infrastructure factors that contribute to vulnerability patterns, providing insights for targeted public health interventions across both urban and rural areas.",
    pdfUrl: "https://neurips.cc/virtual/2025/loc/san-diego/133847",
    arxivUrl: "https://arxiv.org/abs/2509.05398",
    tags: [
      "Public Health",
      "COVID-19",
      "Geographic Analysis",
      "Machine Learning",
      "Nigeria",
    ],
  },
];
