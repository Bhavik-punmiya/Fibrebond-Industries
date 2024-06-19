import { Inter } from "next/font/google";
import "./globals.css";
import Header from './components/navbar.jsx';
import Footer from './components/Footer.jsx';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fibrebond Industries",
  description: "India's Largest Vegan Leather Belt Manufacturer",
};

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <body className={inter.className}>
        {/* <Header /> */}
        {children}
        </body>
        {/* <Footer /> */}
    </html>

  );
}
