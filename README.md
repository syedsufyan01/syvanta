# SYVANTA DIGITAL SYSTEMS — Website

```bash
npm install
npm run dev
```

Open the link shown in the terminal (usually http://localhost:5173). That is all you need to run the site.

## Forms (how they send)
- **Submit** button: sends the form to syvanta.official@gmail.com through FormSubmit. It works on `npm run dev` and on any hosting, with no API key or password in the code.
  - **One-time step:** the first submission makes FormSubmit email an activation link to syvanta.official@gmail.com. Open it and press confirm once. After that every submission arrives as an email.
  - If FormSubmit fails and the site runs on Netlify, the form falls back to Netlify Forms (the forms are declared in `index.html`).
  - Success is shown only when a server accepted the request. On failure the visitor sees a clear message and can use WhatsApp or Email instead; their data stays in the form.
- **WhatsApp** and **Email** buttons open a prefilled message; the visitor presses Send. A CV cannot be attached this way.
- Careers sends the CV (PDF/DOCX, max 5 MB) as an email attachment with the Submit button.
- `legacy-backend/` (PHP) is not used.

## Photos and video
- Photos (services, About, Contact, Careers, Home) are free Unsplash photos loaded from the Unsplash CDN in the visitor's browser. If one fails to load, an animated illustration or branded panel is shown instead. They were not loaded in the build environment, so check them once with `npm run dev`.
- Use your own photo by adding a file to `src/assets/images/`: `service-<slug>.jpg`, `team.jpg`, `office.jpg`, `collab.jpg`, `founder.jpg`.
- Video: `public/videos/syvanta-build.mp4` (plus `syvanta-build.jpg` poster) is a screen recording of a page being coded. It is used as the hero background and in the "Watch it come together" section. Replace it with your own video of the same file name (keep it under ~5 MB, no audio).

## Service images (fallback)
Each service has an animated illustration drawn in code (`src/components/Illustration.tsx`). To use a real photo instead, add `src/assets/images/service-<slug>.jpg`, for example `service-seo.jpg`.

## Editing content
Everything is in `src/data.ts`: contact details, services, jobs, projects, social links (empty list = hidden).

## Founder photo
Put a real photo at `src/assets/images/founder.jpg` (or png/webp). It replaces the SS monogram automatically.

## Deploy on Netlify
Connect the repo (build `npm run build`, publish `dist`); `netlify.toml` is included. Optionally set `VITE_SITE_URL` and replace `syvanta.netlify.app` in `public/sitemap.xml` and `public/robots.txt`.
