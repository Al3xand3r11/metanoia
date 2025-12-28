"use client";

import Image from "next/image";
import Link from "next/link";
import CleoLogo from "@/public/CleoLogo.png";

export default function WebPrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col">
      {/* Header */}
      <header className="px-6 py-6">
        <Link href="/">
          <Image
            src={CleoLogo}
            alt="CLEO+"
            width={100}
            height={50}
            className="h-auto w-24"
          />
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h1
            className="text-4xl md:text-5xl font-black text-white mb-4 uppercase"
            style={{ fontFamily: "var(--font-saira-condensed)" }}
          >
            Website Privacy Policy
          </h1>
          <p className="text-gray-400 text-sm mb-8">
            Last Updated: December 26, 2024
          </p>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            {/* Introduction */}
            <section>
              <h2
                className="text-xl font-bold text-white mb-3 uppercase"
                style={{ fontFamily: "var(--font-saira-condensed)" }}
              >
                Introduction
              </h2>
              <p>
                Cleo+ (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website{" "}
                <a
                  href="https://www.itscleoplus.com"
                  className="text-[#FF1482] hover:underline"
                >
                  www.itscleoplus.com
                </a>{" "}
                and related SMS messaging services. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you visit our
                website or participate in our SMS messaging program.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2
                className="text-xl font-bold text-white mb-3 uppercase"
                style={{ fontFamily: "var(--font-saira-condensed)" }}
              >
                Information We Collect
              </h2>
              <p className="mb-4">We may collect the following types of information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-white">Phone Number:</strong> When you opt in to
                  our SMS program by texting our designated number, we collect your mobile
                  phone number.
                </li>
                <li>
                  <strong className="text-white">Name:</strong> If you choose to share your
                  name when submitting a metanoia moment.
                </li>
                <li>
                  <strong className="text-white">User Submissions:</strong> Content you
                  voluntarily submit through our platform, including your personal stories
                  and moments of transformation.
                </li>
                <li>
                  <strong className="text-white">Device Information:</strong> Basic device
                  and browser information collected automatically when you visit our
                  website.
                </li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2
                className="text-xl font-bold text-white mb-3 uppercase"
                style={{ fontFamily: "var(--font-saira-condensed)" }}
              >
                How We Use Your Information
              </h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Send you SMS messages related to the CLEO+ Metanoia campaign</li>
                <li>Share updates about CLEO+ music, events, and experiences</li>
                <li>Display anonymized user submissions on our website</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Improve our website and services</li>
              </ul>
            </section>

            {/* SMS Messaging */}
            <section>
              <h2
                className="text-xl font-bold text-white mb-3 uppercase"
                style={{ fontFamily: "var(--font-saira-condensed)" }}
              >
                SMS Messaging Program
              </h2>
              <p className="mb-4">
                By texting &quot;START&quot; to our designated number, you consent to receive
                recurring automated marketing and informational text messages from CLEO+.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-white">Message Frequency:</strong> Message
                  frequency varies; typically 1-5 messages per week.
                </li>
                <li>
                  <strong className="text-white">Message & Data Rates:</strong> Standard
                  message and data rates may apply.
                </li>
                <li>
                  <strong className="text-white">Opt-Out:</strong> Reply STOP at any time
                  to unsubscribe from SMS messages.
                </li>
                <li>
                  <strong className="text-white">Help:</strong> Reply HELP for assistance.
                </li>
                <li>
                  <strong className="text-white">Carriers:</strong> Carriers are not liable
                  for delayed or undelivered messages.
                </li>
              </ul>
              <p className="mt-4">
                Consent to receive SMS messages is not a condition of any purchase. Your
                phone number will not be shared with third parties for their marketing
                purposes.
              </p>
            </section>

            {/* Data Sharing */}
            <section>
              <h2
                className="text-xl font-bold text-white mb-3 uppercase"
                style={{ fontFamily: "var(--font-saira-condensed)" }}
              >
                Information Sharing
              </h2>
              <p className="mb-4">
                We do not sell, trade, or rent your personal information to third parties.
                We may share information in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-white">Service Providers:</strong> With trusted
                  third-party service providers who assist us in operating our website and
                  SMS services (such as Twilio for messaging).
                </li>
                <li>
                  <strong className="text-white">Legal Requirements:</strong> When required
                  by law or to protect our rights and safety.
                </li>
                <li>
                  <strong className="text-white">User Submissions:</strong> Anonymized
                  metanoia moments may be displayed publicly on our website.
                </li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2
                className="text-xl font-bold text-white mb-3 uppercase"
                style={{ fontFamily: "var(--font-saira-condensed)" }}
              >
                Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational security measures to
                protect your personal information. However, no method of transmission over
                the Internet or electronic storage is 100% secure, and we cannot guarantee
                absolute security.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2
                className="text-xl font-bold text-white mb-3 uppercase"
                style={{ fontFamily: "var(--font-saira-condensed)" }}
              >
                Your Rights
              </h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Opt out of SMS messages at any time by replying STOP</li>
                <li>Request access to your personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Request that we correct inaccurate information</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at{" "}
                <a
                  href="mailto:itscleoplus@gmail.com"
                  className="text-[#FF1482] hover:underline"
                >
                  itscleoplus@gmail.com
                </a>
                .
              </p>
            </section>

            {/* California Residents */}
            <section>
              <h2
                className="text-xl font-bold text-white mb-3 uppercase"
                style={{ fontFamily: "var(--font-saira-condensed)" }}
              >
                California Privacy Rights
              </h2>
              <p>
                California residents may have additional rights under the California
                Consumer Privacy Act (CCPA), including the right to know what personal
                information is collected, request deletion, and opt out of the sale of
                personal information. We do not sell personal information. To make a
                request, contact us at{" "}
                <a
                  href="mailto:itscleoplus@gmail.com"
                  className="text-[#FF1482] hover:underline"
                >
                  itscleoplus@gmail.com
                </a>
                .
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2
                className="text-xl font-bold text-white mb-3 uppercase"
                style={{ fontFamily: "var(--font-saira-condensed)" }}
              >
                Children&apos;s Privacy
              </h2>
              <p>
                Our services are not directed to individuals under the age of 13. We do not
                knowingly collect personal information from children under 13. If we become
                aware that we have collected personal information from a child under 13, we
                will take steps to delete such information.
              </p>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2
                className="text-xl font-bold text-white mb-3 uppercase"
                style={{ fontFamily: "var(--font-saira-condensed)" }}
              >
                Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of
                any changes by posting the new Privacy Policy on this page and updating the
                &quot;Last Updated&quot; date.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2
                className="text-xl font-bold text-white mb-3 uppercase"
                style={{ fontFamily: "var(--font-saira-condensed)" }}
              >
                Contact Us
              </h2>
              <p className="mb-4">
                If you have questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-[#252525] rounded-xl p-6 border border-[#333]">
                <p className="mb-2">
                  <strong className="text-white">Cleo+</strong>
                </p>
                <p className="mt-4">
                  Email:{" "}
                  <a
                    href="mailto:itscleoplus@gmail.com"
                    className="text-[#FF1482] hover:underline"
                  >
                    itscleoplus@gmail.com
                  </a>
                </p>
              </div>
            </section>
          </div>

          {/* Back to Home Button */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-[#FF1482] text-white font-bold rounded-full hover:bg-[#E01070] transition-colors"
              style={{ fontFamily: "var(--font-saira-condensed)" }}
            >
              BACK TO HOME
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-[#333]">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <Link
            href="/privacy"
            className="text-[#FF1482]"
          >
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-gray-300 transition-colors">
            Terms of Service
          </Link>
          <Link href="/about" className="hover:text-gray-300 transition-colors">
            About & Contact
          </Link>
          <Link href="/optin" className="hover:text-gray-300 transition-colors">
            SMS Opt-In
          </Link>
          <Link href="/" className="hover:text-gray-300 transition-colors">
            Home
          </Link>
        </div>
        <p className="text-center text-gray-600 text-xs mt-4">
          © {new Date().getFullYear()} CLEO+. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

