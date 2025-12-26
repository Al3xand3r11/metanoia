"use client";

import Image from "next/image";
import Link from "next/link";
import CleoLogo from "@/public/CleoLogo.png";

export default function TermsOfServicePage() {
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
            Terms of Service
          </h1>
          <p className="text-gray-400 text-sm mb-8">
            Last Updated: December 26, 2024
          </p>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            {/* Agreement */}
            <section>
              <h2
                className="text-xl font-bold text-white mb-3 uppercase"
                style={{ fontFamily: "var(--font-saira-condensed)" }}
              >
                Agreement to Terms
              </h2>
              <p>
                By accessing or using the Cleo+ website at{" "}
                <a
                  href="https://www.itscleoplus.com"
                  className="text-[#FF1482] hover:underline"
                >
                  www.itscleoplus.com
                </a>{" "}
                and participating in our SMS messaging services, you agree to be bound by
                these Terms of Service. If you do not agree to these terms, please do not
                use our services.
              </p>
            </section>

            {/* Description of Services */}
            <section>
              <h2
                className="text-xl font-bold text-white mb-3 uppercase"
                style={{ fontFamily: "var(--font-saira-condensed)" }}
              >
                Description of Services
              </h2>
              <p className="mb-4">Cleo+ provides:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  A website showcasing Cleo+ music, content, and the Metanoia experience
                </li>
                <li>
                  An SMS messaging service for fans to receive updates and share their
                  personal moments of transformation
                </li>
                <li>
                  A platform to submit and view anonymized stories of personal growth and
                  metanoia moments
                </li>
              </ul>
            </section>

            {/* SMS Terms */}
            <section>
              <h2
                className="text-xl font-bold text-white mb-3 uppercase"
                style={{ fontFamily: "var(--font-saira-condensed)" }}
              >
                SMS Messaging Terms
              </h2>
              <p className="mb-4">
                By opting in to our SMS program, you acknowledge and agree that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  You consent to receive recurring automated marketing and informational
                  text messages from Cleo+
                </li>
                <li>
                  Message frequency varies; you may receive up to 5 messages per week
                </li>
                <li>
                  Standard message and data rates from your mobile carrier may apply
                </li>
                <li>
                  Consent is not a condition of any purchase
                </li>
                <li>
                  You can opt out at any time by replying STOP to any message
                </li>
                <li>
                  You can get help by replying HELP to any message
                </li>
              </ul>
            </section>

            {/* User Submissions */}
            <section>
              <h2
                className="text-xl font-bold text-white mb-3 uppercase"
                style={{ fontFamily: "var(--font-saira-condensed)" }}
              >
                User Submissions
              </h2>
              <p className="mb-4">
                When you submit content through our website or SMS service (including
                metanoia moments and personal stories):
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  You grant Cleo+ a non-exclusive, royalty-free, worldwide license to use,
                  display, and share your submission in an anonymized format
                </li>
                <li>
                  You represent that your submission is original and does not infringe on
                  any third-party rights
                </li>
                <li>
                  Your submission will be displayed anonymously on our website
                </li>
                <li>
                  We reserve the right to review, edit, or remove any submission at our
                  discretion
                </li>
              </ul>
            </section>

            {/* Acceptable Use */}
            <section>
              <h2
                className="text-xl font-bold text-white mb-3 uppercase"
                style={{ fontFamily: "var(--font-saira-condensed)" }}
              >
                Acceptable Use
              </h2>
              <p className="mb-4">You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use our services for any unlawful purpose</li>
                <li>Submit content that is offensive, harmful, or inappropriate</li>
                <li>Attempt to interfere with the proper functioning of our services</li>
                <li>Impersonate any person or entity</li>
                <li>Collect or harvest information about other users</li>
                <li>Use automated systems to access our services without permission</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2
                className="text-xl font-bold text-white mb-3 uppercase"
                style={{ fontFamily: "var(--font-saira-condensed)" }}
              >
                Intellectual Property
              </h2>
              <p>
                All content on the Cleo+ website, including but not limited to text,
                graphics, logos, images, audio, video, and software, is the property of
                Cleo+ or its licensors and is protected by copyright, trademark, and other
                intellectual property laws. You may not reproduce, distribute, modify, or
                create derivative works from our content without express written permission.
              </p>
            </section>

            {/* Disclaimer */}
            <section>
              <h2
                className="text-xl font-bold text-white mb-3 uppercase"
                style={{ fontFamily: "var(--font-saira-condensed)" }}
              >
                Disclaimer of Warranties
              </h2>
              <p>
                Our services are provided &quot;as is&quot; and &quot;as available&quot; without warranties
                of any kind, either express or implied. We do not warrant that our services
                will be uninterrupted, error-free, or secure. Mobile carriers are not
                responsible for delayed or undelivered messages.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2
                className="text-xl font-bold text-white mb-3 uppercase"
                style={{ fontFamily: "var(--font-saira-condensed)" }}
              >
                Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, Cleo+ shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages arising
                from your use of our services. Our total liability for any claims shall not
                exceed the amount you paid us (if any) in the twelve months preceding the
                claim.
              </p>
            </section>

            {/* Indemnification */}
            <section>
              <h2
                className="text-xl font-bold text-white mb-3 uppercase"
                style={{ fontFamily: "var(--font-saira-condensed)" }}
              >
                Indemnification
              </h2>
              <p>
                You agree to indemnify and hold harmless Cleo+ and its affiliates,
                officers, agents, and employees from any claims, damages, or expenses
                arising from your use of our services or violation of these Terms.
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2
                className="text-xl font-bold text-white mb-3 uppercase"
                style={{ fontFamily: "var(--font-saira-condensed)" }}
              >
                Termination
              </h2>
              <p>
                We may terminate or suspend your access to our services at any time,
                without prior notice, for conduct that we believe violates these Terms or
                is harmful to other users, us, or third parties. You may opt out of SMS
                messages at any time by replying STOP.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2
                className="text-xl font-bold text-white mb-3 uppercase"
                style={{ fontFamily: "var(--font-saira-condensed)" }}
              >
                Governing Law
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws
                of the State of California, without regard to its conflict of law
                provisions. Any disputes shall be resolved in the courts of Los Angeles
                County, California.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2
                className="text-xl font-bold text-white mb-3 uppercase"
                style={{ fontFamily: "var(--font-saira-condensed)" }}
              >
                Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be
                effective upon posting to this page. Your continued use of our services
                after any changes constitutes acceptance of the new Terms.
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
                If you have questions about these Terms, please contact us:
              </p>
              <div className="bg-[#252525] rounded-xl p-6 border border-[#333]">
                <p className="mb-2">
                  <strong className="text-white">Cleo+</strong>
                </p>
                <p>1331 N Cahuenga Blvd, Unit 5301</p>
                <p>Los Angeles, CA 90028</p>
                <p>United States</p>
                <p className="mt-4">
                  Email:{" "}
                  <a
                    href="mailto:itscleoplus@gmail.com"
                    className="text-[#FF1482] hover:underline"
                  >
                    itscleoplus@gmail.com
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a
                    href="tel:+15044152068"
                    className="text-[#FF1482] hover:underline"
                  >
                    +1 (504) 415-2068
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
          <Link href="/privacy" className="hover:text-gray-300 transition-colors">
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-[#FF1482]"
          >
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

