# South Bangla Group website

React + Vite + React Router.

```
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
npm run preview  # serve the built site
```

- Content (companies, leaders, contacts, photo lists): `src/data/data.js`; Bangla text: `src/data/bn.js`
- Design: `src/styles/style.css` (colours are the variables at the top) and `src/styles/pages.css`
- Photos and logos: `public/assets/img/`
- Pages: `src/pages/` · shared pieces: `src/components/` · language/modal state: `src/AppContext.jsx`
- `legacy/` holds the previous plain HTML/CSS/JS version for reference.

When deploying, point the host at `dist/` and make it fall back to `index.html` for unknown paths (needed for `/about`, `/contact`, etc.).
