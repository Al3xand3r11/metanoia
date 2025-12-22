"use client";

import Image from "next/image";
import Link from "next/link";
import CleoLogo from "@/public/CleoLogo.png";

export default function OptInPage() {
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
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-lg w-full">
          <h1
            className="text-4xl md:text-5xl font-black text-white mb-4 uppercase"
            style={{ fontFamily: "var(--font-saira-condensed)" }}
          >
            SMS Opt-In Disclosure
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            By texting CLEO+, you have opted in to receive messages from us.
            Below are the details of what you&apos;ve agreed to.
          </p>

          {/* Program Details Box */}
          <div className="bg-[#252525] rounded-xl p-6 border border-[#333]">
            <h2
              className="text-lg font-bold text-white mb-4 uppercase"
              style={{ fontFamily: "var(--font-saira-condensed)" }}
            >
              SMS Program Details
            </h2>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-[#FF1482] mt-0.5">•</span>
                <span>
                  <strong className="text-gray-300">Program:</strong> CLEO+
                  Dashboard & Experience updates
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF1482] mt-0.5">•</span>
                <span>
                  <strong className="text-gray-300">Message Frequency:</strong>{" "}
                  Varies; typically 1-5 messages per week
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF1482] mt-0.5">•</span>
                <span>
                  <strong className="text-gray-300">
                    Message & Data Rates:
                  </strong>{" "}
                  Standard message and data rates may apply
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF1482] mt-0.5">•</span>
                <span>
                  <strong className="text-gray-300">Opt-Out:</strong> Reply{" "}
                  <span className="font-mono bg-[#333] px-1.5 py-0.5 rounded">
                    STOP
                  </span>{" "}
                  at any time to unsubscribe
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF1482] mt-0.5">•</span>
                <span>
                  <strong className="text-gray-300">Help:</strong> Reply{" "}
                  <span className="font-mono bg-[#333] px-1.5 py-0.5 rounded">
                    HELP
                  </span>{" "}
                  for assistance
                </span>
              </li>
            </ul>
          </div>

          {/* Consent Information */}
          <div className="mt-6 bg-[#252525] rounded-xl p-6 border border-[#333]">
            <h2
              className="text-lg font-bold text-white mb-4 uppercase"
              style={{ fontFamily: "var(--font-saira-condensed)" }}
            >
              Your Consent
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              By texting CLEO+, you consented to receive recurring automated
              text messages at the phone number you provided. Consent is not a
              condition of purchase. You can opt out at any time by replying
              STOP.
            </p>
          </div>

          {/* Additional Disclosures */}
          <div className="mt-8 pt-8 border-t border-[#333]">
            <h3 className="text-gray-300 font-medium mb-3">
              Additional Information
            </h3>
            <div className="text-gray-500 text-xs space-y-2">
              <p>
                Your phone number and messaging preferences are only used for
                the CLEO+ dashboard and related communications. We do not share
                your phone number with third parties for marketing purposes.
              </p>
              <p>
                Text messages are sent via an automatic telephone dialing
                system. Message frequency varies based on your interactions with
                the CLEO+ platform.
              </p>
              <p>
                For questions or support, contact us at{" "}
                <a
                  href="mailto:support@cleoplus.com"
                  className="text-[#FF1482] hover:underline"
                >
                  support@cleoplus.com
                </a>
              </p>
            </div>
          </div>

          {/* Carrier Disclaimer */}
          <p className="text-gray-600 text-xs mt-6 text-center">
            Carriers are not liable for delayed or undelivered messages.
          </p>

          {/* Back to Home Button */}
          <div className="mt-8 text-center">
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
        <div className="max-w-lg mx-auto flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <Link
            href="/privacy"
            className="hover:text-gray-300 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-gray-300 transition-colors">
            Terms of Service
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
