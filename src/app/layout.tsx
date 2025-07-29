// src/app/layout.tsx

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>My App</title>
      </head>

      <body className="min-h-screen flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
