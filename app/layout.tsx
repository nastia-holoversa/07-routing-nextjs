import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Manage your personal notes with ease",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal} {}
          </main>
          <Footer />
          <Toaster position="top-right" reverseOrder={false} />
        </TanStackProvider>
      </body>
    </html>
  );
}
