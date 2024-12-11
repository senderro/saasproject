import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

export const metadata = {
  title: "XRPL Nodes SaaS",
  description: "Run XRP nodes in. One click. We provide scalable rippled nodes on cloud.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white antialiased transition-colors duration-200">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}