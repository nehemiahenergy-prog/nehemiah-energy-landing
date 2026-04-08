import LegalLayout from "./components/LegalLayout";
import { P, Sub, UL, LI } from "./components/LegalProse";

export default function NehemiahPrivacy() {
  const sections = [
    { id: "introduction", title: "1. Introduction", body: (<>
      <P>Nehemiah Energy Ltd ({"\u201C"}Nehemiah Energy,{"\u201D"} {"\u201C"}we,{"\u201D"} {"\u201C"}us,{"\u201D"} or {"\u201C"}our{"\u201D"}) is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, share, and protect your information when you use our electric vehicle charging stations, the Nehemiah Energy mobile application, the website at nehemiahenergy.com, and any related services (together, the {"\u201C"}Services{"\u201D"}).</P>
      <P>By using our Services, you consent to the collection and use of your information as described in this Privacy Policy. If you do not agree, please do not use our Services.</P>
    </>) },
    { id: "information-collected", title: "2. Information We Collect", body: (<>
      <Sub>Personal information you provide</Sub>
      <P>When you create an account, charge your vehicle, top up your wallet, or contact us, we may collect:</P>
      <UL>
        <LI>Full name</LI>
        <LI>Phone number</LI>
        <LI>Email address</LI>
        <LI>Vehicle information (make, model, registration number)</LI>
        <LI>Payment information (mobile money account, card details processed by Paystack)</LI>
        <LI>Account credentials (encrypted)</LI>
      </UL>
      <Sub>Information collected automatically</Sub>
      <P>When you use our app or website, we may automatically collect:</P>
      <UL>
        <LI>Device information (model, operating system, unique identifiers)</LI>
        <LI>Location data (when you search for stations or navigate to one, with your permission)</LI>
        <LI>Charging session data (station used, duration, energy consumed, cost, timestamps)</LI>
        <LI>App usage data (features used, screens viewed, errors encountered)</LI>
        <LI>IP address and browser information when visiting our website</LI>
      </UL>
      <Sub>Information from third parties</Sub>
      <P>We may receive information from Paystack regarding your payment status and transaction confirmations. We do not receive or store your full card numbers or mobile money PINs.</P>
    </>) },
    { id: "how-we-use", title: "3. How We Use Your Information", body: (<>
      <P>We use your personal data for the following purposes:</P>
      <UL>
        <LI>To provide and operate our EV charging services and the Nehemiah Energy app</LI>
        <LI>To process payments and manage your charging wallet</LI>
        <LI>To manage your loyalty stamps, points, and referral bonuses</LI>
        <LI>To communicate with you about your account, sessions, and support requests</LI>
        <LI>To send you service updates, promotional offers, and marketing messages (which you can opt out of at any time)</LI>
        <LI>To improve, personalize, and develop our Services</LI>
        <LI>To detect and prevent fraud, abuse, and security threats</LI>
        <LI>To comply with legal obligations under Ghanaian law</LI>
        <LI>To maintain records required for tax, accounting, and regulatory purposes</LI>
      </UL>
    </>) },
    { id: "sharing", title: "4. How We Share Your Information", body: (<>
      <P>We do not sell your personal data. We may share your information with the following categories of recipients:</P>
      <UL>
        <LI><strong>Payment processors:</strong> Paystack processes your payment transactions. They receive only the information necessary to complete the transaction.</LI>
        <LI><strong>Cloud hosting providers:</strong> Our data is hosted on Google Cloud servers.</LI>
        <LI><strong>Email and SMS providers:</strong> We use third-party providers for email and SMS to send you notifications and updates.</LI>
        <LI><strong>Analytics providers:</strong> We use analytics tools to understand how our Services are used and to improve them.</LI>
        <LI><strong>Legal authorities:</strong> We may disclose your information if required by Ghanaian law, court order, or government request.</LI>
        <LI><strong>Business transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.</LI>
      </UL>
      <P>All third-party service providers are contractually required to handle your data in accordance with this Privacy Policy and applicable Ghanaian data protection law.</P>
    </>) },
    { id: "storage", title: "5. Data Storage and Security", body: (<>
      <P>We store your personal data securely using industry-standard measures including:</P>
      <UL>
        <LI>Encryption of sensitive data in transit (TLS/SSL) and at rest</LI>
        <LI>Access controls limiting who within our organization can view your data</LI>
        <LI>Regular security reviews and updates</LI>
        <LI>Secure storage of payment information by Paystack (we do not store full card numbers or mobile money PINs)</LI>
      </UL>
      <Sub>Data retention</Sub>
      <P>We retain your personal data only as long as necessary for the purposes described in this policy, or as required by law. Specific retention periods:</P>
      <UL>
        <LI>Account information: retained while your account is active and for 12 months after account deletion</LI>
        <LI>Charging session records: retained for 7 years for tax and regulatory purposes</LI>
        <LI>Payment transaction records: retained for 7 years as required by Ghanaian financial regulations</LI>
        <LI>Support correspondence: retained for 24 months after resolution</LI>
      </UL>
      <P>After the retention period, your data is securely deleted or anonymized.</P>
    </>) },
    { id: "your-rights", title: "6. Your Rights Under Ghanaian Data Protection Law", body: (<>
      <P>Under the Ghana Data Protection Act, 2012 (Act 843), you have the following rights regarding your personal data:</P>
      <UL>
        <LI><strong>Right of access:</strong> You may request a copy of the personal data we hold about you.</LI>
        <LI><strong>Right to correction:</strong> You may request that we correct any inaccurate or incomplete personal data.</LI>
        <LI><strong>Right to deletion:</strong> You may request that we delete your personal data, subject to legal retention requirements.</LI>
        <LI><strong>Right to object:</strong> You may object to the processing of your personal data for direct marketing purposes.</LI>
        <LI><strong>Right to withdraw consent:</strong> Where processing is based on your consent, you may withdraw that consent at any time.</LI>
        <LI><strong>Right to data portability:</strong> You may request your data in a structured, machine-readable format.</LI>
        <LI><strong>Right to complain:</strong> You may lodge a complaint with the Ghana Data Protection Commission if you believe your rights have been violated.</LI>
      </UL>
      <P>To exercise any of these rights, contact us at support@nehemiahenergy.com. We will respond within 30 days.</P>
    </>) },
    { id: "cookies", title: "7. Cookies and Tracking Technologies", body: (<>
      <P>Our website may use cookies and similar tracking technologies to improve your experience and to understand how our website is used.</P>
      <UL>
        <LI><strong>Essential cookies:</strong> Required for the website to function properly (e.g., session management). These cannot be disabled.</LI>
        <LI><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website. You may opt out of these through your browser settings.</LI>
      </UL>
      <P>Our mobile app does not use cookies but may collect usage analytics as described in Section 2.</P>
    </>) },
    { id: "children", title: "8. Children\u2019s Privacy", body: (<>
      <P>Our Services are not directed to children under the age of 18. We do not knowingly collect personal data from children. If you believe we have inadvertently collected data from a child, please contact us immediately at support@nehemiahenergy.com and we will delete it.</P>
    </>) },
    { id: "international", title: "9. International Data Transfers", body: (<>
      <P>Your personal data is primarily stored and processed in Ghana. If any data is transferred to servers outside Ghana (for example, through our cloud hosting provider), we ensure that appropriate safeguards are in place in compliance with the Ghana Data Protection Act, 2012 (Act 843).</P>
    </>) },
    { id: "changes", title: "10. Changes to This Privacy Policy", body: (<>
      <P>We may update this Privacy Policy from time to time. When we make material changes, we will notify you through the app, by email, or on our website at least 14 days before the changes take effect.</P>
      <P>Your continued use of our Services after the effective date of the updated policy constitutes acceptance of those changes.</P>
    </>) },
    { id: "contact-dpo", title: "11. Contact Us", body: (<>
      <P>If you have any questions about this Privacy Policy or how we handle your data, contact us:</P>
      <UL>
        <LI><strong>Email:</strong> support@nehemiahenergy.com</LI>
        <LI><strong>Phone:</strong> +233 24 594 7843</LI>
        <LI><strong>Address:</strong> Nehemiah Gate, Haatso, Accra, Ghana</LI>
      </UL>
    </>) },
  ];

  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="How Nehemiah Energy collects, uses, and protects your personal data, in compliance with the Ghana Data Protection Act 2012."
      lastUpdated="April 8, 2026"
      navActive="privacy"
      sections={sections}
    />
  );
}
