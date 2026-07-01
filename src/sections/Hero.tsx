"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import {
  MapPin,
  Zap,
  BarChart3,
  Gift,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: MapPin,
    title: "Find Stations",
    description: "Locate EV charging stations across Ghana in real time.",
  },
  {
    icon: Zap,
    title: "Charge Your EV",
    description: "Start and monitor charging sessions right from your phone.",
  },
  {
    icon: BarChart3,
    title: "Track Usage",
    description: "View charging history, energy consumed, and spending.",
  },
  {
    icon: Gift,
    title: "Earn Rewards",
    description: "Collect loyalty points every time you charge and redeem perks.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24"
    >
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <Image
          src="/assets/pattern-1.svg"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero text */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          <motion.p
            className="font-heading text-sm font-medium uppercase tracking-widest text-neh-green"
            variants={fadeUp}
            custom={0}
          >
            Powering Your Journey
          </motion.p>

          <motion.h1
            className="mt-4 font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            variants={fadeUp}
            custom={1}
          >
            Drive. Charge.{" "}
            <span className="text-neh-green">Earn.</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-gray-400 sm:text-xl"
            variants={fadeUp}
            custom={2}
          >
            Ghana&apos;s premier EV charging app by Neh Power. Find stations,
            charge your vehicle, track your usage, and earn rewards &mdash; all
            in one app.
          </motion.p>

          {/* Download badges */}
          <motion.div
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            variants={fadeUp}
            custom={3}
          >
            <a
              href="#"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-neh-green text-neh-dark hover:bg-neh-green/90 font-semibold flex items-center gap-2"
              )}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              App Store
              <ChevronRight size={16} />
            </a>
            <a
              href="#"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-neh-green text-neh-green hover:bg-neh-green/10 flex items-center gap-2"
              )}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302L15.395 12l2.302-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z"/>
              </svg>
              Google Play
              <ChevronRight size={16} />
            </a>
          </motion.div>
        </motion.div>

        {/* Feature cards */}
        <div className="mx-auto mt-20 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="rounded-xl border border-border/50 bg-neh-card p-6 transition-colors hover:border-neh-green/30"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={i}
            >
              <feature.icon className="h-8 w-8 text-neh-green" />
              <h3 className="mt-4 font-heading text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Car mockup */}
        <motion.div
          className="mx-auto mt-16 max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/assets/images/electric-sedan-mockup.jpeg"
            alt="Electric vehicle charging"
            width={1200}
            height={600}
            className="rounded-2xl border border-border/30"
          />
        </motion.div>
      </div>
    </section>
  );
}
