import Navbar from '@/components/Navbar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ minHeight: '100vh', background: '#111' }}>
            <Navbar />
            {/* Adds padding to account for fixed navbar */}
            <div style={{ paddingTop: '80px' }}>
                {children}
            </div>
        </div>
    );
}
