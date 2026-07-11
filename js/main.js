// Homepage: featured row, category chips, live search, grid rendering.
(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const grid = document.getElementById("grid");
  if (!grid) return; // not the homepage

  const featuredWrap = document.getElementById("featured-section");
  const featuredGrid = document.getElementById("featured");
  const allLabel = document.getElementById("all-label");
  const emptyEl = document.getElementById("empty");
  const search = document.getElementById("search");
  const chipsEl = document.getElementById("chips");

  const EXT_ICON =
    '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>';

  let activeCat = "All";
  let query = "";

  function tile(game, big) {
    const external = game.type === "link";
    const a = document.createElement("a");
    a.className = "tile" + (big ? " big" : "");
    if (external) {
      a.href = game.src;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    } else {
      a.href = "game.html?id=" + encodeURIComponent(game.id);
    }

    const art = document.createElement("div");
    art.className = "tile-art";
    if (game.thumb) {
      art.style.backgroundColor = game.color || "#211812"; // shows behind transparent images
      art.style.backgroundImage = `url("${game.thumb}")`;
    } else {
      art.style.background =
        `radial-gradient(120% 130% at 28% 18%, ${mix(game.color)}, ${game.color} 62%, ${shade(game.color)})`;
      const glyph = document.createElement("span");
      if (game.icon) { glyph.className = "emoji"; glyph.textContent = game.icon; }
      else { glyph.className = "letter"; glyph.textContent = game.title.charAt(0); }
      art.appendChild(glyph);
    }
    const badge = document.createElement("span");
    if (external) { badge.className = "tile-badge ext"; badge.textContent = "official ↗"; art.appendChild(badge); }
    else if (game.type === "embed") { badge.className = "tile-badge"; badge.textContent = "embed"; art.appendChild(badge); }

    const info = document.createElement("div");
    info.className = "tile-info";
    const title = document.createElement("div");
    title.className = "tile-title";
    title.innerHTML = escapeHtml(game.title) + (external ? EXT_ICON : "");
    const blurb = document.createElement("div");
    blurb.className = "tile-blurb";
    blurb.textContent = game.blurb || "";
    info.appendChild(title);
    if (big) info.appendChild(blurb);
    else {
      const cat = document.createElement("div");
      cat.className = "tile-cat";
      cat.textContent = game.cat;
      info.appendChild(cat);
    }

    a.appendChild(art);
    a.appendChild(info);
    return a;
  }

  // lighten a hex color a touch for the tile gradient highlight
  function mix(hex) {
    const c = hex.replace("#", "");
    const n = parseInt(c.length === 3 ? c.replace(/(.)/g, "$1$1") : c, 16);
    let r = (n >> 16) + 40, g = ((n >> 8) & 255) + 40, b = (n & 255) + 40;
    r = Math.min(255, r); g = Math.min(255, g); b = Math.min(255, b);
    return `rgb(${r},${g},${b})`;
  }
  function shade(hex) {
    const c = hex.replace("#", "");
    const n = parseInt(c.length === 3 ? c.replace(/(.)/g, "$1$1") : c, 16);
    const r = Math.max(0, (n >> 16) - 55), g = Math.max(0, ((n >> 8) & 255) - 55), b = Math.max(0, (n & 255) - 55);
    return `rgb(${r},${g},${b})`;
  }
  function escapeHtml(s) { const d = document.createElement("div"); d.textContent = s; return d.innerHTML; }

  function matches(game) {
    if (game.hidden) return false;
    if (activeCat !== "All" && game.cat !== activeCat) return false;
    if (!query) return true;
    const hay = (game.title + " " + game.cat + " " + (game.tags || []).join(" ")).toLowerCase();
    return hay.includes(query);
  }

  function render() {
    const list = CATALOG.filter(matches);
    const showFeatured = activeCat === "All" && !query;

    featuredWrap.hidden = !showFeatured;
    if (showFeatured) {
      featuredGrid.innerHTML = "";
      CATALOG.filter((g) => g.featured && !g.hidden).forEach((g) => featuredGrid.appendChild(tile(g, true)));
    }
    allLabel.textContent = showFeatured ? "All games" : (query ? "Results" : activeCat);
    allLabel.hidden = list.length === 0;

    grid.innerHTML = "";
    list.forEach((g) => grid.appendChild(tile(g, false)));
    emptyEl.hidden = list.length !== 0;
  }

  // category chips
  CATEGORIES.forEach((cat) => {
    const b = document.createElement("button");
    b.className = "chip" + (cat === "All" ? " active" : "");
    b.textContent = cat;
    b.setAttribute("role", "tab");
    b.addEventListener("click", () => {
      activeCat = cat;
      [...chipsEl.children].forEach((c) => c.classList.toggle("active", c === b));
      render();
    });
    chipsEl.appendChild(b);
  });

  if (search) {
    search.addEventListener("input", () => { query = search.value.trim().toLowerCase(); render(); });
  }

  render();

  // ---- ItemList structured data: expose the full catalog to search engines ----
  (function itemListLd() {
    const visible = CATALOG.filter((g) => !g.hidden);
    const items = visible.map((g, i) => {
      const url = g.type === "link"
        ? g.src
        : "https://hallpassgames.com/game.html?id=" + encodeURIComponent(g.id);
      return {
        "@type": "ListItem",
        "position": i + 1,
        "name": g.title,
        "url": url,
        ...(g.thumb ? { "image": "https://hallpassgames.com/" + g.thumb.replace(/^\//, "") } : {}),
      };
    });
    const ld = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Hall Pass — browser games",
      "numberOfItems": items.length,
      "itemListElement": items,
    };
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);
  })();
})();
