export const WORK_EXPERIENCE = [
  {
    company: "CMU-Africa: Spatial and Languages Technologies (SaLT) Lab",
    position: "Graduate Research Associate",
    startDate: "June 2026",
    endDate: "Sep 2026",
    // description:
    //   "I develop anomaly detection frameworks for athletics by integrating statistical and ensemble methods to uncover performance patterns indicative of potential doping. Complementing this, I conduct systematic reviews of AI applications in anti-doping to identify key research gaps and steer innovative future detection strategies.",
    location: "Kigali, Rwanda",
    imageURL: "/logos/svgs/cmu.svg",
    // link: "https://www.mininfra.gov.rw",
    workRoles: [
      "Analysed 283,435 recorded steps across six benchmarks with Prof. Prasenjit Mitra, studying whether traces faithfully record the execution of agents that write analysis code. Hand-labelled 400 failed steps and measured agreement with an independent LLM coder.",
      "Ran a pre-registered experiment in which executing the model’s code as written changed the recorded failures without a detectable change in accuracy. Audited my own execution software and recovered 1,380 missing answers by replay.",
      "Built a checker that blocks a step only when it can establish that a named data item is missing. In a live experiment on 411 QRData questions, it reduced executed data-reference errors by 93% but did not raise accuracy.",
    ],
  },
  {
    company: "CMU-Africa: Spatial and Languages Technologies (SaLT) Lab",
    position: "Graduate Research Assistant",
    startDate: "Sep 2025",
    endDate: "May 2026",
    // description:
    //   "I develop anomaly detection frameworks for athletics by integrating statistical and ensemble methods to uncover performance patterns indicative of potential doping. Complementing this, I conduct systematic reviews of AI applications in anti-doping to identify key research gaps and steer innovative future detection strategies.",
    description:
      "Built an anomaly-detection platform over 1.6 million athletics performances. Benchmarked eight methods in the full paper published at IEEE SDS 2026, then expanded the platform to 14 methods.",
    location: "Kigali, Rwanda",
    imageURL: "/logos/svgs/cmu.svg",
    // link: "https://www.mininfra.gov.rw",
    workRoles: [
      "Built an anomaly detection <a href='https://athletics-performance.mblessed.space' target='_blank' style='text-decoration: underline; color: #60a5fa;'>platform & dashboard</a> (FastAPI, PostgreSQL, DuckDB, Redis) over 1.6 million athletics performances from 19,000+ competitions (2010–2025) under <a href='https://www.africa.engineering.cmu.edu/about/contact/directory/bios/mitra-prasenjit.html' target='_blank' style='text-decoration: underline; color: #60a5fa;'>Prof. Prasenjit Mitra</a>, featuring fuzzy athlete search across 214k+ athletes, career timelines, elite filtering, and end-to-end audit trails for anti-doping prioritisation. <a href='https://arxiv.org/abs/2604.21953' target='_blank' style='text-decoration: underline; color: #60a5fa;'>Full paper published at IEEE SDS 2026</a>.",
      "Benchmarked eight statistical, ML and Bayesian detection methods in the published paper, then expanded the platform to 14 methods. Added explainable consensus flagging requiring agreement between at least two methods. Compared flags with publicly confirmed Athletics Integrity Unit sanctions as partial labels; a flag is a lead for investigation, not a verdict.",
      "Developed a sports analytics policy briefing for Rwanda’s Ministry of Sports (MINISPORTS), identifying gaps in national talent identification and proposing a 10-year data roadmap aligned with Vision 2050.",
      // "Co-authored (with lead author Joel Maison) research on player archetypes and movement patterns in the Basketball Africa League using possession-adjusted K-means clustering. Accepted at the African Data Science Conference (ADSC 2026, Johannesburg) with Prof. Ronald Yurko (CMU Pittsburgh).",
    ],
  },
  {
    company: "Rwanda's Ministry of Infrastructure (MININFRA)",
    position: "Data Engineering and Analytics Engineer (Contract)",
    startDate: "May 2025",
    endDate: "Sep 2025",
    description:
      "Architected Rwanda's first infrastructure intelligence platform with <a href='https://www.linkedin.com/in/irene-busah' target='_blank' style='text-decoration: underline; color: #60a5fa;'>Irene</a> integrating real estate and transportation data. Developed a Vue.js dashboard with 12+ trend analyses for infrastructure sectors.",
    location: "Kigali, Rwanda",
    imageURL: "/logos/imgs/mininfra.png",
    link: "https://www.mininfra.gov.rw",
    workRoles: [
      "Architected Rwanda's first <a href='https://insights.mininfra.gov.rw' target='_blank' style='text-decoration: underline; color: #60a5fa;'>infrastructure intelligence platform</a> with <a href='https://www.linkedin.com/in/irene-busah' target='_blank' style='text-decoration: underline; color: #60a5fa;'>Irene</a> integrating real estate data, with an architecture designed to take more ministry data sources.",
      "Developed a <a href='https://insights.mininfra.gov.rw' target='_blank' style='text-decoration: underline; color: #60a5fa;'>dashboard</a> with 12+ trend analyses for each infrastructure sector (transportation and real estate), consolidating cross-ministry data to attract foreign investment.",
      // "Contributed to technical decision-making across 3 development phases, documenting architectural choices and design rationale through documentation pieces and authoring a <a href='#' target='_blank' style='text-decoration: underline; color: #60a5fa;'>technical blog</a>.",
    ],
  },
  {
    company: "HuzaHR",
    position: "Software Engineer (Internship)",
    startDate: "Jun 2025",
    endDate: "Sep 2025",
    description:
      "Completed a required 3-month internship for my MSc coursework. Reviewed code across the ATS recruitment platform and built its email notification system and core recruitment pages.",
    location: "Kigali, Rwanda",
    imageURL: "/logos/svgs/huza.svg",
    link: "https://www.huzahr.com",
    workRoles: [
      "Completed a required 3-month internship for my MSc coursework. Reviewed code for 2 team members across the <a href='https://dev.jobs.huzahr.com/' target='_blank' style='text-decoration: underline; color: #60a5fa;'>ATS recruitment platform</a> (5+ pull requests) and set coding standards for the job-seeker and recruiter workflows.",
      "Built the email notification system for the recruitment workflow: candidate messages, recruiter alerts and internal notifications, with delivery tracking.",
      "Built responsive pages for the core recruitment interface in Next.js and backend services in Node.js for the ATS.",
    ],
  },
  {
    company: "The UPANZI Network/Cy-LAB",
    position: "Graduate Research Assistant",
    startDate: "Sep 2024",
    endDate: "Dec 2024",
    description:
      "Migrated the African datasets hosting platform to Tailwind CSS, reducing bundle size by 30%. Improved performance with Redux, reducing load time by 40%.",
    location: "Kigali, Rwanda",
    imageURL: "/logos/imgs/cylab.png",
    link: "https://cylab-africa.github.io/",
    workRoles: [
      "Migrated the African <a href='https://data.upanzi.net/' target='_blank' style='text-decoration: underline; color: #60a5fa;'>datasets hosting platform</a> to Tailwind CSS, reducing bundle size by 30%.",
      "Improved platform performance with Redux, reducing load time by 40% and the number of database queries.",
    ],
  },
  {
    company: "Platnova",
    position: "Golang Backend Engineer (Contract)",
    startDate: "Mar 2024",
    endDate: "Aug 2024",
    description:
      "Redesigned the transaction receipt layout and implemented a CRON job for vault payment settlements.",
    location: "Remote",
    imageURL: "/logos/imgs/platnova.png",
    link: "https://platnova.com",
    workRoles: [
      "Redesigned the transaction receipt layout with Tailwind CSS to make transaction details clearer.",
      "Implemented a CRON job for vault payment settlements.",
      "Launched the <a href='https://platnova.com/lifestyle' target='_blank' style='text-decoration: underline; color: #60a5fa;'>lifestyle-stays</a> package.",
    ],
  },
  {
    company: "21ST Century Technologies",
    position: "Software Architect",
    startDate: "Dec 2022",
    endDate: "Nov 2023",
    description:
      "Implemented CI/CD pipelines and coordinated DNS service restoration across Tier III and IV data centres.",
    location: "Lagos, Nigeria",
    imageURL:
      "https://res.cloudinary.com/dqsggbqmf/image/upload/v1675251272/21ctl/21st_century_logo_FULL_2_babx2s.png",
    link: "https://21ctl.com",
    workRoles: [
      "Implemented Continuous Integration and Continuous Deployment (CI/CD) pipelines for software releases.",
      "Coordinated DNS service restoration across Tier III and IV data centres and implemented failover protocols to reduce downtime.",
      "Delivered a reporting system with data visualisation dashboards and feedback loops between teams and managers.",
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
      "Conducted graduate research under Prof. Prasenjit Mitra, building an anomaly-detection platform over 1.6 million athletics performances. The full paper benchmarked eight methods and was published at IEEE SDS 2026; the platform now contains 14 methods.",
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
      "Served as Student Body President of the Babcock University Computer Club (BUCC), contributed to peer tutoring initiatives, and participated in the university volleyball team as team setter.",
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
      "Student Body President, Babcock University Computer Club (BUCC)",
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
