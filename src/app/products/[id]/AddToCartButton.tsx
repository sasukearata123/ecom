'use client';

import { Product } from '@/lib/data';
import { useCart } from '@/components/providers/CartContext';
import { useState } from 'react';

export default function AddToCartButton({ product }: { product: Product }) {
    const { addItem } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAdd = () => {
        addItem(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAdd}
            className="btn btn-primary"
            style={{
                width: '100%',
                fontSize: '1.1rem',
                padding: '1rem',
                backgroundColor: isAdded ? 'var(--success)' : 'var(--primary)',
                boxShadow: isAdded ? '0 0 20px rgba(16, 185, 129, 0.4)' : undefined
            }}
        >
            {isAdded ? 'Added to Cart ✓' : 'Add to Cart'}
        </button>
    );
}
