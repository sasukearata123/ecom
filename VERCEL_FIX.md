# Critical Deployment Fix

I have updated the application to support Vercel's environment.

**The Issue:**
Vercel is a serverless platform where the main file system is **read-only**. The previous code tried to write to `data.json` in the protected root folder, causing the "Backend not working" (Internal Server Error 500) issues for Adding/Deleting products.

**The Fix:**
I updated `src/lib/data.ts` to detect if we are running in production. If so, it now uses the **`/tmp`** directory, which is the only writable place in a serverless function.

**Limitations:**
Files in `/tmp` are **temporary**. They will persist for a while (so you can demo Add/Delete), but eventually, Vercel will recycle the server and the data will reset to the seed data. 
*This is expected behavior for a serverless demo without a real database.*

**How to Apply:**
1.  Run `git add .`
2.  Run `git commit -m "Fix Vercel filesystem permissions using /tmp"`
3.  Run `git push`

Once redeployed, the errors should be gone.
