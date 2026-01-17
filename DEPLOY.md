# Deploy to GitHub Pages - Quick Guide

## Step 1: Initialize Git (if not already done)

```bash
git init
git add .
git commit -m "Initial commit - MAVLab website"
```

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `mavlab` (or your preferred name)
3. Make it **public** (required for free GitHub Pages)
4. **Don't** initialize with README, .gitignore, or license
5. Click "Create repository"

## Step 3: Connect Local Repository to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/mavlab.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your GitHub username!**

## Step 4: Deploy to GitHub Pages

Simply run:
```bash
npm run deploy
```

This will:
1. Build the site with GitHub Pages configuration
2. Deploy the `dist` folder to the `gh-pages` branch
3. Your site will be live at: `https://YOUR_USERNAME.github.io/mavlab/`

## Step 5: Enable GitHub Pages (if needed)

1. Go to your repository on GitHub
2. Settings → Pages
3. Source: Deploy from a branch
4. Branch: `gh-pages` → `/ (root)`
5. Click Save

## Important Notes

- The repository name in `vite.config.js` is set to `'mavlab'`
- If your repo has a different name, update line 9 in `vite.config.js`:
  ```javascript
  const repoName = process.env.GITHUB_REPO_NAME || 'YOUR_REPO_NAME'
  ```
- After changing the repo name, rebuild: `npm run build:gh-pages`

## Troubleshooting

**404 errors:**
- Make sure the repository name in `vite.config.js` matches your GitHub repo name
- Rebuild: `npm run build:gh-pages`
- Redeploy: `npm run deploy`

**Assets not loading:**
- Check that paths start with `/mavlab/` in the built HTML
- Clear browser cache

