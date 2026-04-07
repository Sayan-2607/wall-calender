import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Folio — Wall Calendar",
  description:
    "A polished interactive wall calendar with day-range selection, integrated notes, and theme switching.",
  keywords: ["calendar", "wall calendar", "planner", "notes", "date range"],
  authors: [{ name: "Folio Calendar" }],
  openGraph: {
    title: "Folio — Wall Calendar",
    description: "A polished interactive wall calendar component.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ECEDF0",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
