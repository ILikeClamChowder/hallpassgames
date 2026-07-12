// ============================================================
//  Hall Pass game catalog  (embeds-only)
//
//  Hall Pass is the "cast a wide net" site: games are embedded from external
//  hosts, with a couple self-hosted wrappers for games that need one.
//
//  type    "embed" -> loads `src` (external URL) inside our player iframe
//          "self"  -> loads games/<id>/index.html (self-hosted wrapper page)
//          "link"  -> opens `src` in a new tab (hosts that block embedding)
//
//  --- Sourcing note ---
//  Most games load from the game's own official site (slither.io, krunker.io,
//  diep.io, etc.). A handful of portal-exclusive titles (Getaway Shootout, Duck
//  Life, Drift Hunters, 1v1.LOL, Pac-Man, Rooftop Snipers) have no official
//  embeddable copy, so they use clean single-game mirror hosts (mostly
//  *.github.io) or a self-hosted wrapper. Those are best-effort "works today"
//  sources — they can break or change; the player shows an "open on the
//  original site" fallback if an embed fails.
//
//  Fields: id, title, cat, tags, type, src, blurb, thumb, icon, color, featured
// ============================================================

const CATEGORIES = ["All", "Action", "Shooter", "io", "Racing", "2 Player", "Arcade", "Puzzle", "Idle", "Sandbox"];

