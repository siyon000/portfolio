import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import type { ComponentType, SVGProps } from "react";
import { ArrowUpRight, BadgeCheck, Loader2, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Reveal, SectionHeading } from "./primitives";
import { useTheme } from "@/lib/theme-context";
import { kickers, profile } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  EmailJS — fill these in to make the form send mail directly.               */
/*  Get them from https://dashboard.emailjs.com  (Account → API keys, and      */
/*  your Email Services / Email Templates).                                    */
/*  Until all three are set, the form gracefully falls back to opening the     */
/*  visitor's mail client with the message pre-filled.                         */
/* -------------------------------------------------------------------------- */
const EMAILJS = {
  serviceId: "YOUR_SERVICE_ID", // TODO
  templateId: "YOUR_TEMPLATE_ID", // TODO
  publicKey: "YOUR_PUBLIC_KEY", // TODO
};
const emailjsReady =
  !EMAILJS.serviceId.startsWith("YOUR_") &&
  !EMAILJS.templateId.startsWith("YOUR_") &&
  !EMAILJS.publicKey.startsWith("YOUR_");

/* Brand marks as inline SVGs — lucide-react removed brand icons in recent
   versions, so these stay build-safe regardless of the installed version. */
type IconProps = SVGProps<SVGSVGElement>;

function GithubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const inputBase =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 aria-[invalid=true]:border-destructive";

type Status = "idle" | "sending" | "sent" | "error";

interface LinkRow {
  key: string;
  label: string;
  value: string;
  href: string;
  icon: ComponentType<IconProps>;
  external: boolean;
}

/* Link rows on the left. Bugcrowd is optional — it hides when the URL is "". */
function contactLinks(): LinkRow[] {
  const rows: LinkRow[] = [
    {
      key: "email",
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: Mail,
      external: false,
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      value: "/in/siyon-rai",
      href: profile.socials.linkedin,
      icon: LinkedinIcon,
      external: true,
    },
    {
      key: "github",
      label: "GitHub",
      value: "github.com",
      href: profile.socials.github,
      icon: GithubIcon,
      external: true,
    },
  ];
  if (profile.socials.bugcrowd) {
    rows.push({
      key: "bugcrowd",
      label: "Bugcrowd",
      value: "researcher",
      href: profile.socials.bugcrowd,
      icon: BadgeCheck,
      external: true,
    });
  }
  return rows;
}

export function Contact() {
  const { mode } = useTheme();
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    // No EmailJS keys yet → open the visitor's mail client instead.
    if (!emailjsReady) {
      const subject = encodeURIComponent(`Portfolio message from ${data.name}`);
      const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          from_name: data.name,
          reply_to: data.email,
          message: data.message,
        },
        { publicKey: EMAILJS.publicKey },
      );
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const lead =
    mode === "breach"
      ? "Have a question or want to connect? Feel free to reach out."
      : "Have a question or want to connect? Feel free to reach out.";

  return (
    <section id="contact" className="border-t border-border py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            id="contact"
            title="Get in touch"
            kicker={kickers.contact}
            description={lead}
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.1fr] md:gap-14">
          {/* left — direct links */}
          <Reveal delay={0.05}>
            <ul className="border-t border-border">
              {contactLinks().map(({ key, label, value, href, icon: Icon, external }) => (
                <li key={key}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-center justify-between gap-4 border-b border-border py-4 transition-colors"
                  >
                    <span className="flex items-center gap-3 text-[15px] font-medium text-foreground transition-colors group-hover:text-primary">
                      <span className="grid size-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-primary">
                        <Icon className="size-4" />
                      </span>
                      {label}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-[13px] text-muted-foreground transition-colors group-hover:text-foreground">
                      {value}
                      <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-70" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-6 flex items-center gap-2 font-mono text-[13px] text-muted-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              {mode === "breach" ? "open to security work" : "available for new work"}
            </p>
          </Reveal>

          {/* right — message form */}
          <Reveal delay={0.12}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="rounded-xl border border-border bg-card p-5 md:p-6"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    className={inputBase}
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive">Please add your name.</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@domain.com"
                    aria-invalid={!!errors.email}
                    className={inputBase}
                    {...register("email", {
                      required: true,
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    })}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">
                      Enter a valid email address.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 space-y-1.5">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder={
                    mode === "breach"
                      ? "A report, a question, or a system worth a closer look…"
                      : "Tell me what you're building…"
                  }
                  aria-invalid={!!errors.message}
                  className={cn(inputBase, "resize-none")}
                  {...register("message", { required: true, minLength: 10 })}
                />
                {errors.message && (
                  <p className="text-xs text-destructive">
                    A line or two, please (10+ characters).
                  </p>
                )}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button type="submit" size="lg" disabled={status === "sending"}>
                  {status === "sending" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Send message <Send className="size-4" />
                    </>
                  )}
                </Button>

                {status === "sent" && (
                  <span className="text-sm font-medium text-primary">
                    Thanks — I'll be in touch.
                  </span>
                )}
                {status === "error" && (
                  <span className="text-sm font-medium text-destructive">
                    Something went wrong — email me directly instead.
                  </span>
                )}
              </div>

              {!emailjsReady && (
                <p className="mt-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
                  {/* Dev note — remove once EmailJS keys are set above. */}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}