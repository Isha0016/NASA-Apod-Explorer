# NASA APOD Explorer

A responsive NASA Astronomy Picture of the Day app built with HTML, CSS and vanilla JavaScript.

## Run locally
1. Download and unzip the project.
2. Open `index.html` in a browser. If your browser restricts local-file requests, run a local server from this folder:
   - Python: `python -m http.server 8000`
   - Then open `http://localhost:8000`.
3. `script.js` uses NASA's `DEMO_KEY` by default. It has strict rate limits. For regular use, get a free key at https://api.nasa.gov/ and replace `DEMO_KEY` in `script.js`.

## Features
- Loads today's APOD on page load.
- Date search using the NASA APOD `date` query parameter.
- Saves searches as a JSON array in `localStorage`.
- Clickable search history that fetches the selected date again.
- Handles image and video APOD entries, API errors, and empty history.

## Deploy free
You can deploy this static site with GitHub Pages:
1. Create a GitHub repository and upload `index.html`, `style.css`, and `script.js` to its root.
2. Open the repository's **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Wait for the published URL shown in the Pages section.

Note: a NASA API key embedded in front-end JavaScript is visible to visitors. For a portfolio/demo project, use `DEMO_KEY` or a restricted key and be mindful of its usage limits. For production, proxy the NASA API through a backend so the key is not exposed.
