import fs from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'data.json');

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

// Helper to read data
export const getProducts = async (): Promise<Product[]> => {
    // In a real app, this would be a DB call.
    // We use fs.promises for async file reading to simulate DB latency if needed.
    try {
        if (!fs.existsSync(DATA_FILE_PATH)) {
            // Initialize if not exists
            await saveProducts([]);
            return [];
        }
        const fileContent = await fs.promises.readFile(DATA_FILE_PATH, 'utf-8');
        const data = JSON.parse(fileContent) as DataSchema;
        return data.products || [];
    } catch (error) {
        console.error("Failed to read products", error);
        return [];
    }
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
