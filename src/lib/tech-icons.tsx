/* -------------------------------------------------------------------------- */
/*  Tech icon registry.                                                        */
/*  Run:  npm i react-icons                                                     */
/*                                                                             */
/*  Brand marks come from react-icons/si (Simple Icons); anything without a    */
/*  stable brand mark (cloud providers, abstract security concepts) uses a      */
/*  lucide-react icon so the build never breaks on a missing brand.            */
/*  Each entry carries a brand `color` (tuned for a dark background) so icons   */
/*  render in their real colors instead of muted gray.                         */
/*                                                                             */
/*  Every skill name used in site-data (both personas) has an entry here, so   */
/*  nothing falls back to the generic braces icon.                             */
/* -------------------------------------------------------------------------- */
import type { ComponentType, CSSProperties } from "react";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiGnubash,
  SiOpenjdk,
  SiSpringboot,
  SiExpo,
  SiTailwindcss,
  SiSass,
  SiPostgresql,
  SiMysql,
  SiGit,
  SiPostman,
  SiJsonwebtokens,
  SiNginx,
  SiCaddy,
  SiGooglecloud,
  SiIntellijidea,
  SiBurpsuite,
  SiMetasploit,
  SiKalilinux,
  SiOwasp,
  SiWireshark,
  SiRedhat,
  SiLinux,
  SiAntdesign,
  SiReactquery,
  SiShadcnui,
  SiAxios,
  SiReactrouter,
} from "react-icons/si";
import {
  Radar,
  Crosshair,
  Cloud,
  CloudCog,
  CloudLightning,
  Search,
  Share2,
  Network,
  Braces,
  Code2,
  Webhook,
  Server,
  Terminal,
  TerminalSquare,
  SquareTerminal,
  Smartphone,
  Database,
  KeyRound,
  ShieldAlert,
  ShieldHalf,
  Target,
  Worm,
  Syringe,
  FileSearch,
  FolderSync,
  ScanLine,
  ScanSearch,
  Waves,
  Boxes,
  Map as MapIcon,
} from "lucide-react";

// Icons accept style/className/size — widen so brand colors can be applied.
type Icon = ComponentType<{ className?: string; size?: number; style?: CSSProperties }>;

const Fallback: Icon = Braces;

