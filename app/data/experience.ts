export const WORK_EXPERIENCE = [
  // {
  //   company: "CMU-Africa: Languages and Spatial Technologies Laboratory",
  //   position: "Graduate Research Associate",
  //   startDate: "June 2026",
  //   endDate: null,
  //   description:
  //     "I develop anomaly detection frameworks for athletics by integrating statistical and ensemble methods to uncover performance patterns indicative of potential doping. Complementing this, I conduct systematic reviews of AI applications in anti-doping to identify key research gaps and steer innovative future detection strategies.",
  //   location: "Kigali, Rwanda",
  //   imageURL: "/logos/svgs/cmu.svg",
  //   // link: "https://www.mininfra.gov.rw",
  //   workRoles: [
  //     "Developing anomaly detection <a href='https://athletics-performance.mblessed.space' target='_blank' style='text-decoration: underline; color: #60a5fa;'>framework</a> for athletics performance analysis under <a href='https://www.africa.engineering.cmu.edu/about/contact/directory/bios/mitra-prasenjit.html' target='_blank' style='text-decoration: underline; color: #60a5fa;'>Prof. Prasenjit Mitra</a>, implementing statistical and ensemble methods to identify performance patterns indicative of potential doping violations.",
  //     "Conducting systematic literature review of AI applications in anti-doping, identifying research gaps and unexplored methodologies for next-generation detection systems.",
  //   ],
  // },
  {
    company: "CMU-Africa: Languages and Spatial Technologies Laboratory",
    position: "Graduate Research Assistant",
    startDate: "Sep 2025",
    endDate: "May 2026",
    // description:
    //   "I develop anomaly detection frameworks for athletics by integrating statistical and ensemble methods to uncover performance patterns indicative of potential doping. Complementing this, I conduct systematic reviews of AI applications in anti-doping to identify key research gaps and steer innovative future detection strategies.",
    description:
      "Built and published a production-grade anomaly detection system over 1.5M+ athletics performances, benchmarking 14 detection methods against real-world anti-doping sanctions data - accepted at IEEE SDS 2026 and published on ArXiv.",
    location: "Kigali, Rwanda",
    imageURL: "/logos/svgs/cmu.svg",
    // link: "https://www.mininfra.gov.rw",
    workRoles: [
      "Built an anomaly detection <a href='https://athletics-performance.mblessed.space' target='_blank' style='text-decoration: underline; color: #60a5fa;'>platform & dashboard</a> (FastAPI, PostgreSQL, Redis) over 1.5M+ athletics performances (19k+ events, 2010-2025) under <a href='https://www.africa.engineering.cmu.edu/about/contact/directory/bios/mitra-prasenjit.html' target='_blank' style='text-decoration: underline; color: #60a5fa;'>Prof. Prasenjit Mitra</a>, featuring fuzzy athlete search across 214k+ athletes, career timelines, elite filtering, and end-to-end audit trails for anti-doping prioritisation. <a href='https://arxiv.org/abs/2604.21953' target='_blank' style='text-decoration: underline; color: #60a5fa;'>Published at IEEE SDS 2026</a>.",
      "Implemented 14 competing detection methods (statistical, ML, and Bayesian) with explainable consensus flagging, and ensemble methods, requiring 2+ method agreement before flagging, validated against publicly confirmed Athletics Integrity Unit sanctions data.",
      "Developed a sports analytics policy briefing for Rwanda’s Ministry of Sports (MINISPORTS), identifying gaps in national talent identification and proposing a 10-year data roadmap aligned with Vision 2050.",
      "Co-authored (with lead author Joel Maison) research on player archetypes and movement patterns in the Basketball Africa League using possession-adjusted K-means clustering. Accepted at the African Data Science Conference (ADSC 2026, Johannesburg) with Prof. Ronald Yurko (CMU Pittsburgh).",
    ],
  },
  {
    company: "Rwanda's Ministry of Infrastructure (MININFRA)",
    position: "Product Engineer (Contract)",
    startDate: "May 2025",
    endDate: "Sep 2025",
    description:
      "Architected Rwanda's first infrastructure intelligence platform with <a href='https://www.linkedin.com/in/irene-busah' target='_blank' style='text-decoration: underline; color: #60a5fa;'>Irene</a> integrating real estate and transportation data streams. Developed Vue.js dashboard with 12+ tailored trend analysis for infrastructure sectors.",
    location: "Kigali, Rwanda",
    imageURL: "/logos/imgs/mininfra.png",
    link: "https://www.mininfra.gov.rw",
    workRoles: [
      "Architected Rwanda's first <a href='https://insights.mininfra.gov.rw' target='_blank' style='text-decoration: underline; color: #60a5fa;'>infrastructure intelligence platform</a> with <a href='https://www.linkedin.com/in/irene-busah' target='_blank' style='text-decoration: underline; color: #60a5fa;'>Irene</a> integrating real estate data stream through, with scalable architecture designed for additional ministry data sources.",
      "Developed <a href='https://insights.mininfra.gov.rw' target='_blank' style='text-decoration: underline; color: #60a5fa;'>dashboard</a> with 12+ tailored trend analysis for each infrastructure sector (transportation, and real estate), consolidating cross-ministry data to attract foreign investment.",
      "Contributed to technical decision-making across 3 development phases, documenting architectural choices and design rationale through documentation pieces and authoring a <a href='#' target='_blank' style='text-decoration: underline; color: #60a5fa;'>technical blog</a>.",
    ],
  },
  {
    company: "HuzaHR",
    position: "Software Engineer (Internship)",
    startDate: "Jun 2025",
    endDate: "Sep 2025",
    description:
      "Fulfilled a required 3-month internship for my MSc. coursework: performed code review for team members across ATS recruitment platform. Built email notification system and responsive pages for core recruitment interface serving 100+ job seekers.",
    location: "Kigali, Rwanda",
    imageURL: "/logos/svgs/huza.svg",
    link: "https://www.huzahr.com",
    workRoles: [
      "Fulfilled a required 3-month internship for my MSc. coursework: Performed code review for 2 team members across the <a href='https://dev.jobs.huzahr.com/' target='_blank' style='text-decoration: underline; color: #60a5fa;'>ATS recruitment platform</a>, reviewing 5+ pull requests and establishing coding standards for job seeker and recruiter workflow systems.",
      "Built an email notification system handling 2+ email templates for the recruitment workflow, handling candidate communications, recruiter alerts, and internal notifications with 99% delivery tracking.",
      "Built responsive pages, core recruitment interface in NextJS and backend services in NodeJS for the ATS system, establishing foundation to onboard 100+ job seekers and 10+ recruiters in Rwanda's market.",
    ],
  },
  {
    company: "The UPANZI Network/Cy-LAB",
    position: "Graduate Research Assistant",
    startDate: "Sep 2024",
    endDate: "Dec 2024",
    description:
      "Migrated African datasets hosting platform to Tailwind CSS, reducing bundle size by 30%. Optimized platform performance using Redux, reducing load time by 40%.",
    location: "Kigali, Rwanda",
    imageURL: "/logos/imgs/cylab.png",
    link: "https://cylab-africa.github.io/",
    workRoles: [
      "Migrated African <a href='https://data.upanzi.net/' target='_blank' style='text-decoration: underline; color: #60a5fa;'>datasets hosting platform</a> to Tailwind CSS, reducing bundle size by 30%, improving customization, increasing development speed by 25%, and ensuring data privacy standards while maintaining sensitive datasets.",
      "Optimized platform performance using Redux, reducing load time by 40%, minimizing database queries and improving user experience.",
      "Collaborated with cross-functional teams using Agile Scrum methodologies (e.g., weekly standups) and Git-based version control systems, fostering a 15% increase in team productivity and ensuring timely project delivery.",
    ],
  },
  {
    company: "Platnova",
    position: "Golang Backend Engineer (Contract)",
    startDate: "Mar 2024",
    endDate: "Aug 2024",
    description:
      "Revamped transaction receipt layout improving customer satisfaction by 30%. Implemented CRON job for vault payment settlements, reducing processing time by 20%.",
    location: "Remote",
    imageURL: "/logos/imgs/platnova.png",
    link: "https://platnova.com",
    workRoles: [
      "Revamped the transaction receipt layout using Tailwind CSS, improving customization and enhancing clarity of transaction details, which led to a 30% increase in customer satisfaction and a 15% reduction in support inquiries.",
      "Accelerated operational efficiency, and optimized cash flow management for vault payment settlements by implementing CRON job, resulting in a 20% reduction in payment processing time and increasing transaction processing speed by 40%.",
      "Executed and launched a <a href='https://platnova.com/lifestyle' target='_blank' style='text-decoration: underline; color: #60a5fa;'>lifestyle-stays</a> package, driving customer engagement and increasing revenue by 15%.",
    ],
  },
  {
    company: "21ST Century Technologies",
    position: "Software Engineer",
    startDate: "Dec 2022",
    endDate: "Nov 2023",
    description:
      "Implemented CI/CD pipelines improving deployment by 70%. Engineered ML pipelines ensuring 99.99% uptime across Tier III and IV data centers.",
    location: "Lagos, Nigeria",
    imageURL:
      "https://res.cloudinary.com/dqsggbqmf/image/upload/v1675251272/21ctl/21st_century_logo_FULL_2_babx2s.png",
    link: "https://21ctl.com",
    workRoles: [
      "Implemented Continuous Integration and Continuous Deployment (CI/CD) pipelines to improve software deployment by 70%, reducing release times by 40% and achieving faster resolution times by 10%, saving costs by 40%.",
      "Engineered data pipelines, ensuring 99.99% uptime by orchestrating DNS service restoration across Tier III and IV data centers, reducing downtime by swiftly implementing failover protocols, and enhancing system reliability. ",
      "Delivered a detailed report system integrating data visualization dashboards and communication feedback loops between teams and managers, improving management decision-making and customer satisfaction by 45%.",
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
      "Conducted graduate research under Prof. Prasenjit Mitra, building a production-grade anomaly detection system over 1.5M+ athletics performances — published at IEEE SDS 2026 and on ArXiv.",
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
    grade: "First Class Honors (Top 4%)",
    startDate: "Jul 2018",
    endDate: "Jun 2022",
    description: [
      "Completed a 4-year Software Engineering program focused on software design, algorithms, systems engineering, cloud computing, and artificial intelligence.",
      "Served as Student Body President of the Babcock University Computer Club (BUCC), contributed to peer tutoring initiatives, and participated in the university volleyball team as team setter.",
      "Gained practical industry experience through a compulsory 6-month internship and built a strong foundation in backend engineering, system architecture, and collaborative software development.",
    ],
    location: "Ogun, Nigeria",
    imageURL: "/logos/svgs/babcock.svg",
    thesis:
      "Designed and developed the Light Automation Management System (<a href='https://lams.netlify.app' target='_blank' style='text-decoration: underline; color: #60a5fa;'>LAMS</a>), a smart home automation platform focused on centralized light control and monitoring.",
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
    title: "Honorable Mention - Best Full Paper Award",
    organization: "IEEE Swiss Conference on Data Science and AI (SDS2026)",
    date: "May 2026",
    description:
      "Awarded Honorable Paper at the IEEE Swiss Conference on Data Science and AI (SDS) 2026 conference for research on performance anomaly detection in athletics — benchmarking 14 detection methods over 1.5M+ performances validated against real-world anti-doping sanctions data.",
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
