import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms of Service", href: "#terms" },
  { label: "Account Deletion", href: "#delete" },
  { label: "Support", href: "#support" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-neh-dark">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <Image
              src="/assets/main-logo.svg"
              alt="Nehemiah Energy"
              width={140}
              height={36}
            />
            <p className="text-sm text-gray-400">
              Powering Ghana&apos;s EV Future
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 transition-colors hover:text-neh-green"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <Separator className="my-8 bg-border/50" />

        <div className="flex flex-col items-center gap-2 text-center text-xs text-gray-500 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Neh Power. All rights reserved.</p>
          <p>Nehemiah Energy App &mdash; by Neh Power, Ghana</p>
        </div>
      </div>
    </footer>
  );
}
