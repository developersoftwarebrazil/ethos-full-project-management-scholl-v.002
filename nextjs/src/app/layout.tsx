import "./globals.css";
import { AuthProvider } from "@/contexts/ AuthContext";
import type { Metadata } from "next";
import { Inter, Chathura, Open_Sans, Roboto } from "next/font/google";
import { Navbar } from "../components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const chathura = Chathura({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-chathura",
});
const openSans = Open_Sans({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-open-sans",
});
const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "ETHOS",
  description: "ETHOS - Full Project Management School",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} ${chathura.variable} ${openSans.variable} ${roboto.variable} bg-primary`}
      >
        {/* <Navbar /> */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
