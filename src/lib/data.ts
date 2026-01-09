import { prisma } from './db';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    createdAt: string;
}

// Helper to read data (From DB)
export const getProducts = async (): Promise<Product[]> => {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' }
        });

        // Convert Date to string for frontend compatibility
        return products.map(p => ({
            ...p,
            createdAt: p.createdAt.toISOString()
        }));
    } catch (error) {
        console.error("Database Connection Failed:", error);
        return [];
    }
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
    try {
        const product = await prisma.product.findUnique({
            where: { id }
        });

        if (!product) return undefined;

        return {
            ...product,
            createdAt: product.createdAt.toISOString()
        };
    } catch (error) {
        console.error("Database Error:", error);
        return undefined;
    }
};

// Helper to add a product
export const addProduct = async (product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
    const newProduct = await prisma.product.create({
        data: {
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            category: product.category
        }
    });

    return {
        ...newProduct,
        createdAt: newProduct.createdAt.toISOString()
    };
};

// Helper to delete a product
export const deleteProduct = async (id: string): Promise<void> => {
    await prisma.product.delete({
        where: { id }
    });
};
