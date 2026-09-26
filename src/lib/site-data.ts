/* -------------------------------------------------------------------------- */
/*  Portfolio content. Edit here — components read from this file.              */
/*  Build (dev) and Breach (security enthusiast) are kept fully separate.       */
/* -------------------------------------------------------------------------- */

/* Image resolver ----------------------------------------------------------- */
/* One glob scans every image under src/assets at any depth (assets/ or         */
/* assets/certs/ ...). asset("ejpt") resolves to that file's built URL.         */
/* NOTE: after ADDING or MOVING image files you must restart `npm run dev` --   */
/* Vite only evaluates import.meta.glob at startup, so new files won't show up  */
/* until the dev server is restarted.                                          */
const assetModules = import.meta.glob(
  [
    "../assets/*.{png,jpg,jpeg,svg,webp}",
    "../assets/**/*.{png,jpg,jpeg,svg,webp}",
  ],
  { eager: true, import: "default" },
) as Record<string, string>;

/** URL for an image by base filename (no extension), searched anywhere under
 *  src/assets. Case-insensitive. Returns "" if nothing matches. */
function asset(file: string): string {
  const want = file.toLowerCase();
  const hit = Object.entries(assetModules).find(
    ([path]) => path.split("/").pop()?.replace(/\.[^.]+$/, "").toLowerCase() === want,
  );
  return hit?.[1] ?? "";
}

/* Company logo — expects a file named cslogo.(png|jpg|svg|webp) in src/assets  */
/* (or src/assets/certs). */
const csLogo = asset("cslogo");

/* ------------------------------- profile ---------------------------------- */
export const profile = {
  name: "Siyon Rai",
  short: "siyon",
  location: "Bhaktapur, Nepal",
  email: "siyonrai2@gmail.com",
  company: {
    name: "CS Sewa",
    url: "https://www.cssewa.com.np/",
    logo: csLogo,
  },
  socials: {
    linkedin: "https://www.linkedin.com/in/siyon-rai/",
    github: "https://github.com/siyon000",
    bugcrowd: "",
  },
};

/* --------------------------- mode-aware copy ------------------------------ */
export type Mode = "build" | "breach";

export const persona: Record<
  Mode,
  {
    /** greeting shown above the name */
    kicker: string;
    roles: string[];
    tagline: string;
    status: string;
    /** icons wired to the hero AnimatedBeam constellation (exactly 6) */
    beamNodes: string[];
    hub: "code" | "shield";
  }
> = {
  build: {
    kicker: "Hi, I'm",
    roles: [
      "Full-Stack Developer",
      "React Native Developer"
    ],
    tagline:
      "I’m a software developer working with React, React Native, and Spring Boot to build web and mobile applications.",
    status: "Software Developer",
    beamNodes: ["React", "Spring Boot", "TypeScript", "JavaScript", "PostgreSQL", "Git"],
    hub: "code",
  },
  breach: {
    kicker: "Hi, I'm",
    roles: [
      "Security Enthusiast",
      "Web & Cloud Security",
      "CTF & Home Labs"
    ],
    tagline:
      "I'm interested in web, network, and cloud security, with hands-on experience through security labs, penetration testing practice, and Linux administration.",
    status: "web, network, and cloud security",
    beamNodes: ["Burp Suite", "Wireshark", "Metasploit", "Kali Linux", "OWASP", "RHEL"],
    hub: "shield",
  },
};

/* ------------------------------- about ------------------------------------ */
/* Home intro: one short quote + one factual "what I do" line, per persona.    */
export const about: Record<Mode, { quote: string; doing: string }> = {
  build: {
    quote: "",
    doing: "I build web and mobile applications with React, React Native, and Spring Boot, covering everything from user interfaces to backend development.",
  },
  breach: {
    quote: "",
    doing: "Learning web, network, and cloud security through labs, CTFs, and hands-on practice.",
  },
};

/* ---------------------------- section kickers ----------------------------- */
export const kickers = {
  about: { build: "About", breach: "About" },
  experience: { build: "Experience", breach: "Experience" },
  skills: { build: "Skills", breach: "Skills" },
  education: { build: "Education", breach: "Education" },
  certs: { build: "Certifications", breach: "Certifications" },
  contact: { build: "Contact", breach: "Contact" },
} as const;

/* ----------------------------- experience --------------------------------- */
/* Developer only. CS Sewa: 3-month internship rolling into a full-time role. */
/* TODO: adjust the year(s) if your start date differs.                       */
export interface Role {
  title: string;
  kind: string;
  period: string;
}
export interface Experience {
  company: string;
  url?: string;
  location?: string;
  logo?: string;
  roles: Role[];
}

export const experience: Experience[] = [
  {
    company: "CS Sewa",
    url: "https://www.cssewa.com.np/",
    location: "Kathmandu, Nepal",
    logo: csLogo,
    roles: [
      { title: "Software Developer", kind: "Full-time", period: "Jun 2025 — Present" },
      { title: "Software Development Intern", kind: "Internship · 3 mos", period: "Mar 2025 — Jun 2025" },
    ],
  },
];

/* -------------------------------- skills ---------------------------------- */
export interface SkillGroup {
  label: string;
  items: string[];
}

export const skills: Record<
  Mode,
  { desc: string; groups: SkillGroup[]; marquee: string[] }
