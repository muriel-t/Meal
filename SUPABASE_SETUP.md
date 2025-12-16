# Supabase Setup Guide

This guide will help you set up Supabase authentication and database for the Recipe Generator app.

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - **Name**: Recipe Generator (or any name you prefer)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the closest region to your users
5. Wait for the project to be created (takes a few minutes)

## 2. Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. You'll need two values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys" → "anon public")

## 3. Set Environment Variables

Create a `.env.local` file in your project root (if it doesn't exist) and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**Important**: Replace `your_project_url_here` and `your_anon_key_here` with the actual values from step 2.

## 4. Create the Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Paste the following SQL and click "Run":

```sql
-- Create the recipe_searches table
CREATE TABLE IF NOT EXISTS recipe_searches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ingredients TEXT NOT NULL,
  recipe JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create an index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_recipe_searches_user_id ON recipe_searches(user_id);

-- Create an index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS idx_recipe_searches_created_at ON recipe_searches(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE recipe_searches ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows users to insert their own searches
CREATE POLICY "Users can insert their own searches"
  ON recipe_searches
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create a policy that allows users to view their own searches
CREATE POLICY "Users can view their own searches"
  ON recipe_searches
  FOR SELECT
  USING (auth.uid() = user_id);
```

4. You should see "Success. No rows returned" if everything worked correctly.

## 5. Configure Authentication

1. In your Supabase dashboard, look at the left sidebar menu
2. Click on **"Authentication"** (it has a key icon 🔑)
3. In the Authentication submenu, click on **"URL Configuration"** or **"Settings"**
   - If you see "URL Configuration", click that
   - If you see "Settings", click that, then look for "URL Configuration" section
4. You'll see two important fields:

   **a. Site URL:**
   - For local development, set this to: `http://localhost:3000`
   - For production, set this to your Vercel URL (e.g., `https://your-app.vercel.app`)
   - **Tip**: Start with `http://localhost:3000` for now, you can change it later

   **b. Redirect URLs:**
   - Click the **"Add URL"** button or the **"+"** icon
   - Add: `http://localhost:3000/**`
   - Click **"Add URL"** again and add your production URL: `https://your-app.vercel.app/**`
     (Replace `your-app.vercel.app` with your actual Vercel domain)
   - The `/**` at the end is important - it allows redirects to any path on your site

5. Click **"Save"** or the checkmark button to save your changes

**Note**: If you don't have a production URL yet, that's okay! Just add `http://localhost:3000/**` for now. You can add your production URL later when you deploy to Vercel.

## 6. Test the Setup

1. Start your development server: `npm run dev`
2. Go to `http://localhost:3000`
3. Try creating an account with a new email
4. Check your email for the verification link (if email confirmation is enabled)
5. Log in and generate a recipe
6. Click "Show Past Searches" to see your saved recipes

## Troubleshooting

### "Module not found" errors
- Make sure you've installed the dependencies: `npm install`

### Authentication not working
- Check that your environment variables are set correctly in `.env.local`
- Make sure you've restarted your dev server after adding environment variables
- Check the browser console for any error messages

### Database errors
- Make sure you've run the SQL script to create the table
- Check that Row Level Security policies are set up correctly
- Verify your user is authenticated before trying to save searches

### Can't see past searches
- Make sure you're logged in
- Check that recipes are being saved (check the Supabase dashboard → Table Editor → recipe_searches)
- Verify the user_id matches your authenticated user