const CATALOG = [
  // ---- marquee popular games ----
  {
    id: "getaway-shootout", title: "Getaway Shootout", cat: "2 Player",
    tags: ["shooter", "party", "2 player", "ragdoll", "race"], type: "self",
    blurb: "Race to the getaway by any means — a chaotic 2-player ragdoll shooter.",
    thumb: "assets/thumbs/getaway-shootout.jpg", icon: "🔫", color: "#2a3550", featured: true,
  },
  {
    id: "ducklife", title: "Duck Life 4", cat: "Arcade",
    tags: ["duck", "rpg", "race", "train", "kids"], type: "embed",
    src: "https://ikyih.github.io/DuckLife4/",
    blurb: "Train your duckling to run, fly and swim its way to championship glory.",
    icon: "🦆", color: "#2f7d4f", featured: true,
  },
  {
    id: "drift-hunters", title: "Drift Hunters", cat: "Racing",
    tags: ["car", "drift", "racing", "3d", "tuning"], type: "embed",
    src: "https://cyamanz.github.io/play/drift-hunters/index.html",
    blurb: "Tune real cars and rack up points sliding around detailed 3D tracks.",
    thumb: "assets/thumbs/drift-hunters.jpg", icon: "🏎️", color: "#2c2430", featured: true,
  },
  {
    id: "smash-karts", title: "Smash Karts", cat: "io",
    tags: ["kart", "battle", "io", "multiplayer", "3d"], type: "embed",
    src: "https://smashkarts.io/",
    blurb: "Blast rivals in a 3D kart battle arena. Grab weapons, don't get smashed.",
    thumb: "assets/thumbs/smash-karts.jpg", icon: "🏎️", color: "#3a2a12", featured: true,
  },

  // ---- reliable standalone hits (frame anywhere — no registration needed) ----
  {
    id: "slither", title: "Slither.io", cat: "io",
    tags: ["snake", "io", "multiplayer", "classic"], type: "embed", src: "https://slither.io/",
    blurb: "Grow the longest snake on the server. Cut people off, eat their glow.",
    thumb: "assets/thumbs/slither.jpg", icon: "🐍", color: "#12242a", featured: true,
  },
  {
    id: "1v1-lol", title: "1v1.LOL", cat: "Shooter",
    tags: ["build", "shooter", "battle", "fortnite", "1v1"], type: "embed",
    src: "https://cyamanz.github.io/play/1v1-lol/index.html",
    blurb: "Build-and-blast third-person duels — the browser build-battle everyone knows.",
    thumb: "assets/thumbs/1v1lol.jpg", icon: "🔫", color: "#243044", featured: true,
  },
  {
    id: "paper-io", title: "Paper.io 2", cat: "io",
    tags: ["io", "territory", "multiplayer", "arcade"], type: "embed", src: "https://paper-io.com/",
    blurb: "Claim the map by drawing loops — just don't let anyone cross your tail.",
    thumb: "assets/thumbs/paper-io.jpg", icon: "🟦", color: "#141b28",
  },
  {
    id: "territorial", title: "Territorial.io", cat: "io",
    tags: ["strategy", "io", "risk", "map", "conquer"], type: "embed", src: "https://territorial.io/",
    blurb: "Simple, ruthless map conquest — outnumber every neighbor and take the world.",
    thumb: "assets/thumbs/territorial.png", icon: "🗺️", color: "#0f1a24",
  },
  {
    id: "digdig", title: "Digdig.io", cat: "io",
    tags: ["io", "dig", "multiplayer", "arcade"], type: "embed", src: "https://digdig.io/",
    blurb: "Dig tunnels, grow bigger, and swallow smaller diggers underground.",
    thumb: "assets/thumbs/digdig.png", icon: "⛏️", color: "#2e1e10",
  },
  {
    id: "pacman", title: "Pac-Man", cat: "Arcade",
    tags: ["classic", "arcade", "maze", "retro"], type: "embed", src: "https://cyamanz.github.io/play/pacman/index.html",
    blurb: "The maze-chase arcade legend — clear the dots, dodge the ghosts.",
    thumb: "assets/thumbs/pacman.jpg", icon: "🟡", color: "#05060f",
  },
  {
    id: "rooftop-snipers", title: "Rooftop Snipers", cat: "2 Player",
    tags: ["shooter", "2 player", "party", "physics"], type: "embed",
    src: "https://cyamanz.github.io/play/rooftop-snipers/index.html",
    blurb: "One button, two players, one goal — knock your rival off the roof.",
    thumb: "assets/thumbs/rooftop-snipers.jpg", icon: "🎯", color: "#33263f",
  },

  // ---- .io / multiplayer ----
  {
    id: "krunker", title: "Krunker", cat: "Shooter",
    tags: ["fps", "shooter", "multiplayer", "3d", "io"], type: "embed", src: "https://krunker.io/",
    blurb: "Fast, blocky browser FPS. Frag your way up the leaderboard.",
    thumb: "assets/thumbs/krunker.png", icon: "🎯", color: "#d94f3a", featured: true,
  },
  {
    id: "diep", title: "Diep.io", cat: "io",
    tags: ["io", "tanks", "shooter", "multiplayer", "upgrade"], type: "embed", src: "https://diep.io/",
    blurb: "Upgrade your tank, farm shapes, and take down the leaderboard.",
    thumb: "assets/thumbs/diep.png", icon: "🔺", color: "#2b333d",
  },
  {
    id: "zombsroyale", title: "ZombsRoyale.io", cat: "io",
    tags: ["battle royale", "io", "shooter", "last one standing"], type: "embed", src: "https://zombsroyale.io/",
    blurb: "2D battle royale — loot, land, and be the last one standing.",
    thumb: "assets/thumbs/zombsroyale.jpg", icon: "🪂", color: "#2f6b4f",
  },
  {
    id: "isleward", title: "Isleward", cat: "Action",
    tags: ["mmo", "rpg", "roguelike", "online"], type: "embed", src: "https://play.isleward.com/",
    blurb: "A free browser MMORPG roguelike — level up alongside players worldwide.",
    thumb: "assets/thumbs/isleward.png", icon: "⚔️", color: "#8a4fd0",
  },
  {
    id: "skribbl", title: "Skribbl", cat: "io",
    tags: ["draw", "guess", "party", "online"], type: "embed", src: "https://skribbl.io/",
    blurb: "Draw and guess with a room full of players. Chaos and giggles.",
    thumb: "assets/thumbs/skribbl.png", icon: "🎨", color: "#4a8cf0",
  },

  // ---- arcade / racing ----
  {
    id: "hexgl", title: "HexGL", cat: "Racing",
    tags: ["racing", "3d", "futuristic", "webgl"], type: "embed", src: "https://hexgl.bkcore.com/play/",
    blurb: "A gorgeous futuristic hover-racer. Blazing speed.",
    thumb: "assets/thumbs/hexgl.png", icon: "🏎️", color: "#22a3c4",
  },
  {
    id: "dino-run", title: "Dino Run", cat: "Arcade",
    tags: ["runner", "chrome", "t-rex", "endless"], type: "embed", src: "https://wayou.github.io/t-rex-runner/",
    blurb: "The offline Chrome dino — jump the cacti, chase a high score.",
    icon: "🦖", color: "#232830",
  },
  {
    id: "astray", title: "Astray", cat: "Arcade",
    tags: ["maze", "3d", "marble"], type: "embed", src: "https://wwwtyro.github.io/Astray/",
    blurb: "Tilt a marble through a slick 3D maze.",
    icon: "🌀", color: "#141c1e",
  },
  {
    id: "ztype", title: "ZType", cat: "Arcade",
    tags: ["typing", "shooter", "space", "words"], type: "embed", src: "https://zty.pe/",
    blurb: "Type the words to blast incoming ships. Fast fingers win.",
    thumb: "assets/thumbs/ztype.jpg", icon: "⌨️", color: "#2a7de0",
  },
  {
    id: "typeracer", title: "TypeRacer", cat: "Arcade",
    tags: ["typing", "racing", "multiplayer", "words"], type: "embed", src: "https://play.typeracer.com/",
    blurb: "Race other players by typing text passages as fast as you can.",
    thumb: "assets/thumbs/typeracer.png", icon: "🏁", color: "#1a4a7a",
  },

  // ---- puzzle ----
  {
    id: "hextris", title: "Hextris", cat: "Puzzle",
    tags: ["tetris", "blocks", "hexagon"], type: "embed", src: "https://hextris.io/",
    blurb: "Addictive hexagon spin on falling blocks.",
    thumb: "assets/thumbs/hextris.webp", icon: "🔷", color: "#d9407a",
  },
  {
    id: "hello-wordl", title: "hello wordl", cat: "Puzzle",
    tags: ["word", "wordle", "guess"], type: "embed", src: "https://hellowordl.net/",
    blurb: "Guess the hidden word in six tries. Endless rounds.",
    thumb: "assets/thumbs/hello-wordl.webp", icon: "🔤", color: "#6aaa64",
  },
  {
    id: "solitaire", title: "Solitaire", cat: "Puzzle",
    tags: ["cards", "klondike", "patience"], type: "embed", src: "https://www.solitr.com/",
    blurb: "Classic Klondike solitaire — the study-hall staple.",
    icon: "🃏", color: "#124a2f",
  },
  {
    id: "little-alchemy-2", title: "Little Alchemy 2", cat: "Puzzle",
    tags: ["combine", "elements", "discovery", "relaxing"], type: "embed", src: "https://littlealchemy2.com/",
    blurb: "Combine elements to discover hundreds more. Start with earth, air, fire, water.",
    thumb: "assets/thumbs/little-alchemy-2.jpg", icon: "⚗️", color: "#5a1a4a",
  },
  {
    id: "untrusted", title: "Untrusted", cat: "Puzzle",
    tags: ["coding", "javascript", "escape"], type: "embed", src: "https://alexnisnevich.github.io/untrusted/",
    blurb: "Escape each level by rewriting its JavaScript. Genius.",
    icon: "💻", color: "#0e140e",
  },

  // ---- sandbox ----
  {
    id: "minecraft-classic", title: "Minecraft Classic", cat: "Sandbox",
    tags: ["build", "blocks", "mojang"], type: "embed", src: "https://classic.minecraft.net/",
    blurb: "The original Minecraft, free from Mojang. Build anything.",
    thumb: "assets/thumbs/minecraft-classic.jpg", icon: "⛏️", color: "#151a26", featured: true,
  },
  {
    id: "minecraft-152", title: "Minecraft 1.5.2", cat: "Sandbox",
    tags: ["build", "blocks", "mojang", "survival"], type: "embed", src: "https://sd592g.github.io/zj684od4lfg/",
    blurb: "Full Minecraft 1.5.2 in the browser — survival, crafting, the works.",
    thumb: "assets/thumbs/minecraft-152.jpg", icon: "⛏️", color: "#3a2a18",
  },
  {
    id: "sandspiel", title: "Sandspiel", cat: "Sandbox",
    tags: ["falling sand", "physics", "toy", "elements"], type: "embed", src: "https://sandspiel.club/",
    blurb: "A mesmerizing falling-sand playground — fire, water, plants, lava.",
    icon: "🧪", color: "#201812",
  },

  // ---- idle / incremental ----
  {
    id: "paperclips", title: "Universal Paperclips", cat: "Idle",
    tags: ["incremental", "clicker", "ai"], type: "embed", src: "https://www.decisionproblem.com/paperclips/",
    blurb: "Turn the whole universe into paperclips. Weirdly gripping.",
    icon: "📎", color: "#e0ded9",
  },
  {
    id: "cookie-clicker", title: "Cookie Clicker", cat: "Idle",
    tags: ["incremental", "clicker"], type: "link", src: "https://orteil.dashnet.org/cookieclicker/",
    blurb: "Bake absurd numbers of cookies. Opens on the official site.",
    thumb: "assets/thumbs/cookie-clicker.webp", icon: "🍪", color: "#b06a3b",
  },
  {
    id: "candy-box-2", title: "Candy Box 2", cat: "Idle",
    tags: ["incremental", "adventure", "ascii"], type: "embed", src: "https://candybox2.github.io/",
    blurb: "A quirky incremental adventure that keeps unfolding. Eat the candies… or don't.",
    icon: "🍬", color: "#1a1220",
  },
  {
    id: "trimps", title: "Trimps", cat: "Idle",
    tags: ["incremental", "idle", "strategy"], type: "embed", src: "https://trimps.github.io/",
    blurb: "Deep idle strategy — breed Trimps, explore, and never stop growing.",
    icon: "📈", color: "#12211a",
  },
  {
    id: "a-dark-room", title: "A Dark Room", cat: "Idle",
    tags: ["text", "adventure", "incremental"], type: "embed", src: "https://adarkroom.doublespeakgames.com/",
    blurb: "A cult-classic minimalist adventure. Stoke the fire…",
    thumb: "assets/thumbs/a-dark-room.png", icon: "🔥", color: "#8a8f98",
  },

  // ---- skill (opens on the dev's site; blocks embedding) ----
  {
    id: "qwop", title: "QWOP", cat: "Arcade",
    tags: ["ragdoll", "foddy", "hard", "running"], type: "link", src: "https://www.foddy.net/Athletics.html",
    blurb: "The infamous running game. Good luck. Opens on Foddy's site.",
    icon: "🏃", color: "#222d40",
  },
];
