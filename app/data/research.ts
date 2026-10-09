export interface ResearchPaper {
	title: string;
	authors: string[];
	status: "in-progress" | "preprint" | "published";
	venue?: string;
	conference?: string;
	location?: string;
	date?: string;
	year?: number;
	abstract: string;
	pdfUrl?: string;
	arxivUrl?: string;
	codeUrl?: string;
	recordUrl?: string;
	tags: string[];
}

export const RESEARCH_PAPERS: ResearchPaper[] = [
	// Enable on Mon 12 Oct 2026, after arXiv is live and Prof. Mitra has approved.
	// Before enabling: check the abstract sentences against the arXiv version,
	// add arxivUrl and pdfUrl, and confirm the final title.
	// {
	//   title:
	//     "What Agent Traces Hide: Harness Effects and Data-Reference Errors in Code-Writing LLM Agents for Data Analysis",
	//   authors: ["Blessed Madukoma", "Prasenjit Mitra"],
	//   status: "preprint",
	//   conference: "arXiv preprint",
	//   date: "Oct 2026",
	//   year: 2026,
	//   abstract:
	//     "LLM-based systems answer analytical questions over data such as files, tables and databases. Many work in steps: a large language model (LLM) writes a short program, the software around it (the harness) runs the program and records the step in a log (the trace), and the model reads the result. Studies that read traces as a record of model behaviour must separate harness effects first. We release the code, the frozen checker, our run outputs, the materials of the rerun and the labels of the audit.",
	//   // arxivUrl: "https://arxiv.org/abs/XXXX.XXXXX",
	//   // pdfUrl: "https://arxiv.org/pdf/XXXX.XXXXX",
	//   codeUrl: "https://github.com/blessedmadukoma/data-agent-traces",
	//   tags: ["LLM Agents", "Agent Traces", "Data Analysis", "Benchmarks"],
	// },
	{
		title:
			"Performance Anomaly Detection in Athletics: A Benchmarking System with Visual Analytics",
		authors: ["Blessed Madukoma", "Prasenjit Mitra"],
		status: "published",
		conference: "13th IEEE Swiss Conference on Data Science and AI (SDS2026)",
		location: "Zurich, Switzerland",
		date: "May 06-07 2026",
		year: 2026,
		// abstract:
		//   "Analyzing athlete performance patterns using statistical methods and machine learning to identify anomalous performances that deviate from expected norms. This research explores techniques for detecting performance outliers in sports data, helping coaches and analysts identify exceptional performances, or unusual patterns in athletic performance metrics. View <a href='https://athletics-performance.mblessed.space' target='_blank' rel='noopener noreferrer' style='text-decoration: underline; color: #60a5fa;'>here</a> for the project website.",
		abstract:
			"Benchmarked eight statistical, ML and Bayesian methods over 1.6 million athletics performances from more than 19,000 competitions, using confirmed sanctions as partial labels. The platform links each flag to supporting records so investigators can examine the evidence; a flag is a lead, not a verdict. The full paper received <a href='/images/awards/sds2026-certificate.jpg' data-certificate-url='/images/awards/sds2026-certificate.jpg' style='text-decoration: underline; color: #60a5fa;'><b>Honorable Mention - Best Paper Award</b></a> at IEEE SDS 2026. The <a href='https://athletics-performance.mblessed.space' target='_blank' rel='noopener noreferrer' style='text-decoration: underline; color: #60a5fa;'>live platform</a> has since expanded to 14 methods.",
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
