import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/data';

// Force dynamic since we are reading from file that changes
export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '4rem' }}>
        <div className="container">
          <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: 800,
              marginBottom: '1rem',
              letterSpacing: '-1px'
            }}>
              New Arrivals
            </h1>
            <p style={{ color: '#888', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
              Discover our latest collection of premium digital artifacts and apparel.
            </p>
          </header>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {products.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>
              <p>No products found. Visit the admin dashboard to add some.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
