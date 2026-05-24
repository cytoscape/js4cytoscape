# Open in Cytoscape Web — demo

Companion to [`../open-in-cytoscape/`](../open-in-cytoscape/) (the desktop
version). Same idea — hand a network to Cytoscape so a user can explore it —
but the destination is **Cytoscape Web** (https://web.cytoscape.org)
running in the user's browser. Nothing to install.

The "integration" is just a URL. The page demonstrates three URL-based
patterns.

## What's here

| File | Purpose |
|---|---|
| `index.html` | The demo page. Three patterns, each with a button/link and the generated URL displayed for the audience to read. |
| `cell-hierarchy.cx2.json` | Standalone CX2 (the same 6-node cell hierarchy used by the desktop demo) for the `?import=<url>` pattern to fetch. |

## The three patterns

1. **Open from URL** — `https://web.cytoscape.org/?import=<encoded-cx2-url>`.
   Cytoscape Web fetches a CX2 file from any URL it can reach. No auth, no
   library required. Used here to import `cell-hierarchy.cx2.json` directly.
2. **Open via NDEx UUID** — `https://web.cytoscape.org/0/networks/<uuid>`.
   Recommended for apps that persist user networks in NDEx. Private networks
   work too: append `?accesskey=<key>`. The page also shows the
   `@js4cytoscape/ndex-client` snippet your app would use to produce the UUID
   from CX2.
3. **Open with view state** — same as #2 plus extra query parameters
   (`left`, `right`, `bottom`, `activeTableBrowserTab`, `selectednodes`,
   and others such as `filterEnabled`) to pre-set panel layout and
   selection. Good for deep-linking from reports and email.

## Running it

The page must be served over HTTPS from an origin that allows cross-origin
reads from `web.cytoscape.org` (`Access-Control-Allow-Origin: *`). GitHub
Pages, S3 + CloudFront, Netlify, and most static hosts already do this.

Opening `index.html` via `file://` will **not** work — Cytoscape Web cannot
fetch `file://` URLs for the `?import=` pattern.

For a quick local test with permissive CORS:

```bash
npx http-server -p 8080 --cors
# then open http://localhost:8080/index.html
```

(Python's built-in `http.server` does not set the CORS header, so
pattern #1 will fail with it.)

## Customizing for your own talk

All values you might want to swap live at the top of the `<script>` block in
`index.html`:

| Constant | What it controls |
|---|---|
| `CYWEB_BASE` | Cytoscape Web entry point. Defaults to `https://web.cytoscape.org`. |
| `CX2_FILE_URL` | Built automatically from `window.location` + `cell-hierarchy.cx2.json`. Replace if you want pattern #1 to import a different file. |
| `NDEX_DEMO_UUID` | Public NDEx network for pattern #2. Defaults to `c868db9f-6193-11e5-8ac5-06603eb7f303`. |
| `ADVANCED_UUID` | Network for pattern #3. Same as `NDEX_DEMO_UUID` by default; pick a larger / more visually interesting one if you want the panel and selection effects to land harder. |
| `ADVANCED_SELECTED_NODE` | Internal node id passed to `selectednodes` for pattern #3. Set to a real node id from `ADVANCED_UUID`. |

## See also

- [`../open-in-cytoscape/`](../open-in-cytoscape/) — the Cytoscape Desktop
  counterpart (CyREST + CX2 over `127.0.0.1:1234`).
- [`@js4cytoscape/ndex-client`](https://www.npmjs.com/package/@js4cytoscape/ndex-client)
  — TypeScript client for NDEx; produces the UUIDs used by pattern #2.
- NDEx: https://www.ndexbio.org
- Cytoscape Web: https://web.cytoscape.org
