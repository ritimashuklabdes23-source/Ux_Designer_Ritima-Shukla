# Ritima Shukla Portfolio

A static HTML/CSS/JS implementation of the [Figma portfolio design](https://www.figma.com/design/ZyjD5PGTUEctraQcwTaTCH/Ritima-Shukla-Portfolio).

## Run locally

Open `index.html` in a browser, or use a simple static server:

```bash
cd ritima-shukla-portfolio
python3 -m http.server 8080
```

Then visit http://localhost:8080

## Structure

- `index.html` — page markup
- `css/styles.css` — layout and visual styles (no Tailwind)
- `js/main.js` — smooth scroll, FAQ accordion, form demo
- `assets/images/` — images exported from Figma

## Fonts

Loaded from Google Fonts: **Space Grotesk**, **Urbanist**.

## Calendly

1. Open [Calendly](https://calendly.com) → your event type → **Share** → copy the scheduling URL.
2. Edit `js/config.js` and set `calendlyUrl` (e.g. `https://calendly.com/your-name/30min`).
3. Reload the site. In **Contact**, use the **Book a call** tab for the inline calendar, or **Book a call on Calendly** / **Start a Project** for the popup.

Direct link to the booking tab: `index.html#schedule`

## Note on assets

Figma MCP asset URLs expire after ~7 days. Re-export from Figma or replace files in `assets/images/` if images stop loading.
