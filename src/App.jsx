import { useState } from "react";
import { useLenis } from "./hooks/useLenis";
import { useMediaFlags } from "./hooks/useMediaFlags";
import { CursorProvider } from "./lib/CursorContext";
import { ScrollTrigger } from "./lib/gsap";

import Loader from "./components/Loader/Loader";
import CustomCursor from "./components/Cursor/CustomCursor";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Manifesto from "./components/Manifesto/Manifesto";
import ProductShowcase from "./components/ProductShowcase/ProductShowcase";
import EditorialGallery from "./components/EditorialGallery/EditorialGallery";
import HorizontalCollection from "./components/HorizontalCollection/HorizontalCollection";
import Materials from "./components/Materials/Materials";
import StorySection from "./components/StorySection/StorySection";
import FinalCTA from "./components/FinalCTA/FinalCTA";
import Footer from "./components/Footer/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const { isTouch, reduceMotion, isNarrow } = useMediaFlags();

  useLenis({ enabled: !loading });

  const handleLoaderComplete = () => {
    setLoading(false);
    setReady(true);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  return (
    <CursorProvider>
      {loading && <Loader onComplete={handleLoaderComplete} />}
      {!isTouch && <CustomCursor />}

      <Navbar />

      <main className="noma-app">
        <Hero ready={ready} reduceMotion={reduceMotion} isTouch={isTouch} isNarrow={isNarrow} />
        <Manifesto />
        <ProductShowcase reduceMotion={reduceMotion} isNarrow={isNarrow} />
        <EditorialGallery reduceMotion={reduceMotion} />
        <HorizontalCollection reduceMotion={reduceMotion} isNarrow={isNarrow} />
        <Materials />
        <StorySection reduceMotion={reduceMotion} />
        <FinalCTA reduceMotion={reduceMotion} isTouch={isTouch} />
        <Footer />
      </main>
    </CursorProvider>
  );
}
