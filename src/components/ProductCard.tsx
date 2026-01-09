import { Product } from '@/lib/data';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                {/* Using standard img for simplicity with external URLs, in prod use next/image with configured domains */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.image} alt={product.name} className={styles.image} />
            </div>
            <div className={styles.content}>
                <span className={styles.category}>{product.category}</span>
                <h3 className={styles.title}>{product.name}</h3>
                <p className={styles.description}>{product.description}</p>
                <div className={styles.footer}>
                    <span className={styles.price}>${product.price.toFixed(2)}</span>
                    <button className={styles.buyBtn}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}
