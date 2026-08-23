import { Navbar } from "@/components/shared/navbar";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { DM_Sans, Outfit } from "next/font/google";
import "./globals.css";

const outfitHeading = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
});

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        dmSans.variable,
        outfitHeading.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
