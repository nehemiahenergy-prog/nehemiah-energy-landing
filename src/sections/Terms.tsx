"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Terms() {
  return (
    <section id="terms" className="py-16 sm:py-24">
      <motion.div
        className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
      >
        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
          Terms of Service
        </h2>
        <p className="mt-2 text-sm text-gray-400">Last Updated: March 13, 2026</p>
        <Separator className="my-6 bg-border/50" />

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <div>
            <h3 className="font-heading text-xl font-semibold text-white">
              1. Acceptance of Terms
            </h3>
            <p className="mt-3">
              By downloading, accessing, or using the Nehemiah Energy mobile
              application (&quot;App&quot;) operated by Neh Power (&quot;Company,&quot; &quot;we,&quot;
              &quot;us,&quot; or &quot;our&quot;), you agree to be bound by these Terms of Service
              (&quot;Terms&quot;). If you do not agree to these Terms, do not use the App.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-white">
              2. Account Registration
            </h3>
            <p className="mt-3">
              To use certain features of the App, you must create an account. You
              agree to provide accurate, current, and complete information during
              registration. You are responsible for maintaining the
              confidentiality of your account credentials and for all activities
              that occur under your account. You must notify us immediately of
              any unauthorized use.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-white">
              3. Charging Services
            </h3>
            <p className="mt-3">
              The App enables you to locate EV charging stations, initiate
              charging sessions, and make payments for charging services.
              Charging availability is subject to station status, network
              conditions, and charger compatibility with your vehicle. We do not
              guarantee uninterrupted availability of any charging station. Pricing
              for charging sessions is displayed in the App before you initiate a
              session.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-white">
              4. Payments
            </h3>
            <p className="mt-3">
              Payments for charging sessions are processed through our
              third-party payment provider, Hubtel. By initiating a charging
              session, you authorize us to charge your selected payment method for
              the applicable fees. All payments are in Ghanaian Cedis (GHS)
              unless otherwise specified. Refunds are handled on a case-by-case
              basis; contact support for refund requests.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-white">
              5. Loyalty Program
            </h3>
            <p className="mt-3">
              The App includes a loyalty rewards program. Points earned through
              charging sessions can be redeemed for rewards as described in the
              App. We reserve the right to modify, suspend, or terminate the
              loyalty program at any time. Points have no cash value and are
              non-transferable.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-white">
              6. Prohibited Conduct
            </h3>
            <p className="mt-3">You agree not to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Use the App for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to the App or its systems</li>
              <li>Interfere with or disrupt the App&apos;s functionality</li>
              <li>Reverse engineer, decompile, or disassemble the App</li>
              <li>Use automated systems to access the App (bots, scrapers)</li>
              <li>Impersonate another person or entity</li>
              <li>Tamper with charging station hardware or software</li>
              <li>Abuse the loyalty program through fraud or manipulation</li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-white">
              7. Intellectual Property
            </h3>
            <p className="mt-3">
              The App and its content, including but not limited to text,
              graphics, logos, icons, images, software, and the Nehemiah Energy
              brand, are the property of Neh Power and are protected by
              intellectual property laws. You may not copy, modify, distribute, or
              create derivative works based on the App without our prior written
              consent.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-white">
              8. Limitation of Liability
            </h3>
            <p className="mt-3">
              To the maximum extent permitted by applicable law, Neh Power shall
              not be liable for any indirect, incidental, special, consequential,
              or punitive damages arising out of or related to your use of the
              App, including but not limited to damages for loss of profits, data,
              or other intangible losses. Our total liability shall not exceed the
              amount you paid to us in the 12 months preceding the claim.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-white">
              9. Disclaimer of Warranties
            </h3>
            <p className="mt-3">
              The App is provided &quot;as is&quot; and &quot;as available&quot; without warranties
              of any kind, either express or implied, including but not limited to
              implied warranties of merchantability, fitness for a particular
              purpose, and non-infringement. We do not warrant that the App will
              be uninterrupted, error-free, or secure.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-white">
              10. Termination
            </h3>
            <p className="mt-3">
              We may suspend or terminate your account and access to the App at
              our sole discretion, without notice, for conduct that we determine
              violates these Terms or is harmful to other users, us, or third
              parties. You may terminate your account at any time by following the
              account deletion process described in our Account Deletion section.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-white">
              11. Governing Law
            </h3>
            <p className="mt-3">
              These Terms shall be governed by and construed in accordance with
              the laws of the Republic of Ghana, without regard to its conflict of
              law provisions. Any disputes arising under these Terms shall be
              subject to the exclusive jurisdiction of the courts of Ghana.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-white">
              12. Changes to Terms
            </h3>
            <p className="mt-3">
              We reserve the right to modify these Terms at any time. We will
              notify you of material changes by posting the updated Terms in the
              App and updating the &quot;Last Updated&quot; date. Your continued use of the
              App after changes constitutes acceptance of the revised Terms.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold text-white">
              13. Contact Us
            </h3>
            <p className="mt-3">
              For questions about these Terms, please contact us at:
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
