import { useRef, useState } from 'react';
import { CartProvider } from './context/CartContext';
import { useActiveSection } from './hooks/useActiveSection';
import { useScrollProgress } from './hooks/useScrollProgress';
import { CATEGORIES } from './data/menu';
import { skipIntroOnRevisit } from './config/business';
import { hasSeenIntro, markIntroSeen } from './utils/introSession';
import DayNightLayer from './components/DayNightLayer';
import Navbar from './components/Navbar';
import CategoryNav from './components/CategoryNav';
import CartButton from './components/CartButton';
import CartDrawer from './components/CartDrawer';
import ProductModal from './components/ProductModal';
import Intro from './sections/Intro';
import Hero from './sections/Hero';
import MenuSection from './sections/MenuSection';
import Footer from './sections/Footer';

const CATEGORY_IDS = CATEGORIES.map((c) => c.id);

export default function App() {
  const [introDone, setIntroDone] = useState(() => skipIntroOnRevisit && hasSeenIntro());
  const [activeProduct, setActiveProduct] = useState(null);
  const menuRef = useRef(null);

  const activeId = useActiveSection(CATEGORY_IDS);
  const progress = useScrollProgress(menuRef);
  const isNight = activeId === 'bar' || progress > 0.82;

  function handleIntroDone() {
    markIntroSeen();
    setIntroDone(true);
  }

  return (
    <CartProvider>
      {!introDone && <Intro onDone={handleIntroDone} />}
      <DayNightLayer progress={progress} />
      <Navbar dark={isNight} />
      <CategoryNav activeId={activeId} dark={isNight} />
      <Hero />
      <main ref={menuRef}>
        {CATEGORIES.map((category) => (
          <MenuSection key={category.id} category={category} onOpenProduct={setActiveProduct} />
        ))}
      </main>
      <Footer />
      <CartButton />
      <CartDrawer />
      {activeProduct && <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />}
    </CartProvider>
  );
}
