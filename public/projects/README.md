# Project Screenshots

Place your 16:9 project screenshots in this folder (`public/projects/`), for example:

- `sentinel-ids.png` (or `.jpg`, `.webp`)
- `voice-for-all.png`
- `ai-recruiter-copilot.png`
- `mini-soc.png`
- `edumate.png`
- `policy-sandbox.png`
- `securegest.png`
- `competencyfirst.png`

## How to use them:

### Method 1: Codebase Configuration (Permanent across all visitors)
In `src/data/projects.js`, add or update the `screenshot` field for that project:

```javascript
{
  id: 'sentinel-ids',
  title: 'Sentinel IDS',
  screenshot: '/projects/sentinel-ids.png', // <--- Points to public/projects/sentinel-ids.png
  ...
}
```

### Method 2: Live Browser Upload (Instant, Zero Code)
Open any project detail page (e.g. `/projects/sentinel-ids`) in your browser and click anywhere on the "+ Upload Screenshot" placeholder. It will let you pick an image file and immediately store it in your browser's local storage for that project.
