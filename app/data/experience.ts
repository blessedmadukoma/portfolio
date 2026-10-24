export const WORK_EXPERIENCE = [
  {
    company: "CMU-Africa: Spatial and Language Technologies (SaLT) Lab",
    position: "Graduate Research Associate",
    startDate: "Jun 2026",
    endDate: "Sep 2026",
    // description:
    //   "I develop anomaly detection frameworks for athletics by integrating statistical and ensemble methods to uncover performance patterns indicative of potential doping. Complementing this, I conduct systematic reviews of AI applications in anti-doping to identify key research gaps and steer innovative future detection strategies.",
    location: "Kigali, Rwanda",
    imageURL: "/logos/svgs/cmu.svg",
    link: "https://language-lab-gamma.vercel.app",
    linkLabel: "the SaLT Lab",
    workRoles: [
      "Traced 37% of DataAgentBench’s recorded agent failures (16,293 of 44,277) to its harness, not its six LLMs (including GPT-5.2 and Gemini 3 Pro); removing them reorders the models by failed steps. With Prof. Prasenjit Mitra, analysed 283,435 agent steps across six benchmarks. <a href='https://github.com/blessedmadukoma/data-agent-traces' target='_blank' style='text-decoration: underline; color: #60a5fa;'>Code</a>.",
      "Built a static guardrail in Python (ast) that blocks agent code naming missing files, columns or keys before it runs, with zero false blocks on 8,517 working steps from three unseen benchmarks; on DABstep, a standard linter (pyflakes) flags only 6% of the errors it stops.",
      "Built a sandboxed agent harness (no network, read-only data) and ran 36,990 pre-registered runs: the guardrail cut errors that ran from 3,316 to 2 (gpt-oss-120b) and raised accuracy by 0.68 points, with no detectable edge over a cheaper error message listing valid names.",
      "Wrote two policy documents for Rwanda’s Ministry of Sports (MINISPORTS): an action plan to close the national sports talent gap, and a feasibility study of sports prediction systems.",
    ],
  },
  {
    company: "SLS Energy",
    position: "Backend Software Engineer",
    startDate: "Jun 2026",
    endDate: "Aug 2026",
    description:
      "Cut invoicing from over a month after month-end to two days with a metered billing engine that now invoices 9 client organisations.",
    location: "Kigali, Rwanda",
    imageURL: "/logos/imgs/slsenergy.png",
    link: "https://slsenergy.io",
    workRoles: [
      "Cut invoicing from over a month after month-end to two days by replacing a manual spreadsheet with a metered billing engine (Python, FastAPI, PostgreSQL) that now invoices 9 client organisations.",
      "Ensured every invoice reflects measured energy only, by excluding and flagging days with missing meter readings instead of estimating them.",
      "Closed all 18 critical and high-severity findings from two security audits, including 8 cross-tenant data-exposure flaws; set up CI gates (pytest at 80% coverage, mypy, ruff, pip-audit, gitleaks).",
    ],
  },
  {
    company: "CMU-Africa: Spatial and Language Technologies (SaLT) Lab",
    position: "Graduate Research Assistant",
    startDate: "Sep 2025",
    endDate: "May 2026",
    // description:
    //   "I develop anomaly detection frameworks for athletics by integrating statistical and ensemble methods to uncover performance patterns indicative of potential doping. Complementing this, I conduct systematic reviews of AI applications in anti-doping to identify key research gaps and steer innovative future detection strategies.",
    description:
      "Built an anomaly-detection platform over 1.6 million athletics performances with eight detection methods. The full paper was published at IEEE SDS 2026.",
    location: "Kigali, Rwanda",
    imageURL: "/logos/svgs/cmu.svg",
    link: "https://language-lab-gamma.vercel.app",
    linkLabel: "the SaLT Lab",
    workRoles: [
      "Narrowed 31,604 athletes to about 163 for investigator review (99.5% fewer) by combining 8 statistical, ML and Bayesian detectors over 1.6 million performances from 19,000+ competitions, under <a href='https://www.africa.engineering.cmu.edu/about/contact/directory/bios/mitra-prasenjit.html' target='_blank' style='text-decoration: underline; color: #60a5fa;'>Prof. Prasenjit Mitra</a>. A performance is flagged only when at least two detectors agree; checked against Athletics Integrity Unit sanctions, a flag is a lead for investigation, not a verdict. <a href='https://arxiv.org/abs/2604.21953' target='_blank' style='text-decoration: underline; color: #60a5fa;'>Paper (IEEE SDS 2026, Best Paper Honorable Mention)</a>.",
      "Replaced a Kafka-based, four-container pipeline with one FastAPI service on PostgreSQL, DuckDB and Redis: a full analysis fell from 129 s to 33 s, and testing a method change from 20+ min to about 30 s (<a href='https://athletics-performance.mblessed.space' target='_blank' style='text-decoration: underline; color: #60a5fa;'>live platform</a>).",
      // "Co-authored (with lead author Joel Maison) research on player archetypes and movement patterns in the Basketball Africa League using possession-adjusted K-means clustering. Accepted at the African Data Science Conference (ADSC 2026, Johannesburg) with Prof. Ronald Yurko (CMU Pittsburgh).",
    ],
  },
  {
    company: "Rwanda's Ministry of Infrastructure (MININFRA)",
    position: "Data Engineering and Analytics Engineer (Contract)",
    startDate: "May 2025",
    endDate: "Sep 2025",
    description:
      "Architected Rwanda's infrastructure intelligence platform with <a href='https://www.linkedin.com/in/irene-busah' target='_blank' style='text-decoration: underline; color: #60a5fa;'>Irene</a>, built to attract foreign investment: pipelines that join construction-permit and land-use records, and a Grafana dashboard of 12+ indicators.",
    location: "Kigali, Rwanda",
    imageURL: "/logos/imgs/mininfra.png",
    link: "https://www.mininfra.gov.rw",
    workRoles: [
      "Architected Rwanda's <a href='https://insights.mininfra.gov.rw' target='_blank' style='text-decoration: underline; color: #60a5fa;'>infrastructure intelligence platform</a> with <a href='https://www.linkedin.com/in/irene-busah' target='_blank' style='text-decoration: underline; color: #60a5fa;'>Irene</a>, built to attract foreign investment and designed to take more ministry data sources.",
      "Built pipelines that join construction-permit and land-use records, and a Grafana <a href='https://insights.mininfra.gov.rw' target='_blank' style='text-decoration: underline; color: #60a5fa;'>dashboard</a> of 12+ indicators such as permit throughput and capital-allocation trends.",
      // "Contributed to technical decision-making across 3 development phases, documenting architectural choices and design rationale through documentation pieces and authoring a <a href='#' target='_blank' style='text-decoration: underline; color: #60a5fa;'>technical blog</a>.",
    ],
  },
  {
    company: "Huza HR",
    position: "Software Engineer",
    startDate: "Jun 2025",
    endDate: "Sep 2025",
    description:
      "Built the email-notification system behind the company’s first fully digital applicant-tracking workflow, and reviewed code across the ATS recruitment platform.",
    location: "Kigali, Rwanda",
    imageURL: "/logos/svgs/huza.svg",
    link: "https://www.huzahr.com",
    workRoles: [
      "Built the email-notification system (candidate, recruiter and internal templates with delivery tracking) behind the company’s first fully digital applicant-tracking workflow.",
      "Built the core recruitment pages in Next.js and backend services in Node.js for the <a href='https://dev.jobs.huzahr.com/' target='_blank' style='text-decoration: underline; color: #60a5fa;'>ATS recruitment platform</a>.",
    ],
  },
  {
    company: "The UPANZI Network",
    position: "Software Engineer",
    startDate: "Sep 2024",
    endDate: "Dec 2024",
    description:
      "Cut page load times by 40% with Redux and the CSS bundle size by 30% with Tailwind CSS on the African datasets hosting platform.",
    location: "Kigali, Rwanda",
    imageURL: "/logos/imgs/cylab.png",
    link: "https://cylab-africa.github.io/",
    linkLabel: "the Upanzi Network",
    workRoles: [
      "Cut page load times by 40% on the African <a href='https://data.upanzi.net/' target='_blank' style='text-decoration: underline; color: #60a5fa;'>datasets hosting platform</a> by keeping fetched data in Redux state, which cut repeated database queries.",
      "Cut the CSS bundle size by 30% by migrating the platform to Tailwind CSS.",
    ],
  },
  {
    company: "Platnova",
    position: "Golang Backend Engineer (Contract)",
    startDate: "Mar 2024",
    endDate: "Aug 2024",
    description:
      "Cut payment processing time by 20% by automating vault settlement, and support enquiries by 15% by redesigning the transaction receipt.",
    location: "Remote",
    imageURL: "/logos/imgs/platnova.png",
    link: "https://platnova.com",
    workRoles: [
      "Cut payment processing time by 20% by automating vault settlement with a scheduled (cron) job in Go.",
      "Cut support enquiries by 15% by redesigning the transaction receipt layout (Tailwind CSS) to make transaction details clearer.",
      "Built the <a href='https://platnova.com/lifestyle' target='_blank' style='text-decoration: underline; color: #60a5fa;'>lifestyle-stays</a> package.",
    ],
  },
  {
    company: "21st Century Technologies",
    position: "Software Architect (National Youth Service)",
    startDate: "Dec 2022",
    endDate: "Nov 2023",
    description:
      "Cut release time by 40% with CI/CD pipelines, co-led an internal reporting system, and coordinated DNS service restoration across Tier III and IV data centres.",
    location: "Lagos, Nigeria",
    imageURL:
      "https://res.cloudinary.com/dqsggbqmf/image/upload/v1675251272/21ctl/21st_century_logo_FULL_2_babx2s.png",
    link: "https://21ctl.com",
    workRoles: [
      "Cut release time by 40% by automating deployments (CI/CD with Docker and GitHub webhooks).",
      "Coordinated DNS service restoration and implemented failover protocols across Tier III and IV data centres; uptime held at 99.99%.",
      "Co-led the delivery of an internal reporting system that employees used to give feedback on deployed projects, with data visualisation dashboards for managers.",
    ],
  },
];

