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

  document.title = game.title + " Unblocked - Play Free | Hall Pass";
  catEl.textContent = game.cat;
  titleEl.textContent = game.title;
  blurbEl.textContent = game.blurb || "";

  // ---- per-game SEO: keep meta/canonical/structured-data in sync with the loaded game ----
  (function seo() {
    const pageUrl = "https://hallpassgames.com/game.html?id=" + encodeURIComponent(game.id);
    // Target the high-intent "<game> unblocked" long-tail these pages actually rank for.
    const desc = ("Play " + game.title + " unblocked and free on Hall Pass — no downloads, no sign-up. " + (game.blurb || "")).replace(/\s+/g, " ").trim();
    // social previews need a raster at large-card size; SVG thumbs won't render on
    // most scrapers, so use the site's 1200x630 og.png for og/twitter images.
    const socialImg = "https://hallpassgames.com/assets/og.png";
    // the game's own thumb (any format) is fine for Google's structured-data rich results.
    const ldImg = game.thumb ? "https://hallpassgames.com/" + game.thumb.replace(/^\//, "") : socialImg;
    const setMeta = (sel, val) => { const el = document.head.querySelector(sel); if (el) el.setAttribute("content", val); };
    setMeta('meta[name="description"]', desc);
    setMeta('meta[property="og:title"]', game.title + " Unblocked — Hall Pass");
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[property="og:url"]', pageUrl);
    setMeta('meta[property="og:image"]', socialImg);
    setMeta('meta[name="twitter:title"]', game.title + " Unblocked — Hall Pass");
    setMeta('meta[name="twitter:description"]', desc);
    setMeta('meta[name="twitter:image"]', socialImg);
    const canon = document.head.querySelector('link[rel="canonical"]');
    if (canon) canon.setAttribute("href", pageUrl);

    const ld = {
      "@context": "https://schema.org",
      "@type": "VideoGame",
      "name": game.title,
      "description": desc,
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

  // ---- on-page content: real, mostly-unique text so each game page has depth to
  //      rank for "<game> unblocked" instead of being a thin iframe wrapper.
  //      Uses bespoke `about`/`howto` from the catalog when present, else composes
  //      a per-game fallback led by the (unique) blurb. ----
  (function about() {
    const wrap = document.getElementById("game-about");
    if (!wrap) return;
    const name = game.title;
    const cat = (game.cat || "browser").toLowerCase();
    const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const about = game.about ||
      `${game.blurb ? game.blurb + " " : ""}${name} is one of many free ${cat} games you can play instantly at Hall Pass — no download and no sign-up required.`;
    const howto = game.howto ||
      "Most games play with your mouse, arrow keys, or WASD — jump in and you'll pick it up in seconds. Everything runs in the browser with nothing to install.";
    const faqs = [
      [`Is ${name} free to play?`, `Yes — ${name} is completely free on Hall Pass. No downloads, no sign-up, no paywall — just click and play.`],
      [`Can I play ${name} unblocked?`, `${name} runs entirely in your browser with nothing to install, so it works on Chromebooks and other computers that allow browser games. If your network blocks it, try again later or from another connection.`],
      [`Do I need to download ${name}?`, `No. ${name} loads instantly in any modern browser on desktop, Chromebook, and mobile.`],
    ];
    wrap.innerHTML =
      `<h2>About ${esc(name)}</h2><p>${esc(about)}</p>` +
      `<h2>How to play ${esc(name)}</h2><p>${esc(howto)}</p>` +
      `<h2>${esc(name)} — frequently asked questions</h2>` +
      faqs.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("");
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(([q, a]) => ({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": a } })),
    };
    const fs = document.createElement("script");
    fs.type = "application/ld+json";
    fs.textContent = JSON.stringify(faqLd);
    document.head.appendChild(fs);
  })();

  // Self-hosted games render at a fixed native size; match the stage to that
  // aspect ratio so a fixed-canvas game (e.g. pygbag 16:9) letterboxes cleanly
  // inside the default 16:10 stage instead of stretching. Ignored in fullscreen,
  // where the frame is sized to fill the screen (both dimensions are definite).
  if (game.ar) frameWrap.style.aspectRatio = game.ar;

  frame.src = game.type === "embed" ? game.src : `games/${game.id}/index.html?v=52`;
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
