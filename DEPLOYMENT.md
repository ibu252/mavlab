# Deployment Guide for MAVLab Website

Your website is built and ready to deploy! The production build is in the `dist/` folder.

## Quick Deployment Options

### Option 1: Vercel (Recommended - Easiest)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

   Or deploy directly from the dist folder:
   ```bash
   cd dist
   vercel --prod
   ```

**Alternative: Deploy via Vercel Dashboard**
1. Go to https://vercel.com
2. Sign up/Login
3. Click "Add New Project"
4. Drag and drop the `dist` folder
5. Deploy!

### Option 2: Netlify (Also Easy)

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**:
   ```bash
   netlify login
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod --dir=dist
   ```

**Alternative: Deploy via Netlify Dashboard**
1. Go to https://app.netlify.com
2. Sign up/Login
3. Drag and drop the `dist` folder
4. Deploy!

### Option 3: GitHub Pages

1. Initialize git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a GitHub repository and push:
   ```bash
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

3. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

4. Add to package.json scripts:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```

5. Deploy:
   ```bash
   npm run deploy
   ```

### Option 4: Traditional Web Hosting

Upload the contents of the `dist/` folder to your web server via FTP/SFTP.

## Build Command

To rebuild the project:
```bash
npm run build
```

The production files will be in the `dist/` folder.

## Important Notes

- All assets (images, models, videos, shaders) are included in the `dist/` folder
- The build is optimized for production
- Make sure your hosting supports serving static files
- For SPA routing, configure your server to redirect all routes to `index.html`