export const EDUCATION = [
  {
    institution: "Carnegie Mellon University",
    degree: "MSc, Information Technology",
    grade: "3.93/4.0 GPA",
    startDate: "Aug 2024",
    endDate: "May 2026",
    description: [
      "Completed a 2-year MSc program specializing in Software Engineering, Big Data, and Applied Machine Learning at CMU Africa's campus in Rwanda.",
      "Notable courses: Machine Learning in Production (MLiP), Engineering Data-Intensive Scalable Systems (EDISS), Data Structures & Algorithms (DSA), Programming for Data Analytics (PDA), Data, Inference, and Applied Machine Learning (DIAML).",
      "Served as Chairman of the Academic Innovation Sub-Committee within the student Research Committee, contributing to academic and research initiatives across the cohort.",
      "Conducted graduate research under Prof. Prasenjit Mitra, building an anomaly-detection platform with eight detection methods over 1.6 million athletics performances. The full paper was published at IEEE SDS 2026.",
    ],
    location: "Kigali, Rwanda",
    imageURL: "/logos/svgs/cmu.svg",
    thesis:
      "Performance Anomaly Detection in Athletics: A Benchmarking System with Visual Analytics (<a href='https://athletics-performance.mblessed.space' target='_blank' style='text-decoration: underline; color: #60a5fa;'>Demo</a>, <a href='https://arxiv.org/abs/2604.21953' target='_blank' style='text-decoration: underline; color: #60a5fa;'>Paper</a>).",
    link: "https://www.africa.engineering.cmu.edu",
  },
  {
    institution: "Babcock University",
    degree: "BSc, Software Engineering",
    grade: "First Class Honours (Top 4%)",
    startDate: "Aug 2018",
    endDate: "Jun 2022",
    description: [
      "Completed a 4-year Software Engineering program focused on software design, algorithms, systems engineering, cloud computing, and artificial intelligence.",
      "Served as Executive President of the Babcock University Computer Club (BUCC), a student tech community of 2,000+ members; contributed to peer tutoring initiatives, and participated in the university volleyball team as team setter.",
      "Gained practical industry experience through a compulsory 6-month internship and built a strong foundation in backend engineering, system architecture, and collaborative software development.",
    ],
    location: "Ogun, Nigeria",
    imageURL: "/logos/svgs/babcock.svg",
    thesis:
      "Built and evaluated the Light Automation Management System (<a href='https://lams.netlify.app' target='_blank' style='text-decoration: underline; color: #60a5fa;'>LAMS</a>), an ESP32–PIR–Firebase classroom-lighting prototype.",
    coursework: [
      "Software Engineering",
      "Data Structures & Algorithms",
      "Operating Systems",
      "Cloud Computing Technologies",
      "Artificial Intelligence",
      "Object-Oriented Programming",
      "Software Quality Testing",
    ],
    activities: [
      "Executive President, Babcock University Computer Club (BUCC)",
      "Tutorial Team",
      "School Volleyball Team",
    ],
    link: "https://babcock.edu.ng",
  },
];

export const AWARDS = [
  {
    title: "Honorable Mention - Best Paper Award",
    organization: "13th IEEE Swiss Conference on Data Science and AI (SDS2026)",
    date: "May 2026",
    description:
      "Conferred to Blessed Madukoma and Prasenjit Mitra for the full paper “Performance Anomaly Detection in Athletics: A Benchmarking System with Visual Analytics”, presented at the 13th IEEE Swiss Conference on Data Science and AI, 6-7 May 2026, Zurich, Switzerland.",
    imageURL: "/logos/imgs/sds2026-logo.jpg",
    certificateURL: "/images/awards/sds2026-certificate.jpg",
    link: "https://arxiv.org/abs/2604.21953",
  },
  // {
  //   title: "Chairman, Academic Innovation Sub-Committee",
  //   organization: "Carnegie Mellon University Africa",
  //   date: "2024",
  //   description:
  //     "Led academic innovation initiatives and research committee activities at CMU Africa, contributing to cohort-wide academic and research programs.",
  //   imageURL: "/logos/svgs/cmu.svg",
  // },
];
