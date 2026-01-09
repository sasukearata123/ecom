'use client';

import { useState } from 'react';
import { useCart } from '@/components/providers/CartContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function CheckoutPage() {
    const { items, total, clearCart } = useCart();
    const router = useRouter();
    const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
    });

    if (items.length === 0 && status !== 'success') {
        return (
            <>
                <Navbar />
                <div style={{ paddingTop: '100px', textAlign: 'center' }}>
                    <h1>Your cart is empty</h1>
                </div>
            </>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('processing');

        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customer: formData,
                    items: items,
                    total: total
                }),
            });

            if (res.ok) {
                setStatus('success');
                clearCart();
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (status === 'success') {
        return (
            <>
                <Navbar />
                <div className="container" style={{ paddingTop: '100px', textAlign: 'center', maxWidth: '600px' }}>
                    <div style={{ padding: '2rem', background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--success)' }}>
                        <h1 style={{ color: 'var(--success)', marginBottom: '1rem' }}>Order Confirmed!</h1>
                        <p style={{ marginBottom: '1rem', lineHeight: 1.6 }}>
                            Thank you for your purchase, <strong>{formData.name}</strong>.
                        </p>
                        <p style={{ color: '#ccc' }}>
                            We have sent a confirmation email to <strong>{formData.email}</strong> with your order details.
                        </p>
                        <button
                            onClick={() => router.push('/')}
                            className="btn btn-primary"
                            style={{ marginTop: '2rem' }}
                        >
                            Return to Store
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container" style={{ paddingTop: '100px', paddingBottom: '4rem', maxWidth: '800px' }}>
                <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem', fontWeight: 800 }}>Checkout</h1>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
                    {/* Form */}
                    <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>Shipping Details</h2>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#ccc' }}>Full Name</label>
                                <input
                                    name="name" required style={{ width: '100%', padding: '0.75rem', background: 'var(--background)', border: '1px solid var(--border)', color: '#fff', borderRadius: 'var(--radius-sm)' }}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#ccc' }}>Email Address</label>
                                <input
                                    name="email" type="email" required style={{ width: '100%', padding: '0.75rem', background: 'var(--background)', border: '1px solid var(--border)', color: '#fff', borderRadius: 'var(--radius-sm)' }}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#ccc' }}>Address</label>
                                <input
                                    name="address" required style={{ width: '100%', padding: '0.75rem', background: 'var(--background)', border: '1px solid var(--border)', color: '#fff', borderRadius: 'var(--radius-sm)' }}
                                    onChange={handleChange}
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#ccc' }}>City</label>
                                    <input
                                        name="city" required style={{ width: '100%', padding: '0.75rem', background: 'var(--background)', border: '1px solid var(--border)', color: '#fff', borderRadius: 'var(--radius-sm)' }}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#ccc' }}>ZIP Code</label>
                                    <input
                                        name="zip" required style={{ width: '100%', padding: '0.75rem', background: 'var(--background)', border: '1px solid var(--border)', color: '#fff', borderRadius: 'var(--radius-sm)' }}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ marginTop: '1rem', width: '100%', padding: '1rem' }}
                                disabled={status === 'processing'}
                            >
                                {status === 'processing' ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                            </button>
                            {status === 'error' && <p style={{ color: '#ef4444', textAlign: 'center' }}>Something went wrong. Please try again.</p>}
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: 'var(--radius-md)' }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>Order Summary</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {items.map(item => (
                                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontWeight: '600' }}>{item.name}</div>
                                        <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Qty: {item.quantity}</div>
                                    </div>
                                    <div>${(item.price * item.quantity).toFixed(2)}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold' }}>
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
