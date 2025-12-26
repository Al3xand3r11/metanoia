"use client";

import Image from "next/image";
import Link from "next/link";
import CleoLogo from "@/public/CleoLogo.png";
import CleoDark from "@/public/CleoDark.webp";
import { FaYoutube, FaSpotify, FaInstagram, FaTiktok, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function AboutPage() {
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
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
            <div>
              <h1
                className="text-4xl md:text-5xl font-black text-white mb-4 uppercase"
                style={{ fontFamily: "var(--font-saira-condensed)" }}
              >
                About Cleo+
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Cleo+ is a Los Angeles-based artist creating music that speaks to moments
                of transformation and personal growth. The name &quot;Cleo+&quot; represents more
                than just an artist — it&apos;s a movement celebrating the journey of becoming.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Through the Metanoia project, we invite fans to share their own stories
                of change — those pivotal moments when everything shifted. &quot;Metanoia&quot;
                (meh-tuh-NOY-uh) means a profound transformation of the mind and heart,
                a turning point back to your light.
              </p>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src={CleoDark}
                alt="Cleo+"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
            </div>
          </div>

          {/* The Metanoia Experience */}
          <section className="mb-16">
            <h2
              className="text-2xl md:text-3xl font-black text-white mb-6 uppercase"
              style={{ fontFamily: "var(--font-saira-condensed)" }}
            >
              The Metanoia Experience
            </h2>
            <div className="bg-[#252525] rounded-2xl p-8 border border-[#333]">
              <p className="text-gray-300 leading-relaxed mb-6">
                We&apos;re running a campaign to hear fans&apos; moments of metanoia from this year —
                to understand how they transformed in times of hardship. Through our SMS
                experience, fans can share their stories of growth and read the anonymized
                moments of others who have walked similar paths.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Every story matters. Every transformation counts. By sharing your moment,
                you become part of a collective journey of healing and growth.
              </p>
              <div className="mt-8">
                <Link
                  href="/messages"
                  className="inline-block px-8 py-3 bg-[#FF1482] text-white font-bold rounded-full hover:bg-[#E01070] transition-colors"
                  style={{ fontFamily: "var(--font-saira-condensed)" }}
                >
                  EXPLORE MOMENTS
                </Link>
              </div>
            </div>
          </section>

          {/* Connect Section */}
          <section className="mb-16">
            <h2
              className="text-2xl md:text-3xl font-black text-white mb-6 uppercase"
              style={{ fontFamily: "var(--font-saira-condensed)" }}
            >
              Connect With Us
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Social Links */}
              <div className="bg-[#252525] rounded-2xl p-8 border border-[#333]">
                <h3
                  className="text-lg font-bold text-white mb-4 uppercase"
                  style={{ fontFamily: "var(--font-saira-condensed)" }}
                >
                  Follow Cleo+
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://www.youtube.com/@itscleoplus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-[#FF1482] transition-colors"
                  >
                    <FaYoutube className="h-6 w-6" />
                    <span>YouTube</span>
                  </a>
                  <a
                    href="https://open.spotify.com/artist/2eg5AuNNcwQYMtoZQNTH4p"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-[#FF1482] transition-colors"
                  >
                    <FaSpotify className="h-6 w-6" />
                    <span>Spotify</span>
                  </a>
                  <a
                    href="https://www.instagram.com/itscleoplus/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-[#FF1482] transition-colors"
                  >
                    <FaInstagram className="h-6 w-6" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://www.tiktok.com/@itscleoplus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-[#FF1482] transition-colors"
                  >
                    <FaTiktok className="h-6 w-6" />
                    <span>TikTok</span>
                  </a>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-[#252525] rounded-2xl p-8 border border-[#333]">
                <h3
                  className="text-lg font-bold text-white mb-4 uppercase"
                  style={{ fontFamily: "var(--font-saira-condensed)" }}
                >
                  Contact
                </h3>
                <div className="space-y-4">
                  <a
                    href="mailto:itscleoplus@gmail.com"
                    className="flex items-center gap-3 text-gray-300 hover:text-[#FF1482] transition-colors"
                  >
                    <FaEnvelope className="h-5 w-5 flex-shrink-0" />
                    <span>itscleoplus@gmail.com</span>
                  </a>
                  <a
                    href="tel:+15044152068"
                    className="flex items-center gap-3 text-gray-300 hover:text-[#FF1482] transition-colors"
                  >
                    <FaPhone className="h-5 w-5 flex-shrink-0" />
                    <span>+1 (504) 415-2068</span>
                  </a>
                  <div className="flex items-start gap-3 text-gray-300">
                    <FaMapMarkerAlt className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span>
                      1331 N Cahuenga Blvd, Unit 5301
                      <br />
                      Los Angeles, CA 90028
                      <br />
                      United States
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SMS Opt-In CTA */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-[#FF1482]/20 to-[#FF1482]/5 rounded-2xl p-8 border border-[#FF1482]/30 text-center">
              <h2
                className="text-2xl md:text-3xl font-black text-white mb-4 uppercase"
                style={{ fontFamily: "var(--font-saira-condensed)" }}
              >
                Join the Experience
              </h2>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                Text <span className="font-bold text-white">START</span> to our number
                to receive updates and share your own metanoia moment. Be part of the
                journey.
              </p>
              <Link
                href="/optin"
                className="inline-block px-8 py-3 bg-[#FF1482] text-white font-bold rounded-full hover:bg-[#E01070] transition-colors"
                style={{ fontFamily: "var(--font-saira-condensed)" }}
              >
                LEARN ABOUT SMS OPT-IN
              </Link>
            </div>
          </section>

          {/* Business Information */}
          <section>
            <h2
              className="text-2xl md:text-3xl font-black text-white mb-6 uppercase"
              style={{ fontFamily: "var(--font-saira-condensed)" }}
            >
              Business Information
            </h2>
            <div className="bg-[#252525] rounded-2xl p-8 border border-[#333]">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-medium mb-2">Business Name</h3>
                  <p className="text-gray-400">Cleo+</p>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-2">Website</h3>
                  <p className="text-gray-400">
                    <a
                      href="https://www.itscleoplus.com"
                      className="text-[#FF1482] hover:underline"
                    >
                      www.itscleoplus.com
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-2">Location</h3>
                  <p className="text-gray-400">Los Angeles, California, USA</p>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-2">Industry</h3>
                  <p className="text-gray-400">Music & Entertainment</p>
                </div>
              </div>
            </div>
          </section>

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
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <Link href="/privacy" className="hover:text-gray-300 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-gray-300 transition-colors">
            Terms of Service
          </Link>
          <Link
            href="/about"
            className="text-[#FF1482]"
          >
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