/** name → icon + brand color. `label` overrides display text if it differs. */
export const TECH: Record<string, { Icon: Icon; label?: string; color?: string }> = {
  // ---- languages ----
  Java: { Icon: SiOpenjdk, color: "#F89820" },
  TypeScript: { Icon: SiTypescript, color: "#4C8DD6" },
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  Python: { Icon: SiPython, color: "#4B8BBE" },
  SQL: { Icon: Database, color: "#38BDF8" },

  // ---- frontend ----
  React: { Icon: SiReact, color: "#61DAFB" },
  // mobile icon so it never reads as a second React atom in the constellation
  "React Native": { Icon: Smartphone, color: "#61DAFB" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#38BDF8" },
  "shadcn/ui": { Icon: SiShadcnui, label: "shadcn/ui", color: "#E7EAF1" },
  "Ant Design": { Icon: SiAntdesign, color: "#1677FF" },
  SCSS: { Icon: SiSass, color: "#CD6799" },

  // ---- state & data ----
  "TanStack Query": { Icon: SiReactquery, label: "TanStack Query", color: "#FF4154" },
  Zustand: { Icon: Boxes, color: "#C9944A" },
  Axios: { Icon: SiAxios, color: "#5A29E4" },
  "React Router": { Icon: SiReactrouter, label: "React Router", color: "#F44250" },

  // ---- backend ----
  "Spring Boot": { Icon: SiSpringboot, color: "#6DB33F" },
  // Webhook mark so REST no longer reads as the generic braces fallback
  "REST APIs": { Icon: Webhook, label: "REST APIs", color: "#38BDF8" },
  "JWT Auth": { Icon: SiJsonwebtokens, label: "JWT Auth", color: "#D63AFF" },
  // legacy short keys (kept in case referenced elsewhere)
  REST: { Icon: Webhook, color: "#38BDF8" },
  JWT: { Icon: SiJsonwebtokens, color: "#D63AFF" },

  // ---- dev tooling ----
  Git: { Icon: SiGit, color: "#F05032" },
  Bash: { Icon: SiGnubash, color: "#4EAA25" },
  // Simple Icons no longer ships a VS Code brand mark → lucide Code2 (</>).
  "VS Code": { Icon: Code2, label: "VS Code", color: "#0098FF" },
  IntelliJ: { Icon: SiIntellijidea, color: "#FE315D" },
  "IntelliJ IDEA": { Icon: SiIntellijidea, label: "IntelliJ IDEA", color: "#FE315D" }, // alias
  Postman: { Icon: SiPostman, color: "#FF6C37" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4E9BCD" },
  MySQL: { Icon: SiMysql, color: "#00A0C6" },
  Expo: { Icon: SiExpo, color: "#ECEDEE" },

  // ---- infra / servers / transfer ----
  Nginx: { Icon: SiNginx, color: "#009639" },
  Caddy: { Icon: SiCaddy, color: "#1F88C0" },
  gcloud: { Icon: SiGooglecloud, label: "gcloud", color: "#4285F4" },
  WinSCP: { Icon: FolderSync, label: "WinSCP", color: "#4FA9EE" },

  // ---- security: web ----
  "Burp Suite": { Icon: SiBurpsuite, color: "#FF6633" },
  "OWASP Top 10": { Icon: SiOwasp, label: "OWASP Top 10", color: "#4F9BD9" },
  OWASP: { Icon: SiOwasp, color: "#4F9BD9" }, // hero beamNode uses the short name
  // matches the exact name used in site-data ("SQL Injection")
  "SQL Injection": { Icon: Syringe, label: "SQL Injection", color: "#F43F5E" },
  sqlmap: { Icon: Database, label: "sqlmap", color: "#E0524E" },
  ffuf: { Icon: ScanLine, label: "ffuf", color: "#22D3EE" },
  Nikto: { Icon: FileSearch, label: "Nikto", color: "#8AB4CC" },

  // ---- security: network ----
  Nmap: { Icon: Radar, color: "#66BB6A" },
  Wireshark: { Icon: SiWireshark, color: "#4AA5C9" },
  tcpdump: { Icon: Waves, label: "tcpdump", color: "#7DD3FC" },
  Hydra: { Icon: KeyRound, label: "Hydra", color: "#F472B6" },
  // matches site-data ("Network Pivoting"); "Pivoting" kept for the eJPT tag
  "Network Pivoting": { Icon: Share2, label: "Network Pivoting", color: "#A78BFA" },
  Pivoting: { Icon: Share2, color: "#A78BFA" },

  // ---- security: recon ----
  // matches site-data ("Subdomain Enumeration"); short key kept as alias
  "Subdomain Enumeration": { Icon: Network, label: "Subdomain Enumeration", color: "#22D3EE" },
  "Subdomain Enum": { Icon: Network, color: "#22D3EE" },
  OSINT: { Icon: Search, color: "#60A5FA" },
  // matches site-data ("Vulnerability Scanning"); Nessus kept as its own tool
  "Vulnerability Scanning": { Icon: ScanSearch, label: "Vulnerability Scanning", color: "#F59E0B" },
  Nessus: { Icon: ShieldAlert, label: "Nessus", color: "#00A98F" },
  "Surface Mapping": { Icon: MapIcon, label: "Surface Mapping", color: "#F0B429" },

  // ---- security: exploit & C2 ----
  Metasploit: { Icon: SiMetasploit, color: "#4FB3D9" },
  Exploitation: { Icon: Worm, color: "#F87171" },
  "MITRE ATT&CK": { Icon: Crosshair, color: "#E05561" },
  "Web & Network Pentest": { Icon: Target, label: "Web & Network Pentest", color: "#E05561" },

  // ---- security: hosts & cloud ----
  Linux: { Icon: SiLinux, color: "#FCC624" },
  RHEL: { Icon: SiRedhat, color: "#EE0000" },
  SSH: { Icon: TerminalSquare, color: "#34D399" },
  PuTTY: { Icon: SquareTerminal, color: "#FBBF24" },
  MobaXterm: { Icon: Terminal, label: "MobaXterm", color: "#4ADE80" },
  "Kali Linux": { Icon: SiKalilinux, color: "#8AB4CC" },
  // clouds — each a distinct mark so they don't all look identical
  AWS: { Icon: Cloud, color: "#FF9900" },
  EC2: { Icon: Server, color: "#FF9900" },
  Azure: { Icon: CloudCog, color: "#3B9EFF" },
  GCP: { Icon: CloudLightning, color: "#4285F4" },
  "Cloud SecOps": { Icon: ShieldHalf, label: "Cloud SecOps", color: "#34D399" },
};

export function getTech(name: string): { Icon: Icon; label: string; color?: string } {
  const t = TECH[name];
  // Guard so a node never renders blank: an icon import can be `undefined` if a
  // brand doesn't exist in the installed react-icons version. Accept both plain
  // function components and forwardRef/memo objects (lucide icons are objects).
  const ic = t?.Icon as unknown;
  const ok = typeof ic === "function" || (typeof ic === "object" && ic !== null);
  const Resolved = ok ? (t!.Icon as Icon) : Fallback;
  return { Icon: Resolved, label: t?.label ?? name, color: t?.color };
}

/** A single pill used inside the skills marquee. */
export function TechChip({ name }: { name: string }) {
  const { Icon, label, color } = getTech(name);
  return (
    <span className="mx-1 inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2 text-[13px] font-medium text-foreground shadow-sm">
      <Icon
        className={color ? "size-4" : "size-4 text-muted-foreground"}
        style={color ? { color } : undefined}
      />
      {label}
    </span>
  );
}