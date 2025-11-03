// app/layout.tsx
import "./globals.css";
import React from "react";

export const metadata = {
  title: "Notes App",
  description: "Simple Next.js notes app (in-memory)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-background text-foreground">
          <div className="container p-4">{children}</div>
        </main>
      </body>
    </html>
  );
}
