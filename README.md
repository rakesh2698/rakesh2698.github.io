# Rakesh Satpathy — Portfolio

Single-page portfolio site. No build step — open `index.html` directly, or
serve locally with:

    python3 -m http.server 8000

## Deploying to GitHub Pages

1. Create a new repository on GitHub (e.g. `rakesh-satpathy.github.io` for a
   root user site, or any name for a project site).
2. Add it as a remote and push:

       git remote add origin <your-repo-url>
       git branch -M main
       git push -u origin main

3. In the repo on GitHub: Settings → Pages → Source → set to `main` branch,
   `/ (root)` folder → Save.
4. Wait a minute, then visit the URL GitHub shows on that same Pages settings
   page.
