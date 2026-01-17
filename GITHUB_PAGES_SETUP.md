# GitHub Pages Deployment Setup

## Important: Repository Name Configuration

Before deploying, you need to update the base path in `vite.config.js` to match your GitHub repository name.

### Step 1: Update Base Path

1. Open `vite.config.js`
2. Find this line:
   ```javascript
   const base = process.env.GITHUB_PAGES === 'true' ? '/mavlabweb/' : '/'
   ```
3. Replace `'/mavlabweb/'` with your actual repository name:
   - If your repo is `mavlabweb`, keep it as `'/mavlabweb/'`
   - If your repo is `mavlab`, change to `'/mavlab/'`
   - If your repo is `username.github.io`, change to `'/'`

### Step 2: Rebuild

After updating the base path, rebuild:
```bash
npm run build
```

### Step 3: Deploy to GitHub Pages

**Option A: Using gh-pages package (Recommended)**

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json` scripts:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

**Option B: Manual Deployment**

1. Initialize git (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create GitHub repository and push:
   ```bash
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git branch -M main
   git push -u origin main
   ```

3. Go to GitHub repository → Settings → Pages
4. Select source: "Deploy from a branch"
5. Select branch: "main" (or "gh-pages" if using Option A)
6. Select folder: "/ (root)" or "/dist" depending on your setup
7. Click Save

### Step 4: Verify Paths

After deployment, check:
- Images load correctly: `https://yourusername.github.io/repo-name/images/logo.jpeg`
- Models load: `https://yourusername.github.io/repo-name/models/...`
- Videos load: `https://yourusername.github.io/repo-name/videos/...`
- Navigation works (no 404 errors)

## Current Configuration

The current build is configured for base path: `/mavlabweb/`

If your repository name is different, update `vite.config.js` and rebuild before deploying.

## Troubleshooting

**404 errors on routes:**
- GitHub Pages needs a `404.html` file that redirects to `index.html`
- Create `public/404.html` with:
  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Redirecting...</title>
      <script>
        sessionStorage.redirect = location.href;
        location.replace(location.pathname.split('/').slice(0, -1).join('/') + '/');
      </script>
    </head>
  </html>
  ```

**Assets not loading:**
- Check that base path in `vite.config.js` matches your repository name
- Rebuild after changing base path
- Clear browser cache

