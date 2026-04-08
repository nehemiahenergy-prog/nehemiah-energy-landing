import LegalLayout from "./components/LegalLayout";
import { P, Sub, UL, LI } from "./components/LegalProse";

export default function NehemiahRefund() {
  const sections = [
    { id: "overview", title: "1. Overview", body: (<>
      <P>This Refund Policy explains when and how you can request a refund for charging sessions and wallet top-ups with Nehemiah Energy. We want every charging experience to be a good one, and if something goes wrong, we will make it right.</P>
      <P>All refund requests are reviewed on a case-by-case basis. We aim to acknowledge every request within 48 hours and to resolve it as quickly as possible.</P>
    </>) },
    { id: "charging-refunds", title: "2. Charging Session Refunds", body: (<>
      <Sub>When you are entitled to a refund</Sub>
      <P>You may request a full or partial refund for a charging session if:</P>
      <UL>
        <LI>The charging session failed to start due to a fault with our equipment</LI>
        <LI>The session was interrupted or terminated early due to a station malfunction</LI>
        <LI>You were charged for energy that was not delivered to your vehicle</LI>
        <LI>You were charged an incorrect rate or an incorrect amount</LI>
        <LI>A duplicate charge was applied to your account</LI>
      </UL>
      <Sub>When refunds are not available</Sub>
      <P>Refunds are generally not available if:</P>
      <UL>
        <LI>You voluntarily ended the session before it completed</LI>
        <LI>Your vehicle stopped accepting charge due to its own battery management system (not our equipment)</LI>
        <LI>You were charged an idle fee for leaving your vehicle plugged in after the session completed</LI>
        <LI>The charging session completed successfully and the correct amount was charged</LI>
      </UL>
      <Sub>Automatic refunds</Sub>
      <P>In some cases, our system automatically detects session failures and issues a refund to your charging wallet within 24 to 48 hours. If you believe you are entitled to a refund that was not issued automatically, please contact us.</P>
      <Sub>Disputed charges</Sub>
      <P>If you dispute a charge and we need to investigate, we will review the session logs, equipment data, and any other relevant information. We aim to resolve disputes within 14 business days. If the dispute is resolved in your favour, the refund will be credited to your charging wallet or to your original payment method, depending on the circumstances.</P>
    </>) },
    { id: "wallet-refunds", title: "3. Wallet Top-Up Refunds", body: (<>
      <Sub>Wallet balance usage</Sub>
      <P>Wallet top-ups are intended for use toward future charging sessions. Wallet balances do not expire.</P>
      <Sub>Failed top-ups</Sub>
      <P>If you are charged for a wallet top-up but the balance is not credited to your account, contact us immediately. We will verify the transaction with Paystack and credit your wallet or issue a refund within 24 to 48 hours of confirmation.</P>
    </>) },
    { id: "membership-refunds", title: "4. Membership and Loyalty Refunds", body: (<>
      <P>Loyalty stamps, points, and referral credits have no cash value and are not refundable. They cannot be transferred or sold.</P>
      <P>If the loyalty program is discontinued, any stamps or points you have earned will be honoured for 30 days after the discontinuation date, as described in our Terms of Use.</P>
    </>) },
    { id: "how-to-request", title: "5. How to Request a Refund", body: (<>
      <P>To request a refund, contact us through any of the following channels:</P>
      <UL>
        <LI><strong>In-app support:</strong> Open the Nehemiah Energy app, go to your session history, tap the session in question, and select {"\u201C"}Report a Problem.{"\u201D"}</LI>
        <LI><strong>Email:</strong> Send a message to support@nehemiahenergy.com with {"\u201C"}Refund Request{"\u201D"} in the subject line. Include your account name, the date and time of the session, and a description of the issue.</LI>
        <LI><strong>Phone:</strong> Call +233 24 594 7843 during Monday to Sunday, 8am {"\u2013"} 6pm.</LI>
      </UL>
      <P>We will acknowledge your request within 48 hours and aim to resolve it within 10 business days.</P>
    </>) },
    { id: "processing-times", title: "6. Refund Processing Times", body: (<>
      <P>Once a refund is approved, the processing time depends on the refund method:</P>
      <UL>
        <LI><strong>Charging wallet credit:</strong> Instant</LI>
        <LI><strong>Mobile money (MTN MoMo, AirtelTigo, Vodafone Cash):</strong> 1 to 3 business days</LI>
        <LI><strong>Debit or credit card:</strong> 5 to 10 business days (processing time depends on your bank)</LI>
      </UL>
      <P>Where possible, refunds will be credited to your Nehemiah Energy charging wallet for the fastest resolution. If you prefer a refund to your original payment method, let us know when submitting your request.</P>
    </>) },
    { id: "statutory-rights", title: "7. Your Statutory Rights", body: (<>
      <P>Nothing in this Refund Policy limits or excludes any rights you have under Ghanaian consumer protection law. If any provision of this policy conflicts with your statutory rights, your statutory rights will prevail.</P>
      <P>If you are not satisfied with how we have handled your refund request, you may escalate the matter through the appropriate consumer protection or regulatory channels in Ghana.</P>
    </>) },
  ];

  return (
    <LegalLayout
      title="Refund Policy"
      subtitle="When refunds are available for charging sessions and wallet top-ups, and how to request one."
      lastUpdated="April 8, 2026"
      navActive="refund"
      sections={sections}
    />
  );
}
