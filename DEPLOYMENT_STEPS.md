# Final Deployment Steps

## 1. Push Code to GitHub
I have configured the remote repository for you. Since this requires your personal GitHub authentication, please run the following command in your terminal:

```bash
git push -u origin main
```

If prompted, enter your GitHub username and password (or Personal Access Token).

## 2. Deploy to Vercel

Once the code is pushed to GitHub, follow these steps to deploy it live:

1.  **Log in to Vercel**: 
    -   Go to [vercel.com/login](https://vercel.com/login) and sign in with your GitHub account.

2.  **Import Project**:
    -   Click **"Add New..."** button (top right) -> Select **"Project"**.
    -   You should see your repository `sasukearata123/ecom` listed under "Import Git Repository".
    -   Click the **"Import"** button next to it.

3.  **Configure & Deploy**:
    -   **Project Name**: Leave as is or change if desired.
    -   **Framework Preset**: It should auto-detect "Next.js".
    -   **Root Directory**: Leave as `./`.
    -   **Build Command**: Leave default (`next build`).
    -   **Environment Variables**: 
        -   This project uses hardcoded values for the demo (admin credentials: `admin`/`password123`), so you **do not** need to add any environment variables right now.
    -   Click **"Deploy"**.

4.  **Wait for Build**:
    -   Vercel will build your application (takes about 1 minute).
    -   Once complete, you will see a "Congratulations!" screen with a generic screenshot of your app.

5.  **Visit Your Live Site**:
    -   Click the DOMAIN link provided (e.g., `ecom-taupe.vercel.app`).
    -   Your professional e-commerce store is now online!

## 3. Important Notes for Production

-   **Data Storage**: This demo uses a *temporary* file-based database (`data.json`).
    -   **Warning**: On Vercel, any products you add via the Admin Dashboard *will disappear* when the app redeploys or "sleeps".
    -   **Fix**: For a real business, connect a database like **Supabase** or **PostgreSQL**.
-   **Email Sending**:
    -   Currently, emails are simulated (printed to console logs). To send real emails, you need to sign up for an email service (like SendGrid or Resend) and update `src/app/api/checkout/route.ts`.
