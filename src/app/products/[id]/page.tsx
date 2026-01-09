import { getProductById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import AddToCartButton from './AddToCartButton'; // Client component for interactivity
import Link from 'next/link';

interface ProductPageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductPage(props: ProductPageProps) {
    const params = await props.params;
    const product = await getProductById(params.id);

    if (!product) {
        return notFound();
    }

    return (
        <>
            <Navbar />
            <main style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '4rem' }} className="container">
                <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '2rem', opacity: 0.6, fontSize: '0.9rem' }}>
                    ← Back to Store
                </Link>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'start' }}>
                    {/* Image Section */}
                    <div style={{
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        border: '1px solid var(--border)',
                        background: '#000',
                        aspectRatio: '1/1'
                    }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>

                    {/* Info Section */}
                    <div>
                        <span style={{
                            color: 'var(--primary)',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            fontSize: '0.9rem'
                        }}>
                            {product.category}
                        </span>

                        <h1 style={{
                            fontSize: '3rem',
                            fontWeight: '800',
                            margin: '1rem 0',
                            lineHeight: 1.1
                        }}>
                            {product.name}
                        </h1>

                        <p style={{
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            color: '#fff',
                            marginBottom: '2rem'
                        }}>
                            ${product.price.toFixed(2)}
                        </p>

                        <div style={{
                            padding: '2rem',
                            background: 'var(--surface)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border)',
                            marginBottom: '2rem'
                        }}>
                            <p style={{ lineHeight: 1.6, color: '#ccc' }}>
                                {product.description}
                            </p>
                        </div>

                        <AddToCartButton product={product} />
                    </div>
                </div>
            </main>
        </>
    );
}
