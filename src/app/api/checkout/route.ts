import { NextResponse } from 'next/server';

// Simulated Email Sender
async function sendEmail(to: string, subject: string, body: string) {
    // In a real app, use Nodemailer or SendGrid here.
    // console.log(`[EMAIL SIMULATION] To: ${to} | Subject: ${subject}`);
    // console.log(body);
    // console.log('-----------------------------------');
    // We will log to stdout so the user can see it in their terminal
    console.log(`\n\n=== EMAIL SENT ===\nTo: ${to}\nSubject: ${subject}\n\n${body}\n==================\n`);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { customer, items, total } = body;

        // 1. Validate (Simple)
        if (!customer || !items || items.length === 0) {
            return NextResponse.json({ error: 'Invalid order data' }, { status: 400 });
        }

        const date = new Date().toLocaleDateString();

        // 2. Prepare Order Details
        const orderId = Math.random().toString(36).substring(7).toUpperCase();
        const itemsList = items.map((i: any) => `- ${i.name} (x${i.quantity}) - $${(i.price * i.quantity).toFixed(2)}`).join('\n');

        // 3. Email to Customer
        const customerEmailBody = `
Hi ${customer.name},

Thank you for your order! Here is your confirmation.

Order ID: #${orderId}
Date: ${date}

Items:
${itemsList}

Total: $${total.toFixed(2)}

Shipping to:
${customer.address}, ${customer.city} ${customer.zip}

Thanks,
Nexus Store Team
        `;
        await sendEmail(customer.email, `Order Confirmation #${orderId}`, customerEmailBody);

        // 4. Email to Seller (Admin)
        const sellerEmailBody = `
New Order Received!

Order ID: #${orderId}
Customer: ${customer.name} (${customer.email})
Date: ${date}

Items:
${itemsList}

Total: $${total.toFixed(2)}

Shipping Address:
${customer.address}, ${customer.city} ${customer.zip}
        `;
        // Send to a fixed admin email
        await sendEmail('admin@nexus-store.com', `New Order #${orderId} from ${customer.name}`, sellerEmailBody);

        return NextResponse.json({ success: true, orderId });

    } catch (error) {
        console.error('Checkout Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
