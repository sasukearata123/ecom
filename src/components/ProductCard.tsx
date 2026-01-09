'use client';

import { Product } from '@/lib/data';
import { useCart } from './providers/CartContext';
import styles from './ProductCard.module.css';
import Link from 'next/link';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart();

    return (
        <div className={styles.card}>
            <Link href={`/products/${product.id}`} className={styles.imageContainer}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.image} alt={product.name} className={styles.image} />
            </Link>
            <div className={styles.content}>
                <span className={styles.category}>{product.category}</span>
                <Link href={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                    <h3 className={styles.title}>{product.name}</h3>
                </Link>
                <p className={styles.description}>{product.description}</p>
                <div className={styles.footer}>
                    <span className={styles.price}>${product.price.toFixed(2)}</span>
                    <button onClick={() => addItem(product)} className={styles.buyBtn}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}