> = {
  build: {
    desc: "Languages, frameworks, and tools I use to build web and mobile applications.",
    groups: [
      { label: "languages", items: ["Java", "JavaScript", "TypeScript", "SQL"] },

{ label: "frontend", items: ["React", "React Native", "Tailwind CSS", "SCSS", "Ant Design", "shadcn/ui"] },

{ label: "state & data", items: ["TanStack Query", "Zustand", "Axios", "React Router"] },

{ label: "backend", items: ["Spring Boot", "REST APIs", "JWT"] },

{ label: "databases", items: ["MySQL", "PostgreSQL"] },

{ label: "tools & platforms", items: ["Git", "Postman", "Expo"] },
    ],
    marquee: [
      "React", "React Native", "TypeScript", "JavaScript", "Java", "Spring Boot",
      "Expo", "Tailwind CSS", "Ant Design", "TanStack Query", "Zustand", "Axios",
      "React Router", "SCSS", "PostgreSQL", "MySQL", "Git", "Postman", "JWT",
    ],
  },
  breach: {
    desc: "Tools and techniques I use across web, network, and cloud security.",
    groups: [
      { label: "Web Security", items: ["Burp Suite", "OWASP Top 10", "SQL Injection", "ffuf", "Nikto"] },
      { label: "Network Security", items: ["Nmap", "Wireshark", "tcpdump", "Hydra", "Network Pivoting"] },
      { label: "Reconnaissance", items: ["Subdomain Enumeration", "OSINT", "Vulnerability Scanning"] },
      { label: "Penetration Testing", items: ["Metasploit", "Exploitation", "MITRE ATT&CK"] },
      { label: "Systems & Cloud", items: ["Linux", "RHEL", "SSH", "AWS", "Kali Linux"] },
    ],
    marquee: [
      "Burp Suite", "Nmap", "Wireshark", "tcpdump", "Metasploit", "Kali Linux",
      "SQL Injection", "ffuf", "Nikto", "Hydra", "Vulnerability Scanning", "OWASP Top 10", "MITRE ATT&CK",
      "Subdomain Enumeration", "OSINT", "Network Pivoting", "Linux", "RHEL", "SSH", "AWS",
    ],
  },
};

/* ------------------------------ education --------------------------------- */
export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  note?: string;
  url?: string;
}

export const education: Education[] = [
  {
    degree: "B.Sc. CSIT",
    institution: "Kathmandu College of Technology",
    location: "Lokanthali, Bhaktapur",
    period: "2020 — 2024",
    note: "Computer Science & IT — Tribhuvan University.",
    url: "https://www.kct.edu.np/",
  },
  {
    degree: "Higher Secondary · +2 (Science)",
    institution: "SS College",
    location: "Madhyapur Thimi, Bhaktapur",
    period: "2018 — 2020",
    note: "NEB — National Examinations Board.",
    url: "https://sscollege.edu.np/",
  },
  {
    degree: "SEE · Grade 10",
    institution: "Shree Kedar Secondary School",
    location: "Necha Betghari, Solukhumbu",
    period: "2018",
    url: "https://kedarschool.edu.np/",
  },
];

/* ---------------------------- certifications ------------------------------ */
/* Security credentials — shown only in Breach mode.                         */
/* `image` maps to a file in src/assets (or src/assets/certs) by base name.   */
export interface Certification {
  short: string;
  title: string;
  issuer: string;
  date?: string;
  verify: string;
  tags: string[];
  image?: string;
}

export const certifications: Certification[] = [
  {
    short: "eJPT",
    title: "eLearnSecurity Junior Penetration Tester",
    issuer: "INE Security",
    date: "Jul 2025",
    verify: "https://certs.ine.com/a2562a73-c591-4bae-b1d1-7787096ec260#acc.DQGySjTM",
    tags: ["Web & Network Pentest", "Exploitation", "Pivoting"],
    image: asset("ejpt"),
  },
  {
    short: "WRTA",
    title: "Web Red Team Analyst",
    issuer: "CyberWarfare Labs",
    date: "Jul 2026",
    verify: "https://labs.cyberwarfare.live/credential/achievement/6a5a5aac8aed14e94c887366",
    tags: ["Web Application Security", "OWASP Top 10", "Burp Suite"],
    image: asset("wrta"),
  },
  {
    short: "MCRTA",
    title: "Multi-Cloud Red Team Analyst",
    issuer: "CyberWarfare Labs",
    date: "Mar 2026",
    verify: "https://labs.cyberwarfare.live/credential/achievement/69bb884b3f6937a0d91d8778",
    tags: ["AWS · Azure · GCP", "Cloud Red Teaming", "MITRE ATT&CK"],
    image: asset("mcrta"),
  },
  {
    short: "MCBTA",
    title: "Multi-Cloud Blue Team Analyst",
    issuer: "CyberWarfare Labs",
    date: "Mar 2026",
    verify: "https://labs.cyberwarfare.live/credential/achievement/69c36e03b6489d8567b137ad",
    tags: ["Cloud Security", "SecOps", "Threat Detection", "SOC"],
    image: asset("mcbt"),
  },
  {
    short: "RHCSA",
    title: "Red Hat Certified System Administrator",
    issuer: "Red Hat",
    verify: "https://rhtapps.redhat.com/verify?certId=260-123-179",
    tags: ["Linux Administration", "RHEL", "System Administration"],
    image: asset("rhcsa"),
  },
  {
    short: "CORE",
    title: "Hackviser Core",
    issuer: "Hackviser",
    verify: "https://hackviser.com/verify?id=HV-CORE-SRH5VBJ1",
    tags: ["Offensive Security", "Hands-on Security Labs"],
    image: asset("corehackviser"),
  },
];