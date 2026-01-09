import fs from 'fs';
import path from 'path';

// Determine if we are in a production environment (Vercel)
const isProduction = process.env.NODE_ENV === 'production';

// On Vercel, only /tmp is writable. 
// Locally, we use the project root.
const DATA_FILE_PATH = isProduction
    ? path.join('/tmp', 'data.json')
    : path.join(process.cwd(), 'data.json');

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    createdAt: string;
}

export interface DataSchema {
    products: Product[];
}

// Initial seed data to populate if file is missing
const SEED_DATA: Product[] = [
    {
        "id": "seed-1",
        "name": "Neon Genesis Hoodie",
        "description": "Premium cotton blend with holographic prints.",
        "price": 89.99,
        "image": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=2070",
        "category": "Apparel",
        "createdAt": "2024-01-01T00:00:00.000Z"
    }
];

// Helper to read data
export const getProducts = async (): Promise<Product[]> => {
    try {
        if (!fs.existsSync(DATA_FILE_PATH)) {
            // If file doesn't exist, create it with seed data
            await saveProducts(SEED_DATA);
            return SEED_DATA;
        }
        const fileContent = await fs.promises.readFile(DATA_FILE_PATH, 'utf-8');
        const data = JSON.parse(fileContent) as DataSchema;
        return data.products || [];
    } catch (error) {
        console.error("Failed to read products", error);
        // Fallback to empty to prevent crash
        return [];
    }
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
    const products = await getProducts();
    return products.find(p => p.id === id);
};

// Helper to write data
export const saveProducts = async (products: Product[]): Promise<void> => {
    const data: DataSchema = { products };
    await fs.promises.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2));
};

// Helper to add a product
export const addProduct = async (product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
    const products = await getProducts();
    const newProduct: Product = {
        ...product,
        id: Math.random().toString(36).substring(7),
        createdAt: new Date().toISOString()
    };
    products.push(newProduct);
    await saveProducts(products);
    return newProduct;
};

// Helper to delete a product
export const deleteProduct = async (id: string): Promise<void> => {
    const products = await getProducts();
    const filtered = products.filter(p => p.id !== id);
    await saveProducts(filtered);
};
