# Recess

A static browser-games site — the "cast a wide net" sibling to Reddomo. Every
game is **embedded** from an external host; nothing is self-hosted. Monetized
with **Adsterra** (not AdSense). No build step, no framework — just HTML/CSS/JS.

This is the aggressive arm of an A/B experiment: Recess targets the "unblocked
games" keyword and uses an AdSense-alternative ad network, so its performance
can be compared against Reddomo (curated + AdSense).

## Run locally

```
python -m http.server 8001
```

Then open http://localhost:8001

> Note: some embeds (the CrazyGames ones) will be **frame-blocked on localhost**
> — that's expected. See "CrazyGames embeds" below.

## Add a game

Edit `js/catalog.js` and drop in an object:

```js
{
  id: "my-game", title: "My Game", cat: "Arcade", tags: ["fun"],
  type: "embed", src: "https://host/game/",
  blurb: "One-liner.", thumb: "assets/thumbs/my-game.svg", icon: "🎮", color: "#1b8f5a",
  featured: true,   // optional — shows in the homepage Featured row
}
```

- `type: "embed"` → loads `src` in the on-site player iframe (ads wrap it).
- `type: "link"`  → opens `src` in a new tab (use when a host blocks framing).
- Thumbnails: drop an SVG/PNG in `assets/thumbs/` and point `thumb:` at it.
- Categories come from `CATEGORIES` at the top of `catalog.js`.

## Which games work on day one

**Most of the catalog frames anywhere with no setup** — the `.io` games
(slither, 1v1.lol, paper.io, bloxd, territorial, digdig, smashkarts.io, diep,
zombsroyale, skribbl), the classics (Pac-Man, dino run, astray, solitaire,
sandspiel), the idle games, and Minecraft Classic all load immediately.

**Only the 6 `crazygames.com/embed/<slug>` games need a step.** Getaway Shootout,
Duck Life, Drift Hunters, Rooftop Snipers, House of Hazards, and 12 MiniBattles
use CrazyGames' embed endpoint, which only allows framing from **domains you
register** (free) in the [CrazyGames Developer Portal](https://developer.crazygames.com/)
→ Embed:

1. Sign up, add `recessgames.com` (and any staging domain) as an allowed domain.
2. They then render on that domain. They stay blocked on `localhost` and any
   unregistered origin — not a bug.

Every embed page shows an automatic **"Game not loading? Open it on the original
site ↗"** fallback link (`js/player.js`), so a frame-blocked game is never a dead
end — before you register the domain, those 6 still send players to the real game.

If you'd rather not depend on CrazyGames at all,
[GameDistribution DGI](https://gamedistribution.com/publishers/embedded-links/)
gives per-game iframe codes that frame anywhere **and** pay a revenue share.

## Ads (Adsterra)

Ad slots live in the layout as `<div class="ad-slot" data-ad="...">` and are
driven by `js/ads.js`. Until you add keys they show labeled placeholders.

To go live:
1. Adsterra dashboard → Websites → add `recessgames.com`.
2. Create ad units (Banner 728×90, Banner 300×250, optionally Social Bar / Popunder).
3. Put the keys/URLs into the `ADS` object at the top of `js/ads.js` and set
   `enabled: true`.

`privacy.html` already discloses Adsterra + cookie choices.

## Deploy (Cloudflare Pages — free)

1. Push this folder to its **own** GitHub repo (separate from Reddomo).
2. Cloudflare → Workers & Pages → Create → Pages → connect the repo.
3. Build command: *(none)*. Output directory: `/` (root).
4. Add the custom domain under **Custom domains**.

Placeholder domain `recessgames.com` is hard-coded in canonical/OG/sitemap tags
and in `js/main.js` / `js/player.js`. Search-and-replace it once you pick the
real domain.

## Structure

```
index.html      home + game grid + ad slots
game.html       the player (loads a game by ?id=) + ad slot
about.html, privacy.html
css/styles.css  cool electric-blue theme
js/catalog.js   << the game list — edit this to add games
js/main.js      grid + search + homepage structured data
js/player.js    loads the selected game + per-game SEO
js/ads.js       Adsterra ad-slot loader (add keys here)
js/disguise.js  "boss key" tab disguise (header button or ` key)
assets/         logo, og image, thumbnails
```
