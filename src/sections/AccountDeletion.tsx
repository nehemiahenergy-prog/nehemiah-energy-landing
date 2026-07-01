"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Mail, Clock, AlertTriangle } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const steps = [
  {
    icon: Trash2,
    title: "In-App Deletion",
    description:
      'Open the Nehemiah Energy app, go to Profile > Settings > Delete Account, and confirm your request. Your account will be scheduled for deletion.',
  },
  {
    icon: Mail,
    title: "Email Request",
    description:
      "Alternatively, send an email to info@nehemiahenergy.com with the subject line \"Delete My Account\" and include the email or phone number associated with your account.",
  },
  {
    icon: Clock,
    title: "30-Day Processing",
    description:
      "Account deletion is processed within 30 days of your request. During this period, you can contact us to cancel the deletion if you change your mind.",
  },
];

export default function AccountDeletion() {
  return (
    <section id="delete" className="py-16 sm:py-24">
      <motion.div
        className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
      >
        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
          Account Deletion
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          How to delete your Nehemiah Energy account and data
        </p>
        <Separator className="my-6 bg-border/50" />

        <p className="text-gray-300 leading-relaxed">
          You have the right to delete your account and all associated personal
          data at any time. You can request account deletion through either of
          the following methods:
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {steps.map((step) => (
            <Card
              key={step.title}
              className="border-border/50 bg-neh-card"
            >
              <CardContent className="pt-6">
                <step.icon className="h-8 w-8 text-neh-green" />
                <h3 className="mt-4 font-heading text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 space-y-6 text-gray-300 leading-relaxed">
          <div>
            <h3 className="font-heading text-xl font-semibold text-white">
              What Gets Deleted
            </h3>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>Your account profile and personal information</li>
              <li>Charging session history</li>
              <li>Payment records (after regulatory retention period)</li>
              <li>Loyalty points balance and redemption history</li>
              <li>Saved vehicles and preferences</li>
              <li>Referral data</li>
            </ul>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-500" />
            <div>
              <p className="font-medium text-yellow-400">Important Note</p>
              <p className="mt-1 text-sm text-gray-400">
                Some data may be retained as required by law, including payment
                transaction records for tax and regulatory compliance.
                Anonymized, aggregated usage data that cannot be linked back to
                you may also be retained for analytics purposes.
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-white">
              Contact for Deletion Requests
            </h3>
            <p className="mt-3">
              Email:{" "}
              <a
                href="mailto:info@nehemiahenergy.com"
                className="text-neh-green hover:underline"
              >
                info@nehemiahenergy.com
              </a>
            </p>
            <p className="mt-1">Phone: 024 594 7843</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
