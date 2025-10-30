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

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    title: "Performance Outlier Detection in Sports",
    authors: ["Blessed Madukoma"],
    status: "in-progress",
    abstract:
      "Analyzing athlete performance patterns using statistical methods and machine learning to identify anomalous performances that deviate from expected norms. This research explores techniques for detecting performance outliers in sports data, helping coaches and analysts identify exceptional performances, potential injuries, or unusual patterns in athletic performance metrics.",
    tags: ["Machine Learning", "Sports Analytics", "Outlier Detection", "Performance Analysis"],
  },
  {
    title: "Unmasking COVID-19 Vulnerability in Nigeria: Mapping Risks Beyond Urban Hotspots",
    authors: ["Sheila Wafula", "Blessed Madukoma"],
    status: "published",
    venue: "Women in Machine Learning Workshop @ NeurIPS 2025",
    conference: "NeurIPS 2025 WiML Workshop",
    location: "San Diego, California, United States",
    date: "Dec 01 2025",
    year: 2025,
    abstract:
      "This study investigates COVID-19 vulnerability across Nigeria, moving beyond traditional urban-focused analyses to map risks in diverse geographic contexts. The research identifies key socioeconomic and health infrastructure factors that contribute to vulnerability patterns, providing insights for targeted public health interventions across both urban and rural areas.",
    pdfUrl: "https://openreview.net/pdf?id=TzOB9D4q3l",
    arxivUrl: "https://arxiv.org/abs/2509.05398",
    tags: ["Public Health", "COVID-19", "Geographic Analysis", "Machine Learning", "Nigeria"],
  },
];
