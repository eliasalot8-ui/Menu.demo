import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ProductCard from '../components/ProductCard';
import { getProductsByCategory } from '../data/menu';
import './MenuSection.css';

gsap.registerPlugin(ScrollTrigger);

const WRAP_CLASS = {
  carousel: 'menu-section__items menu-section__items--carousel hide-scrollbar',
  'overlay-grid': 'menu-section__items menu-section__items--grid',
  editorial: 'menu-section__items menu-section__items--stack',
  feature: 'menu-section__items menu-section__items--feature',
  'soft-grid': 'menu-section__items menu-section__items--grid',
  'minimal-list': 'menu-section__items menu-section__items--stack',
  'night-editorial': 'menu-section__items menu-section__items--grid',
};

export default function MenuSection({ category, onOpenProduct }) {
  const products = getProductsByCategory(category.id);
  const ref = useRef(null);
  const isDark = category.mood === 'night';

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = ref.current.querySelectorAll('.p-card');
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
      gsap.fromTo(
        ref.current.querySelectorAll('.menu-section__heading > *'),
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.06,
          scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id={category.id}
      ref={ref}
      className={`menu-section menu-section--${category.layout} ${isDark ? 'menu-section--dark' : ''}`}
    >
      <div className="container">
        <header className="menu-section__heading">
          <span className="eyebrow">{category.kicker}</span>
          <h2 className="headline menu-section__title">{category.label}</h2>
          <p className="menu-section__desc">{category.description}</p>
        </header>
        <div className={WRAP_CLASS[category.layout]}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              mood={category.mood}
              variant={category.layout}
              onOpen={onOpenProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
