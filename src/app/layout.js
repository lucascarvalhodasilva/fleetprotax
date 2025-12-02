import { Geist, Geist_Mono } from "next/font/google";
import "./main.css";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fleet-Steuer",
  description: "Fleet-Steuer – App zur Erfassung von steuerlichen Ausgaben",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background min-h-screen pb-20`}
      >
        <AppProvider>
          <Navbar />
          <main>
            {children}
          </main>
          <BottomNav />
        </AppProvider>
      </body>
    </html>
  );
}
