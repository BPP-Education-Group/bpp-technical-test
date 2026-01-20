import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Course Registration",
  description: "Course Registration System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </head>
      <body>{children}</body>
    </html>
  );
}
