# Adam & Farah — Wedding Invitation (Static Site)

A pure HTML / CSS / JavaScript version of the wedding invitation. No framework, no build step.

## Structure

```
static-site/
├── index.html      # All page markup
├── styles.css      # All styles (HSL design tokens, animations)
├── script.js       # Preloader, audio player, RSVP modal, toast
├── assets/         # Illustrations + photos
└── audio/          # Romantic Arabic song
```

## Run locally

Just open `index.html` in a browser, or serve it:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then visit http://localhost:8000

## Deploy to GitHub Pages

1. Push the contents of `static-site/` to the root of a GitHub repo (or to a `docs/` folder).
2. In repo **Settings → Pages**, choose the branch and folder.
3. Done — your invitation is live.
