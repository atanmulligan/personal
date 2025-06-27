# Supabase Setup Guide for yh's Website

## Step 1: Create a Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" or "Sign up"
3. Create an account (you can use GitHub, Google, or email)

## Step 2: Create a New Project

1. Click "New Project"
2. Choose your organization
3. Give your project a name (e.g., "yh-website")
4. Set a database password (save this!)
5. Choose a region close to you
6. Click "Create new project"

## Step 3: Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy your **Project URL** (looks like: `https://your-project-id.supabase.co`)
3. Copy your **anon public** key (starts with `eyJ...`)

## Step 4: Update Your Configuration

1. Open `supabase.js` in your project
2. Replace `YOUR_SUPABASE_URL` with your Project URL
3. Replace `YOUR_SUPABASE_ANON_KEY` with your anon public key

Example:
```javascript
const supabaseUrl = 'https://your-project-id.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

## Step 5: Test Your Connection

1. Run `npm run dev` to start the development server
2. Open your browser to the local URL
3. You should see "Connected to Supabase!" if everything is working

## Step 6: Create Your First Table (Optional)

1. In Supabase dashboard, go to **Table Editor**
2. Click "New Table"
3. Create a simple table like:
   - Name: `posts`
   - Columns: `id` (int8, primary key), `title` (text), `content` (text)
4. Click "Save"

## Step 7: Deploy to Vercel

1. Commit your changes: `git add . && git commit -m "Add Supabase integration"`
2. Push to GitHub: `git push`
3. Vercel will automatically deploy your updated site

## Environment Variables (Recommended)

For better security, you can use environment variables:

1. Create a `.env` file in your project root:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

2. Update `supabase.js`:
```javascript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
```

3. Add these environment variables in your Vercel dashboard

## Next Steps

- Create more tables for your data
- Add authentication features
- Build forms to interact with your database
- Add real-time subscriptions

Need help? Check out the [Supabase documentation](https://supabase.com/docs)! 