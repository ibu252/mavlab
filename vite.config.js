import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages: 
// - If repo is "username.github.io", use base: '/'
// - If repo is "mavlabweb" or any other name, use base: '/mavlabweb/'
// IMPORTANT: Change '/mavlabweb/' to match your actual GitHub repository name!
// Or set environment variable: GITHUB_REPO_NAME=mavlabweb npm run build
const repoName = process.env.GITHUB_REPO_NAME || 'mavlab'
const base = process.env.GITHUB_PAGES === 'true' ? `/${repoName}/` : '/'

export default defineConfig({
  base: base,
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})

