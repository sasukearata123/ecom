'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
}

export default function AdminPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data.products || []);
        } catch (error) {
            console.error('Failed to fetch products', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setFormData({ name: '', description: '', price: '', category: '', image: '' });
                fetchProducts(); // Refresh list
                alert('Product added successfully!');
            } else {
                alert('Failed to add product');
            }
        } catch (error) {
            console.error(error);
            alert('Error adding product');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Admin Dashboard</h1>
            </header>

            <div className={styles.grid}>
                {/* Add Product Form */}
                <div className={styles.panel}>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Add New Product</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Product Name</label>
                            <input
                                className={styles.input}
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Category</label>
                            <input
                                className={styles.input}
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                list="categories"
                            />
                            <datalist id="categories">
                                <option value="Apparel" />
                                <option value="Accessories" />
                                <option value="Digital" />
                            </datalist>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Price ($)</label>
                            <input
                                className={styles.input}
                                name="price"
                                type="number"
                                step="any"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Image URL</label>
                            <input
                                className={styles.input}
                                name="image"
                                type="url"
                                placeholder="https://..."
                                value={formData.image}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Description</label>
                            <textarea
                                className={styles.input}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%' }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Adding...' : 'Add Product'}
                        </button>
                    </form>
                </div>

                {/* Product List */}
                <div className={styles.panel}>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Existing Inventory</h2>
                    {isLoading ? (
                        <p>Loading inventory...</p>
                    ) : (
                        <div className={styles.productList}>
                            {products.map(product => (
                                <div key={product.id} className={styles.productItem}>
                                    <img src={product.image} alt={product.name} className={styles.productImage} />
                                    <div className={styles.productInfo}>
                                        <div style={{ fontWeight: '600' }}>{product.name}</div>
                                        <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{product.category}</div>
                                    </div>
                                    <div className={styles.productPrice}>${product.price}</div>
                                </div>
                            ))}
                            {products.length === 0 && <p style={{ opacity: 0.5 }}>No products yet.</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
