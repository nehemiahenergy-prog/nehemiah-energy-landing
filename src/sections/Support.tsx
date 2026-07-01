"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const faqs = [
  {
    question: "How do I create an account?",
    answer:
      "Download the Nehemiah Energy app from the App Store or Google Play. Open the app and sign up using your phone number or email address. You'll receive a verification code to complete registration.",
  },
  {
    question: "How do I find a charging station?",
    answer:
      "Open the app and navigate to the home screen. You'll see a map of available charging stations near you. Tap on any station to view details including charger types, pricing, and availability.",
  },
  {
    question: "How do I start a charging session?",
    answer:
      "Navigate to a charging station on the map, select a charger, and tap 'Start Charging.' Follow the on-screen instructions to connect your vehicle and authorize payment. The session will begin automatically.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept mobile money payments through Hubtel, including MTN Mobile Money, Vodafone Cash, and AirtelTigo Money. Card payments may also be available depending on your region.",
  },
  {
    question: "How does the loyalty program work?",
    answer:
      "You earn loyalty points every time you complete a charging session. Points accumulate in your account and can be redeemed for rewards such as free charging sessions, discounts, and exclusive perks through the Rewards section of the app.",
  },
  {
    question: "How do I delete my account?",
    answer:
      'You can delete your account through the app by going to Profile > Settings > Delete Account. Alternatively, email us at info@nehemiahenergy.com with the subject "Delete My Account." Deletion is processed within 30 days.',
  },
  {
    question: "What should I do if I have a problem during charging?",
    answer:
      "If you experience any issues during a charging session, tap the 'Help' button in the active session screen or contact our support team directly via email or phone. We're here to help resolve any problems quickly.",
  },
  {
    question: "Is the app available outside Ghana?",
    answer:
      "Currently, Nehemiah Energy operates exclusively in Ghana. We plan to expand to other West African countries in the future. Stay tuned for announcements about new locations.",
  },
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@nehemiahenergy.com",
    href: "mailto:info@nehemiahenergy.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "024 594 7843",
    href: "tel:+233245947843",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Accra, Ghana",
    href: undefined,
  },
];

export default function Support() {
  return (
    <section id="support" className="py-16 sm:py-24">
      <motion.div
        className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
      >
        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
          Support
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Get help with the Nehemiah Energy app
        </p>
        <Separator className="my-6 bg-border/50" />

        {/* Contact cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          {contactInfo.map((item) => (
            <Card
              key={item.label}
              className="border-border/50 bg-neh-card"
            >
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neh-green/10">
                  <item.icon className="h-5 w-5 text-neh-green" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm font-medium text-white hover:text-neh-green transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-white">
                      {item.value}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h3 className="font-heading text-2xl font-semibold text-white">
            Frequently Asked Questions
          </h3>
          <Accordion className="mt-6">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border-border/50"
              >
                <AccordionTrigger className="text-left text-white hover:text-neh-green hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.div>
    </section>
  );
}
