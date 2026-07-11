// ============================================================
//  Hall Pass ads — Adsterra loader.
//
//  Hall Pass monetizes with Adsterra (not AdSense). Drop your real zone keys
//  into ADS below and flip `enabled` to true. Until then, every ad slot
//  renders a labeled placeholder so the layout reserves the right space.
//
//  Getting keys: Adsterra dashboard → Websites → add hallpassgames.com →
//  create ad units. A "Banner" unit gives you a key + a script domain; a
//  "Social Bar" / "Popunder" unit gives a single script URL.
// ============================================================
(function () {
  const ADS = {
    enabled: true, // live — real Adsterra keys wired in below

    // Banner units (iframe format).
    banners: {
      leaderboard: { key: "3e3285ef72fb867f7e2bece84ccf3758", domain: "www.highperformanceformat.com", width: 728, height: 90 },
      rectangle:   { key: "08b5f92cabf138ad9ecf795191bc6e13", domain: "www.highperformanceformat.com", width: 300, height: 250 },
    },

    // Page-level scripts (full src from Adsterra).
    socialBar: "https://pl30321214.effectivecpmnetwork.com/f2/8c/66/f28c66861af0a5f3609c57785ad4e9cc.js",
    popunder: "",
  };

  function placeholder(el, w, h, label) {
    el.classList.add("ad-slot--placeholder");
    el.style.minHeight = h + "px";
    el.innerHTML =
      '<span class="ad-slot__tag">Ad</span>' +
      '<span class="ad-slot__note">' + label + ' · ' + w + '×' + h +
      '<br>Adsterra slot — add your key in js/ads.js</span>';
  }

  // Adsterra banners read a global `atOptions`, so each banner lives in its
  // own isolated iframe to avoid multiple units clobbering each other.
  function banner(el, cfg) {
    const iframe = document.createElement("iframe");
    iframe.width = cfg.width; iframe.height = cfg.height;
    iframe.scrolling = "no"; iframe.setAttribute("frameborder", "0");
    iframe.style.cssText = "border:0;display:block;margin:0 auto;overflow:hidden;";
    el.appendChild(iframe);
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(
      '<body style="margin:0">' +
      '<script type="text/javascript">atOptions=' +
      JSON.stringify({ key: cfg.key, format: "iframe", height: cfg.height, width: cfg.width, params: {} }) +
      ';<\/script>' +
      '<script type="text/javascript" src="//' + cfg.domain + '/' + cfg.key + '/invoke.js"><\/script>' +
      '</body>'
    );
    doc.close();
  }

  function loadPageScript(src) {
    if (!src) return;
    const s = document.createElement("script");
    s.type = "text/javascript"; s.src = src; s.async = true;
    document.body.appendChild(s);
  }

  function render() {
    document.querySelectorAll("[data-ad]").forEach((el) => {
      const which = el.getAttribute("data-ad"); // "leaderboard" | "rectangle"
      const cfg = ADS.banners[which] || ADS.banners.leaderboard;
      const label = el.getAttribute("data-ad-label") || which;
      const live = ADS.enabled && cfg && !/^REPLACE_/.test(cfg.key);
      if (live) banner(el, cfg);
      else placeholder(el, cfg.width, cfg.height, label);
    });
    if (ADS.enabled) { loadPageScript(ADS.socialBar); loadPageScript(ADS.popunder); }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();
})();
