// Player page: read ?id=, look it up, load the game into the iframe.
(function () {
  const id = new URLSearchParams(location.search).get("id");
  const game = CATALOG.find((g) => g.id === id);

  const catEl = document.getElementById("game-cat");
  const titleEl = document.getElementById("game-title");
  const blurbEl = document.getElementById("game-blurb");
  const tipEl = document.getElementById("game-tip");
  const frame = document.getElementById("game-frame");
  const frameWrap = document.getElementById("player-frame");
  const missing = document.getElementById("game-missing");
  const fsBtn = document.getElementById("fullscreen");

  // "link" games can't be framed — they should never reach here, but if they do, bounce out.
  if (game && game.type === "link") { location.replace(game.src); return; }

  if (!game) {
    titleEl.textContent = "Not found";
    frameWrap.hidden = true;
    fsBtn.hidden = true;
    missing.hidden = false;
    return;
  }

  document.title = game.title + " · Hall Pass";
  catEl.textContent = game.cat;
  titleEl.textContent = game.title;
  blurbEl.textContent = game.blurb || "";

  // ---- per-game SEO: keep meta/canonical/structured-data in sync with the loaded game ----
  (function seo() {
    const pageUrl = "https://hallpassgames.com/game.html?id=" + encodeURIComponent(game.id);
    const desc = (game.blurb || "Play " + game.title + " free on Hall Pass.") + " Play instantly — free, no downloads.";
    // social previews need a raster at large-card size; SVG thumbs won't render on
    // most scrapers, so use the site's 1200x630 og.png for og/twitter images.
    const socialImg = "https://hallpassgames.com/assets/og.png";
    // the game's own thumb (any format) is fine for Google's structured-data rich results.
    const ldImg = game.thumb ? "https://hallpassgames.com/" + game.thumb.replace(/^\//, "") : socialImg;
    const setMeta = (sel, val) => { const el = document.head.querySelector(sel); if (el) el.setAttribute("content", val); };
    setMeta('meta[name="description"]', desc);
    setMeta('meta[property="og:title"]', game.title + " — Hall Pass");
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[property="og:url"]', pageUrl);
    setMeta('meta[property="og:image"]', socialImg);
    setMeta('meta[name="twitter:title"]', game.title + " — Hall Pass");
    setMeta('meta[name="twitter:description"]', desc);
    setMeta('meta[name="twitter:image"]', socialImg);
    const canon = document.head.querySelector('link[rel="canonical"]');
    if (canon) canon.setAttribute("href", pageUrl);

    const ld = {
      "@context": "https://schema.org",
      "@type": "VideoGame",
      "name": game.title,
      "description": game.blurb || undefined,
      "url": pageUrl,
      "image": ldImg,
      "genre": game.cat,
      "applicationCategory": "Game",
      "operatingSystem": "Any (web browser)",
      "isAccessibleForFree": true,
      "publisher": { "@type": "Organization", "name": "Hall Pass", "url": "https://hallpassgames.com/" },
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    };
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);
  })();
  frame.src = game.type === "embed" ? game.src : `games/${game.id}/index.html?v=48`;
  if (game.type === "embed") {
    tipEl.textContent = "Loaded from the game's official free site.";

    // ---- graceful fallback ----------------------------------------------
    // Some hosts refuse to be framed (X-Frame-Options / CSP frame-ancestors),
    // and CrazyGames' /embed/ endpoint only frames from domains registered in
    // its Developer Portal. When that happens the iframe is just blank with no
    // way out, so always offer a direct "open on the original site" link.
    // For CrazyGames the human-facing page is /game/<slug> (not /embed/<slug>).
    const directUrl = /crazygames\.com\/embed\//.test(game.src)
      ? game.src.replace("/embed/", "/game/")
      : game.src;
    const fb = document.getElementById("game-fallback");
    const fbLink = document.getElementById("game-fallback-link");
    const fbName = document.getElementById("game-fallback-name");
    if (fb && fbLink) {
      fbLink.href = directUrl;
      if (fbName) fbName.textContent = game.title;
      fb.hidden = false;
    }
  }

  fsBtn.addEventListener("click", () => {
    const el = frameWrap;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  });
})();
