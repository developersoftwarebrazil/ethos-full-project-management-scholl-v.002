import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar/Navbar";
import NavbarDashboard from "@/components/Navbar/NavbarDashboard";
import Menu from "@/components/Menu/Menu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  
    <div className="h-fit flex bg-white">
      {/* LEFT */}
      <div className="w-[16%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-4"
        >
          <Image src="/logo-5.png" alt="Logo" width={32} height={32} />
          <span className="hidden, lg:block font-semibold text-blue-600">
          <div  className="hidden md:flex items-center gap-2">
                  <Image
                    src="/trademark.svg"
                    alt="Logo"
                    width={100}
                    height={200}
                    className="hidden lg:block"
                  />
                </div>
          </span>
        </Link>
        <Menu />
      </div>
      {/* RIGHT */}
      <div className="w-[84%] md:w-[92%] flex flex-col bg-[#F7F8FA] overflow-scroll">
        <NavbarDashboard />
        {children}
      </div>
    </div>
  );
}

