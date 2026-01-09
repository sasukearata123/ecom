# Deployment Instructions

This project is a Next.js application ready for hosting.

## Recommended Hosting: Vercel

Vercel is the creators of Next.js and provides the easiest deployment experience for free.

### Step-by-Step Deployment

1.  **Create a GitHub Repository**:
    -   Go to GitHub.com and create a new repository (e.g., `my-ecom-store`).
    -   Push this code to the repository:
        ```bash
        git remote add origin <your-repo-url>
        git push -u origin master
        ```

2.  **Deploy on Vercel**:
    -   Go to [vercel.com](https://vercel.com) and sign up/login.
    -   Click "Add New..." -> "Project".
    -   Select your GitHub repository.
    -   Click "Deploy".
    -   Vercel will automatically detect it's a Next.js app and build it.

## Limitations of this Demo

This application uses a local JSON file (`data.json`) to store products.

**Important**: On serverless platforms like Vercel, the file system is *read-only* or *ephemeral*. This means:
-   **You CAN add products** via the Admin Dashboard, but they **WILL disappear** when the server restarts or redeploys (which happens frequently).
-   To make data persistent, you need a cloud database.

### How to Upgrade for Production

1.  **Use a Cloud Database**:
    -   Sign up for **Supabase**, **Neon** (Postgres), or **MongoDB Atlas**.
2.  **Update `src/lib/data.ts`**:
    -   Replace the `fs` (file system) calls with database queries (e.g., `prisma.product.findMany()`).

## Testing Locally

To run the app locally where data *is* persistent:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
