import SmartImage from './art/SmartImage';
import Badge from './Badge';
import { formatPrice } from '../utils/format';
import { productImageCandidates } from '../config/images';
import './ProductCard.css';

export default function ProductCard({ product, mood, variant, onOpen }) {
  return (
    <button
      className={`p-card p-card--${variant} ${product.featured ? 'p-card--featured' : ''}`}
      onClick={() => onOpen(product)}
    >
      <span className="p-card__media">
        <SmartImage
          sources={productImageCandidates(product)}
          art={product.art}
          mood={mood}
          alt={product.name}
        />
        {product.badges?.length > 0 && (
          <span className="p-card__badges">
            {product.badges.map((b) => (
              <Badge key={b} type={b} />
            ))}
          </span>
        )}
      </span>
      <span className="p-card__body">
        <span className="p-card__top">
          <span className="p-card__name">{product.name}</span>
          <span className="p-card__price">{formatPrice(product.price)}</span>
        </span>
        {product.description && <span className="p-card__desc">{product.description}</span>}
      </span>
    </button>
  );
}
