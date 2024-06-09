import { Inter } from "next/font/google";
import "./globals.css";
import Header from './components/navbar.jsx';
import Footer from './components/footer.jsx';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fibrebond Industries",
  description: "India's Largest Vegan Leather Belt Manufacturer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        {/* <Header /> */}
      <body className={inter.className}>
        {children}
        </body>
        {/* <Footer /> */}
    </html>
  );
}
