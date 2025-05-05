import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title = "defaultTitle" }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>{title}</title>
      </head>

      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
