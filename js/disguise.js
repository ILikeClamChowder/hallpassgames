// ============================================================
//  Disguise / "boss key" — swaps the tab title + favicon to look
//  like schoolwork. Default is off (real Recess). The choice is
//  saved so the whole site stays disguised while you browse & play.
//  Trigger: the header button, or press the ` (backtick) key.
// ============================================================
(function () {
  const KEY = "recess_disguise";

  // --- trademark-safe, generic category icons (data-URI SVGs) ---
  const svg = (inner) =>
    "data:image/svg+xml," +
    encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">' + inner + "</svg>");

  const icoDoc = svg('<rect width="24" height="24" rx="4" fill="#1a73e8"/><rect x="6" y="3.5" width="12" height="17" rx="1.5" fill="#fff"/><rect x="8" y="8" width="8" height="1.5" fill="#1a73e8"/><rect x="8" y="11" width="8" height="1.5" fill="#1a73e8"/><rect x="8" y="14" width="5" height="1.5" fill="#1a73e8"/>');
  const icoBoard = svg('<rect width="24" height="24" rx="4" fill="#0f9d58"/><rect x="4.5" y="6" width="15" height="10" rx="1" fill="#fff"/><circle cx="12" cy="11" r="2.4" fill="#0f9d58"/><rect x="10.5" y="12.5" width="3" height="4" rx="1.4" fill="#0f9d58"/>');
  const icoFolder = svg('<rect width="24" height="24" rx="4" fill="#f1f3f4"/><path d="M4 8a1 1 0 011-1h4l1.5 1.5H19a1 1 0 011 1V17a1 1 0 01-1 1H5a1 1 0 01-1-1z" fill="#ffba00"/>');
  const icoLeaf = svg('<rect width="24" height="24" rx="4" fill="#14bf96"/><path d="M6 17c0-6 5-10 12-10 0 7-5 11-12 10z" fill="#fff"/><path d="M9 15c2-3 4-4 6-5" stroke="#14bf96" stroke-width="1.3" fill="none"/>');
  const icoCalc = svg('<rect width="24" height="24" rx="4" fill="#455a64"/><rect x="6" y="4" width="12" height="16" rx="1.5" fill="#fff"/><rect x="7.5" y="6" width="9" height="3" rx="1" fill="#90a4ae"/><g fill="#455a64"><circle cx="9" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="15" r="1"/><circle cx="12" cy="15" r="1"/><circle cx="15" cy="15" r="1"/></g>');

  // index 0 is "off" — real site
  const DISGUISES = [
    null,
    { title: "Home", favicon: icoBoard },                         // Google Classroom vibe
    { title: "Untitled document - Google Docs", favicon: icoDoc },
    { title: "My Drive - Google Drive", favicon: icoFolder },
    { title: "Dashboard | Khan Academy", favicon: icoLeaf },
    { title: "Calculator", favicon: icoCalc },
  ];

  // capture the page's real title + favicon so we can restore them
  const realTitle = document.title;
  function getIconLink() {
    let l = document.querySelector('link[rel~="icon"]');
    if (!l) { l = document.createElement("link"); l.rel = "icon"; document.head.appendChild(l); }
    return l;
  }
  const realFavicon = getIconLink().getAttribute("href");

  function current() { return Math.max(0, Math.min(DISGUISES.length - 1, Number(localStorage.getItem(KEY) || 0))); }

  function apply(idx) {
    const d = DISGUISES[idx];
    const link = getIconLink();
    if (!d) { document.title = realTitle; link.href = realFavicon; }
    else { document.title = d.title; link.href = d.favicon; }
    // update button label
    const btn = document.getElementById("disguise-btn");
    if (btn) btn.setAttribute("aria-pressed", d ? "true" : "false");
  }

  function cycle() {
    const next = (current() + 1) % DISGUISES.length;
    localStorage.setItem(KEY, next);
    apply(next);
  }

  // --- inject a subtle button into the header nav ---
  function injectButton() {
    const nav = document.querySelector(".nav");
    if (!nav || document.getElementById("disguise-btn")) return;
    const style = document.createElement("style");
    style.textContent =
      "#disguise-btn{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;margin-left:4px;" +
      "border-radius:999px;background:var(--ground-2,#211812);border:1px solid var(--line,#3a2a22);color:var(--muted,#b39c92);" +
      "cursor:pointer;transition:color .15s,background .15s,border-color .15s;padding:0;}" +
      "#disguise-btn:hover{color:var(--text,#f6ede8);border-color:var(--line-2,#4a362c);}" +
      "#disguise-btn[aria-pressed=true]{color:#67a8ff;border-color:#67a8ff;}" +
      "#disguise-btn svg{width:17px;height:17px;}";
    document.head.appendChild(style);

    const btn = document.createElement("button");
    btn.id = "disguise-btn";
    btn.type = "button";
    btn.title = "Quick disguise — makes this tab look like schoolwork (or press ` )";
    btn.setAttribute("aria-label", "Disguise tab");
    // incognito-glasses glyph
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M2 12h20"/><path d="M5 12c0-1 .5-2 2-2h2c1.5 0 2 1 2 2a2 2 0 01-4 0"/>' +
      '<path d="M13 12c0-1 .5-2 2-2h2c1.5 0 2 1 2 2a2 2 0 01-4 0"/></svg>';
    btn.addEventListener("click", cycle);
    nav.appendChild(btn);
  }

  // hotkey (works on pages where focus isn't inside a game iframe)
  addEventListener("keydown", (e) => {
    if (e.key === "`" && !/input|textarea/i.test((e.target.tagName || ""))) { e.preventDefault(); cycle(); }
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
  function start() { injectButton(); apply(current()); }
})();
