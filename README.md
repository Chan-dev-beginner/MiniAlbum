Dreamy Mini Album

This repository serves a static album from the `assets/` folder.

How it works:
- At build time the script `scripts/generate-manifest.js` produces `assets.json` containing an array of image filenames from `assets/`.
- `index.html` + `script.js` load `assets.json` and render the gallery dynamically.
- To publish on Vercel: add or remove files in `assets/`, then push — Vercel runs `npm run build` which generates `assets.json` automatically before serving the site.

If you want runtime uploads (save files without redeploy), you need external storage (Cloudinary, S3, Supabase). I can add that integration if you like.
