import type { Metadata } from "next";
import { Geist_Mono, Saira_Condensed, Saira } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { AudioProvider } from "./context/AudioContext";

// Geist Mono - used for code/monospace text (STOP, HELP keywords)
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Saira Condensed - used for headings with font-black, font-bold, font-medium
// Only load the weights actually used in the codebase
const sairaCondensed = Saira_Condensed({
  variable: "--font-saira-condensed",
  subsets: ["latin"],
  weight: ["300", "500", "600", "700", "900"], // light, medium, semibold, bold, black
});

// Saira - used for dashboard UI text
// Only load the weights actually used
const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // normal, medium, semibold, bold
});

// Helvetica Neue - used for body text
// Only load the weights actually used (light and normal - no italics needed)
const helveticaNeue = localFont({
  variable: "--font-helvetica-neue",
  src: [
    {
      path: "../public/fonts/HelveticaNeueLight.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/HelveticaNeueRoman.woff2",
      weight: "400",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "CLEO+",
  description: "CLEO+",
  icons: {
    icon: "/CleoLogo.png",
    shortcut: "/CleoLogo.png",
    apple: "/CleoLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sairaCondensed.variable} ${saira.variable} ${helveticaNeue.variable} ${geistMono.variable} antialiased`}
      >
        <AudioProvider>{children}</AudioProvider>
      </body>
    </html>
  );
}
