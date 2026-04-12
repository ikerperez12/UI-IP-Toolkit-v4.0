# UI IP Toolkit v4

Static UI showcase with copyable HTML/CSS snippets, motion demos, layout patterns, design tokens, and framework-inspired components.

## Highlights

- Single-page static toolkit with no backend requirements.
- Runtime hardened for public hosting on Vercel.
- No third-party runtime network dependencies.
- Copy-to-clipboard, pagination, cursor effects, and synthesized audio demos run locally in the browser.

## Local preview

Open `index.html` directly in a browser, or serve the directory locally:

```bash
npm start
```

## Deployment

This repository is prepared for static deployment on Vercel using `vercel.json`.

## Security posture

- Runtime assets are served from `self`.
- Security headers are defined in `vercel.json`.
- Audio demos are synthesized in-browser instead of loading remote media.
- The package is marked private so it is not accidentally published to a registry.

## License

MIT. See [LICENSE](LICENSE).
