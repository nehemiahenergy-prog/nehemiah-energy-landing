import LegalLayout from "./components/LegalLayout";
import { P, Sub, UL, LI } from "./components/LegalProse";

export default function NehemiahTerms() {
  const sections = [
    { id: "introduction", title: "1. Introduction", body: (<>
      <P>Welcome to Nehemiah Energy. These Terms of Use ({"\u201C"}Terms{"\u201D"}) govern your access to and use of the Nehemiah Energy electric vehicle charging stations, the Nehemiah Energy mobile application, the website at nehemiahenergy.com, and any related services we offer (together, the {"\u201C"}Services{"\u201D"}).</P>
      <P>By creating an account, charging your vehicle at one of our stations, downloading our app, or otherwise using our Services, you confirm that you have read, understood, and agree to be bound by these Terms. If you do not agree, please do not use the Services.</P>
    </>) },
    { id: "eligibility", title: "2. Eligibility", body: (<>
      <P>To use our Services, you must:</P>
      <UL>
        <LI>Be at least 18 years of age</LI>
        <LI>Be a resident of Ghana with the legal capacity to enter into binding contracts</LI>
        <LI>Provide accurate, complete, and current information when registering an account</LI>
        <LI>Comply with all applicable laws of the Republic of Ghana</LI>
      </UL>
      <P>We may refuse service or terminate accounts that do not meet these requirements.</P>
    </>) },
    { id: "services", title: "3. Our Services", body: (<>
      <P>Nehemiah Energy provides:</P>
      <UL>
        <LI>Public access electric vehicle (EV) charging at our stations across Greater Accra and beyond</LI>
        <LI>A digital charging wallet that you can top up with mobile money or card and use to pay for charging sessions</LI>
        <LI>The Nehemiah Energy mobile application for finding stations, starting charging sessions, managing your wallet, and viewing your usage history</LI>
        <LI>Loyalty rewards including charging stamps and referral bonuses</LI>
        <LI>Educational and community programs through the Nehemiah Project</LI>
      </UL>
      <P>We may add, modify, or discontinue any of our Services at any time. We will give reasonable advance notice of material changes where we are able to.</P>
    </>) },
    { id: "accounts", title: "4. Account Registration and Security", body: (<>
      <P>To access certain features {"\u2014"} including the digital wallet and loyalty rewards {"\u2014"} you must create an account.</P>
      <P>You agree to:</P>
      <UL>
        <LI>Provide accurate and complete registration information</LI>
        <LI>Keep your password and account credentials confidential</LI>
        <LI>Promptly notify us of any unauthorized use of your account</LI>
        <LI>Not share your account with others or allow others to use your credentials</LI>
        <LI>Maintain only one account per person</LI>
      </UL>
      <P>You are responsible for all activity that occurs under your account. We are not liable for any loss or damage resulting from your failure to keep your account secure.</P>
    </>) },
    { id: "charging", title: "5. Charging Your Vehicle", body: (<>
      <P>Our charging stations are designed for compatible electric vehicles. By starting a charging session, you confirm that:</P>
      <UL>
        <LI>Your vehicle is in good working condition and compatible with our charging equipment</LI>
        <LI>You will follow all instructions displayed at the station and in the app</LI>
        <LI>You will not leave your vehicle unattended for extended periods after charging completes</LI>
        <LI>You will not tamper with, damage, or attempt to repair our equipment</LI>
        <LI>You accept responsibility for any damage to your vehicle that results from your failure to follow instructions or from misuse of our equipment</LI>
      </UL>
      <P>Charging session availability is not guaranteed. Stations may be temporarily out of service for maintenance, power supply issues, or other reasons beyond our control. We are not liable for any inconvenience caused by station unavailability.</P>
    </>) },
    { id: "payments", title: "6. Payments and Wallet Top-ups", body: (<>
      <Sub>Payment processing</Sub>
      <P>Payment is processed through Paystack, our third-party payment processor. We accept MTN Mobile Money, AirtelTigo Money, Vodafone Cash, and major debit and credit cards. Paystack{"\u2019"}s own terms apply to its processing of your payment information.</P>
      <Sub>Wallet top-ups</Sub>
      <P>You may top up your charging wallet through the app at any time. Wallet top-ups are credited to your account immediately upon successful payment. Wallet balances do not expire and do not earn interest. Top-ups are generally non-refundable to the original payment method {"\u2014"} see our Refund Policy for details on how unused balances may be withdrawn.</P>
    </>) },
    { id: "loyalty", title: "7. Loyalty Rewards and Referrals", body: (<>
      <P>As a member, you earn loyalty stamps and points:</P>
      <UL>
        <LI>One stamp per qualifying charging session of GHS 80 or more</LI>
        <LI>After 10 stamps, your 11th charging session is free, up to a maximum value of GHS 80</LI>
        <LI>10 points per GHS 1 spent on charging</LI>
        <LI>100 points can be redeemed for GHS 1 of charging credit</LI>
      </UL>
      <P>Referral bonus: When you refer a new member who completes their first qualifying charging session, both you and your referred friend receive GHS 20 in charging credit.</P>
      <P>Loyalty rewards have no cash value and may not be transferred or sold. We reserve the right to modify or discontinue the loyalty program at any time. Rewards earned but not redeemed at the time of program discontinuation will be honored for 30 days after the discontinuation date.</P>
    </>) },
    { id: "acceptable-use", title: "8. Acceptable Use", body: (<>
      <P>When using our Services, you agree NOT to:</P>
      <UL>
        <LI>Use any charging station or our equipment in a manner inconsistent with its intended purpose</LI>
        <LI>Tamper with, damage, repair, modify, or reverse-engineer our equipment, software, or app</LI>
        <LI>Use our Services for any unlawful purpose or in violation of any applicable law</LI>
        <LI>Resell or commercially redistribute charging access or wallet credit without our written authorization</LI>
        <LI>Impersonate another person or provide false information</LI>
        <LI>Interfere with the operation of our Services or with other users{"\u2019"} access to them</LI>
        <LI>Use automated systems, bots, or scrapers to access our Services</LI>
        <LI>Upload viruses, malware, or other malicious code</LI>
      </UL>
      <P>Violation of these rules may result in immediate account suspension or termination, and may expose you to civil or criminal liability under Ghanaian law.</P>
    </>) },
    { id: "ip", title: "9. Intellectual Property", body: (<>
      <P>All content, design, logos, trademarks, and other intellectual property associated with Nehemiah Energy {"\u2014"} including the Nehemiah Energy name, the N mark, the brand pattern, the brand colors, the written content on our website and app, and the Nehemiah Energy app itself {"\u2014"} are owned by Nehemiah Energy Ltd or its licensors and are protected by Ghanaian and international intellectual property laws.</P>
      <P>You may not copy, reproduce, distribute, modify, create derivative works of, publicly display, or otherwise use any of our intellectual property without our prior written consent.</P>
    </>) },
    { id: "disclaimers", title: "10. Disclaimers", body: (<>
      <P>Our Services are provided on an {"\u201C"}as is{"\u201D"} and {"\u201C"}as available{"\u201D"} basis. To the fullest extent permitted by Ghanaian law, we disclaim all warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, that our Services will be uninterrupted, error-free, or secure, and warranties regarding the accuracy or reliability of any information obtained through our Services.</P>
      <P>We do not guarantee that any specific charging station will be available at any specific time, or that any charging session will complete without interruption.</P>
    </>) },
    { id: "liability", title: "11. Limitation of Liability", body: (<>
      <P>To the fullest extent permitted by Ghanaian law, Nehemiah Energy Ltd, its directors, employees, agents, affiliates, and licensors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, loss of revenue, loss of data, loss of goodwill, or other intangible losses, arising out of or in connection with your use of our Services.</P>
      <P>Our total cumulative liability to you for any claims arising from or related to these Terms or your use of our Services shall not exceed the greater of the total amount you have paid to us in the twelve (12) months preceding the event giving rise to the claim, or GHS 30,000.</P>
      <P>Nothing in these Terms excludes or limits any liability that cannot be excluded or limited under applicable Ghanaian law, including liability for death or personal injury caused by our negligence.</P>
    </>) },
    { id: "indemnification", title: "12. Indemnification", body: (<>
      <P>You agree to indemnify, defend, and hold harmless Nehemiah Energy Ltd, its directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or related to your use of our Services, your violation of these Terms, your violation of any law or the rights of any third party, or any false or inaccurate information you provide to us.</P>
    </>) },
    { id: "termination", title: "13. Termination", body: (<>
      <P>You may stop using our Services at any time. To delete your account, contact us at support@nehemiahenergy.com.</P>
      <P>We may suspend or terminate your account or access to our Services at any time, with or without notice, for reasons including violation of these Terms, suspected fraudulent or unlawful activity, non-payment, or extended inactivity (after 24 months).</P>
      <P>Upon termination, your right to use our Services immediately ceases. Provisions of these Terms that by their nature should survive termination {"\u2014"} including limitation of liability, indemnification, and dispute resolution {"\u2014"} shall survive.</P>
    </>) },
    { id: "changes", title: "14. Changes to These Terms", body: (<>
      <P>We may update these Terms from time to time. When we make material changes, we will notify you through the app, by email, or on our website at least 14 days before the changes take effect.</P>
      <P>Your continued use of our Services after the effective date of the updated Terms constitutes acceptance of those changes. If you do not agree with the updated Terms, you must stop using our Services.</P>
    </>) },
    { id: "severability", title: "15. Severability", body: (<>
      <P>If any provision of these Terms is found by a court of competent jurisdiction to be invalid, illegal, or unenforceable, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall continue in full force and effect.</P>
    </>) },
  ];

  return (
    <LegalLayout
      title="Terms of Use"
      subtitle="Please read these terms carefully before using Nehemiah Energy's services. By using our charging stations, app, or website, you agree to be bound by them."
      lastUpdated="April 8, 2026"
      navActive="terms"
      sections={sections}
    />
  );
}
