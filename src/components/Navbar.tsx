'use client';

import Link from 'next/link';
import { useCart } from './providers/CartContext';
import styles from './Navbar.module.css';

export default function Navbar() {
    const { toggleCart, items } = useCart();
    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className={`${styles.navbar} glass`}>
            <Link href="/" className={styles.logo}>
                NEXUS
            </Link>
            <div className={styles.navLinks}>
                <Link href="/" className={styles.link}>Store</Link>
                <Link href="/admin" className={styles.link}>Admin Dashboard</Link>
                <button
                    onClick={toggleCart}
                    className={styles.link}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    Cart
                    {cartCount > 0 && (
                        <span style={{
                            background: 'var(--primary)',
                            color: 'white',
                            fontSize: '0.75rem',
                            padding: '0.1rem 0.4rem',
                            borderRadius: '10px'
                        }}>
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>
        </nav>
    );
}
