import { NextResponse } from 'next/server';
import { getProducts, addProduct, deleteProduct, Product } from '@/lib/data';

export async function GET() {
    const products = await getProducts();
    return NextResponse.json({ products });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.name || !body.price || !body.image) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const newProduct = await addProduct({
            name: body.name,
            description: body.description || '',
            price: Number(body.price),
            image: body.image,
            category: body.category || 'Uncategorized'
        });

        return NextResponse.json({ product: newProduct }, { status: 201 });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID required' }, { status: 400 });
        }

        await deleteProduct(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
