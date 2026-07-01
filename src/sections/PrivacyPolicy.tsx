"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PrivacyPolicy() {
  return (
    <section id="privacy" className="py-16 sm:py-24">
      <motion.div
        className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
      >
        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
          Privacy Policy
        </h2>
        <p className="mt-2 text-sm text-gray-400">Last Updated: March 13, 2026</p>
        <Separator className="my-6 bg-border/50" />

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <div>
            <h3 className="font-heading text-xl font-semibold text-white">
              1. Introduction
            </h3>
            <p className="mt-3">
              Neh Power (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the Nehemiah Energy
              mobile application (the &quot;App&quot;). This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you use
              the App. Please read this policy carefully. By using the App, you
              agree to the collection and use of information in accordance with
              this policy.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-white">
              2. Information We Collect
            </h3>
            <p className="mt-3 font-medium text-white">Personal Information</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Name and contact information (email, phone number)</li>
              <li>Account credentials</li>
              <li>Payment and billing information</li>
              <li>Vehicle information (make, model, battery type)</li>
              <li>Profile photo (if provided)</li>
            </ul>
            <p className="mt-4 font-medium text-white">Usage Data</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Charging session history and energy consumption</li>
              <li>Location data (when using station finder)</li>
              <li>App usage analytics and interaction data</li>
              <li>Device information (OS, device model, app version)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-white">
              3. How We Use Your Information
            </h3>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>Provide, operate, and maintain the App and charging services</li>
              <li>Process payments and manage your account</li>
              <li>Send charging session updates and receipts</li>
              <li>Manage loyalty points and rewards programs</li>
              <li>Improve the App through analytics and feedback</li>
              <li>Communicate service updates, promotions, and support</li>
              <li>Comply with legal obligations and enforce our terms</li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-white">
              4. Third-Party Services
            </h3>
            <p className="mt-3">
              We use the following third-party services to operate the App:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                <strong>Supabase</strong> &mdash; Backend infrastructure,
                authentication, and database services
              </li>
              <li>
                <strong>Twilio</strong> &mdash; Phone number verification via SMS
                OTP
              </li>
              <li>
                <strong>Hubtel</strong> &mdash; Payment processing for charging
                sessions
              </li>
              <li>
                <strong>Powerfill</strong> &mdash; EV charger network integration
                and session management
              </li>
            </ul>
            <p className="mt-3">
              These third parties have their own privacy policies and may collect
              data independently. We encourage you to review their policies.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-white">
              5. Data Retention
            </h3>
            <p className="mt-3">
              We retain your personal information for as long as your account is
              active or as needed to provide services. Charging session records
              and payment history are retained for up to 3 years for regulatory
              and accounting purposes. You may request deletion of your account
              and associated data at any time (see Account Deletion section
              below).
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-white">
              6. Data Deletion
            </h3>
            <p className="mt-3">
              You have the right to request the deletion of your personal data at
              any time. Upon receiving a deletion request, we will remove your
              data within 30 days, except where retention is required by law. See
              our{" "}
              <a href="#delete" className="text-neh-green hover:underline">
                Account Deletion
              </a>{" "}
              section for detailed instructions.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-white">
              7. Children&apos;s Privacy
            </h3>
            <p className="mt-3">
              The App is not intended for use by children under the age of 18. We
              do not knowingly collect personal information from children. If we
              become aware that we have collected data from a child under 18, we
              will take steps to delete such information promptly.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-white">
              8. Your Rights
            </h3>
            <p className="mt-3">You have the right to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Access and receive a copy of your personal data</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for data processing</li>
              <li>Object to data processing for marketing purposes</li>
              <li>Data portability (receive your data in a structured format)</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{" "}
              <a
                href="mailto:info@nehemiahenergy.com"
                className="text-neh-green hover:underline"
              >
                info@nehemiahenergy.com
              </a>
              .
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-white">
              9. Security
            </h3>
            <p className="mt-3">
              We implement appropriate technical and organizational security
              measures to protect your data, including encryption in transit and
              at rest, secure authentication, and regular security reviews.
              However, no method of electronic transmission or storage is 100%
              secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-white">
              10. Changes to This Policy
            </h3>
            <p className="mt-3">
              We may update this Privacy Policy from time to time. We will notify
              you of any changes by posting the new policy on this page and
              updating the &quot;Last Updated&quot; date. Your continued use of the App
              after changes constitutes acceptance of the updated policy.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-white">
              11. Contact Us
            </h3>
            <p className="mt-3">
              If you have any questions about this Privacy Policy, please contact
              us at:
            </p>
            <ul className="mt-2 space-y-1 pl-6">
              <li>
                Email:{" "}
                <a
                  href="mailto:info@nehemiahenergy.com"
                  className="text-neh-green hover:underline"
                >
                  info@nehemiahenergy.com
                </a>
              </li>
              <li>Phone: 024 594 7843</li>
              <li>Company: Neh Power, Ghana</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
