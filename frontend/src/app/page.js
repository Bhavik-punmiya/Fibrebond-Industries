
import CarouselComponent from "./components/carousel";
import ProfessionalServices from "./components/hero";
import WhatweOffer from "./components/whatweoffer";
import Choose from "./components/choose";
import StatsSection from "./components/StatsSection";
import Footer from './components/Footer.jsx';
import FeatureComponent from "./components/Features";
import  ProductDisplay from "./components/ProductDisplay";
import Header from './components/navbar.jsx';
export default function Home() {
  return (
    <div>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-12">
        {/* <CarouselComponent /> */}
        <ProfessionalServices />
        <WhatweOffer />
        <FeatureComponent />
        
        <ProductDisplay />
        <Choose />

      </main>
      <StatsSection />
      <main className="flex  flex-col  justify-between p-2">
        <Footer />
      </main>
    </div>
  );
}
