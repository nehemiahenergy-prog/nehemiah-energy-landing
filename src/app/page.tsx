import Hero from "@/sections/Hero";
import PrivacyPolicy from "@/sections/PrivacyPolicy";
import Terms from "@/sections/Terms";
import AccountDeletion from "@/sections/AccountDeletion";
import Support from "@/sections/Support";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="min-h-screen bg-neh-dark">
      <Hero />
      <Separator className="mx-auto max-w-7xl bg-border/30" />
      <PrivacyPolicy />
      <Separator className="mx-auto max-w-7xl bg-border/30" />
      <Terms />
      <Separator className="mx-auto max-w-7xl bg-border/30" />
      <AccountDeletion />
      <Separator className="mx-auto max-w-7xl bg-border/30" />
      <Support />
    </main>
  );
}
