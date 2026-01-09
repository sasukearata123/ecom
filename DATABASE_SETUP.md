# Database Setup Required

To make the application work with a **Real Database**, you must connect it to a PostgreSQL instance.

## 1. Get a Database URL
You can get a free PostgreSQL database from:
-   **Neon.tech** (Recommended for Vercel)
-   **Supabase**
-   **Vercel Postgres**

## 2. Set Environment Variable
1.  Copy the connection string (e.g., `postgres://user:password@host/db`).
2.  Open your Vercel Project Settings -> **Environment Variables**.
3.  Add a new variable:
    -   Key: `DATABASE_URL`
    -   Value: `<paste_your_connection_string>`

## 3. Deploy
Redeploy your project. Vercel will now connect to your real database.

## 4. Initialize Database
After setting the variable, you might need to run the migration command locally or use `npx prisma db push` if you have the URL in your local `.env`.
