import { BADGE_LABELS } from '../utils/format';
import './Badge.css';

export default function Badge({ type }) {
  return <span className={`badge badge--${type}`}>{BADGE_LABELS[type] ?? type}</span>;
}
