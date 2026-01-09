import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={`${styles.navbar} glass`}>
            <Link href="/" className={styles.logo}>
                NEXUS
            </Link>
            <div className={styles.navLinks}>
                <Link href="/" className={styles.link}>Store</Link>
                <Link href="/admin" className={styles.link}>Admin Dashboard</Link>
            </div>
        </nav>
    );
}
