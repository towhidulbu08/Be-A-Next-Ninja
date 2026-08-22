import "./globals.css";
import { DM_Sans, Outfit } from "next/font/google";
import { cn } from "@/lib/utils";

const outfitHeading = Outfit({subsets:['latin'],variable:'--font-heading'});

const dmSans = DM_Sans({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", "font-sans", dmSans.variable, outfitHeading.variable)}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
