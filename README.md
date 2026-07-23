# Angelina Portfolio React Rebuild

This is a clean React + Vite rebuild of the portfolio, based on the exported HTML/CSS/assets.

## Local test

```bash
npm install
npm run dev
```

Open the local URL Vite prints.

## Vercel deployment

1. Upload the contents of this folder to a GitHub repository.
2. In Vercel: Add New → Project → import the repository.
3. Use the defaults. Vercel should detect Vite automatically.
4. Deploy.

Do not upload the ZIP itself. Upload the folder contents so that GitHub root shows:

- `index.html`
- `package.json`
- `vite.config.js`
- `public/`
- `src/`
- `README.md`

## Notes

This is a source-code rebuild, not a compiled ChatGPT Sites runtime. The interactions are written as normal React code so Vercel can build and run it reliably.
