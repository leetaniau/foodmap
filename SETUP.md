# Setup Guide

This guide will help you set up your own food resource map, even if you're not a developer!

## Table of Contents

1. [For Non-Developers](#for-non-developers)
2. [For Developers](#for-developers)
3. [Customizing Your Map](#customizing-your-map)
4. [Adding Your Own Data](#adding-your-own-data)
5. [Deploying Your Map](#deploying-your-map)
6. [Troubleshooting](#troubleshooting)

---

## For Non-Developers

### What You'll Need

- A computer with internet access
- A free account on [Replit](https://replit.com) or [GitHub](https://github.com)
- Your food resource data (addresses, hours, contact info)
- About 30-60 minutes of time

### Step-by-Step Setup on Replit (Easiest Method)

#### Step 1: Get the Code

1. Go to this project's Replit page
2. Click the "Fork" button at the top
3. Wait for Replit to copy the project to your account (this takes 1-2 minutes)

#### Step 2: Set Up Your Database

1. In the left sidebar, click on the "Secrets" tool (looks like a lock icon)
2. You'll see a variable called `DATABASE_URL` - this is already set up for you!
3. Replit provides a free PostgreSQL database automatically

#### Step 3: Prepare Your Data

1. Click on the `data` folder in the left sidebar
2. Open `sample-food-resources.csv`
3. This shows you the format your data needs to be in
4. Prepare your own CSV file with these columns:
   - **id**: Unique identifier (optional, will auto-generate if not provided)
   - **name**: Name of the food resource
   - **type**: Type of resource (Food Pantry, Community Fridge, Hot Meal, Soup Kitchen, etc.)
   - **address**: Full address including city, state, and zip (e.g., "123 Main St, Detroit, MI 48201")
   - **phone**: Contact phone number (optional)
   - **latitude**: Latitude coordinate (leave empty if you'll geocode addresses later)
   - **longitude**: Longitude coordinate (leave empty if you'll geocode addresses later)
   - **hours**: Operating hours (e.g., "MON-FRI: 9:00am-5:00pm")
   - **distance**: Distance information (optional, for display purposes)
   - **appointment_required**: Whether appointment is needed (Yes, No, or leave empty)

#### Step 4: Import Your Data

1. Upload your CSV file to the `data` folder (drag and drop)
2. In the Shell (bottom of the screen), type:
   ```bash
   npx tsx scripts/import-csv-to-db.ts data/your-file-name.csv
   ```
3. Wait for the import to complete (you'll see success messages)

#### Step 5: Geocode Addresses (Get Map Coordinates)

This step converts addresses into map coordinates (latitude/longitude):

1. Get a free API key from [Geoapify](https://www.geoapify.com/)
2. Add it to your Secrets as `GEOAPIFY_API_KEY`
3. In the Shell, type:
   ```bash
   npx tsx scripts/geocode-addresses.ts
   ```
4. Wait for geocoding to complete

#### Step 6: Launch Your Map!

1. Click the big green "Run" button at the top
2. Wait 10-20 seconds for the app to start
3. Your food map will open in a new window!

#### Step 7: Share Your Map

1. Click the "Share" button in Replit
2. Copy the public URL
3. Share it with your community!

---

## For Developers

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Git
- Code editor (VS Code recommended)

### Local Development Setup

#### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd detroit-food-resources
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/foodmap

# Geocoding (optional, for address geocoding)
GEOAPIFY_API_KEY=your_api_key_here

# Session (generate a random string)
SESSION_SECRET=your_random_secret_here

# Node environment
NODE_ENV=development
```

#### 4. Set Up the Database

```bash
# Push database schema
npm run db:push

# Import sample data (optional)
npx tsx scripts/import-csv-to-db.ts data/sample-food-resources.csv

# Geocode addresses to get coordinates
npx tsx scripts/geocode-addresses.ts
```

#### 5. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5000`

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

---

## Customizing Your Map

### Change the Map Center Location

1. Open `client/src/pages/Home.tsx`
2. Find line 23 where the default user location is set
3. Change the center coordinates to your city:

```typescript
const [userLocation, setUserLocation] = useState<[number, number]>([42.3314, -83.0458]); // Detroit coordinates
// Change to your city, e.g., [40.7128, -74.0060] for NYC
```

### Change Colors and Branding

1. Open `tailwind.config.ts`
2. Modify the colors in the theme section
3. Update the app name in `client/index.html`

### Change the Logo

To customize the logo for your own food map:

1. **Prepare your logo image:**
   - Recommended format: PNG with transparent background
   - Recommended size: 400-800px width for good quality
   - Save it with a simple name like `logo.png`

2. **Add your logo to the project:**
   - Place your logo file in the `assets/` folder
   - Replace the existing `logo.png` or use a different filename

3. **Update the code (if using a different filename):**
   - Open `client/src/pages/Home.tsx`
   - Find line 12: `import logoImage from '@assets/logo.png';`
   - Change `logo.png` to your filename (e.g., `my-logo.png`)

4. **Adjust logo size (optional):**
   - In `client/src/pages/Home.tsx`, find the `<img>` tag (around line 117)
   - Modify the `className` to adjust width: `className="w-40 h-auto justify-self-center"`
   - Change `w-40` to a different size (e.g., `w-32` for smaller, `w-48` for larger)

That's it! Your custom logo will now appear on the homepage.

### Change Resource Types

1. Open `shared/schema.ts`
2. Find the resource type definitions
3. Add or modify resource types as needed
4. Run `npm run db:push` to update the database

---

## Adding Your Own Data

### Option 1: CSV Import (Recommended for Bulk Data)

1. Create a CSV file with these columns:
   ```
   id,name,type,address,phone,latitude,longitude,hours,distance,appointment_required
   ```

2. Save your CSV file in the `data/` folder

3. Import it:
   ```bash
   npx tsx scripts/import-csv-to-db.ts data/your-file.csv
   ```

4. Geocode the addresses (if latitude/longitude are empty):
   ```bash
   npx tsx scripts/geocode-addresses.ts
   ```

### Option 2: Manual Entry via Web Interface

1. Run your app
2. Use the "Submit a Resource" form
3. Fill in the details
4. Submit (requires admin approval if you've enabled that feature)

### Option 3: Direct Database Insert (Developers)

```bash
npx tsx scripts/seed-db.ts
```

Edit `scripts/seed-db.ts` to add your resources programmatically.

---

## Deploying Your Map

### Deploy to Replit (Easiest)

1. Your Replit is already live at your Repl URL!
2. Keep your Repl running by upgrading to a paid plan (optional)
3. Share your URL with the community

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts
4. Set environment variables in Vercel dashboard

### Deploy to Railway

1. Sign up at [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Add environment variables
5. Railway will auto-deploy!

### Deploy to Heroku

```bash
# Login to Heroku
heroku login

# Create new app
heroku create your-foodmap-name

# Add PostgreSQL
heroku addons:create heroku-postgresql:mini

# Deploy
git push heroku main
```

---

## Troubleshooting

### "Cannot connect to database"

- Check your `DATABASE_URL` in `.env` or Secrets
- Make sure PostgreSQL is running (if local)
- Verify database credentials are correct

### "Port already in use"

- Another app is using port 5000
- Change the port in `server/index.ts`
- Or stop the other application

### "Geocoding failed"

- Check your `GEOAPIFY_API_KEY` is valid
- Verify you haven't exceeded API rate limits (free tier: 3000 requests/day)
- Check that addresses in your data are properly formatted

### Map not showing resources

1. Check if data was imported: `npx tsx scripts/check-db.ts`
2. Verify addresses were geocoded (have lat/long)
3. Check browser console for errors (F12 → Console)

### Import script fails

- Verify your CSV has the correct column names
- Check for special characters or commas in your data (they need to be quoted)
- Make sure file encoding is UTF-8

### App won't start

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run check
```

---

## Getting Help

- **Check the docs**: Review files in the `/docs` folder
- **Common issues**: Most problems are related to environment variables or data format
- **Ask for help**: Open an issue on GitHub with:
  - What you were trying to do
  - What happened instead
  - Any error messages you saw
  - Screenshots if relevant

---

## Next Steps

After setup, you might want to:

1. Add user authentication for admin features
2. Enable community submissions with moderation
3. Add more resource types (clothing banks, shelters, etc.)
4. Integrate with other local services
5. Add analytics to track usage

Check out the `/docs` folder for more advanced topics!

---

Good luck with your food map project! You're helping your community find the resources they need.
