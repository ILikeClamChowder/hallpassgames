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
    thumb: "assets/thumbs/ducklife.jpg", icon: "🦆", color: "#2f7d4f", featured: true,
  },
  {
    id: "drift-hunters", title: "Drift Hunters", cat: "Racing",
    tags: ["car", "drift", "racing", "3d", "tuning"], type: "embed",
    src: "https://cyamanz.github.io/play/drift-hunters/index.html",
    blurb: "Tune real cars and rack up points sliding around detailed 3D tracks.",
    about: "Drift Hunters is a 3D car-drifting game where you earn points by sliding real-world cars around detailed tracks, then spend your winnings tuning and upgrading your garage. Bigger, longer, higher-angle drifts build fatter score multipliers and more cash for your next build.",
    howto: "Drive with the arrow keys or WASD, tap the handbrake (Space) to break traction and start a drift, then feather the throttle and countersteer to hold the slide. Bank your points in the shop to upgrade power, tires, and paint.",
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
    about: "Slither.io is a massively multiplayer take on classic Snake: you're a glowing worm sharing one huge arena with players worldwide, eating pellets to grow longer. Cut in front of a rival so their head hits your body and they burst into orbs you can gobble to grow even faster.",
    howto: "Move with your mouse — your snake follows the cursor. Hold left-click or Space for a speed boost that costs a little length. Never let your head touch another snake, and try to trap bigger players into crossing your path.",
    thumb: "assets/thumbs/slither.jpg", icon: "🐍", color: "#12242a", featured: true,
  },
  {
    id: "1v1-lol", title: "2v2.io", cat: "Shooter",
    tags: ["build", "shooter", "battle", "fortnite", "1v1", "2v2"], type: "embed",
    src: "https://2v2.io/",
    blurb: "Build-and-blast third-person duels — live 1v1 & 2v2 build-battles online.",
    about: "2v2.io is a fast build-and-shoot arena for live 1v1 and 2v2 duels online: out-aim your opponent while throwing up instant ramps, walls, and floors for cover. It's the browser build-battle formula fans of 1v1.lol love, running on live servers against real players.",
    howto: "Move with WASD, aim and fire with the mouse, and swap between your weapon and build pieces with the number keys or Q. Slam down a wall or ramp the moment you take fire, then push your edit-and-shoot advantage.",
    thumb: "assets/thumbs/2v2.webp", icon: "🔫", color: "#1a4a7a", featured: true,
  },
  {
    id: "shell-shockers", title: "Shell Shockers", cat: "Shooter",
    tags: ["shooter", "fps", "multiplayer", "eggs", "io"], type: "embed",
    src: "https://scrambled.world/",
    blurb: "The egg-armed multiplayer FPS — crack rivals in fast free-for-all shootouts.",
    thumb: "assets/thumbs/shell-shockers.jpg", icon: "🥚", color: "#3a2a12", featured: true,
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

  // ---- more triplereddd classics ----
  {
    id: "slope", title: "Slope", cat: "Arcade",
    tags: ["endless", "3d", "ball", "runner", "reflex"], type: "embed",
    src: "https://cyamanz.github.io/play/slope/index.html",
    blurb: "Race a ball down an endless neon slope — one wrong move and you're gone.",
    about: "Slope is a high-speed 3D endless runner where you guide a rolling ball down a steep neon course, dodging obstacles and gaps while the speed keeps climbing. It's famous for its brutal difficulty and that 'just one more run' pull — every descent is randomly generated, so no two runs play the same.",
    howto: "Steer with the Left and Right arrow keys (or A and D) to keep the ball on the track. Avoid the red blocks, don't roll off the edges, and survive as long as you can — it only gets faster.",
    thumb: "assets/thumbs/slope.jpg", icon: "🎿", color: "#0a0f1e", featured: true,
  },
  {
    id: "big-tower-tiny-square", title: "Big Tower Tiny Square", cat: "Arcade",
    tags: ["platformer", "precision", "skill", "tower"], type: "embed",
    src: "https://bigtowertinysquare.github.io/",
    blurb: "Climb a brutal precision-platformer tower to rescue your Pineapple.",
    thumb: "assets/thumbs/big-tower-tiny-square.jpg", icon: "🟧", color: "#2a1430",
  },
  {
    id: "doodle-jump", title: "Doodle Jump", cat: "Arcade",
    tags: ["jump", "endless", "mobile", "classic"], type: "embed",
    src: "https://cyamanz.github.io/play/doodle-jump/index.html",
    blurb: "Bounce ever higher on wobbly platforms — the mobile classic.",
    thumb: "assets/thumbs/doodle-jump.jpg", icon: "🟢", color: "#1c2a3a",
  },
  {
    id: "2048", title: "2048", cat: "Puzzle",
    tags: ["numbers", "slide", "brain", "merge"], type: "embed",
    src: "https://ilikeclamchowder.github.io/2048/",
    blurb: "Slide tiles and merge your way up to the elusive 2048 tile.",
    thumb: "assets/thumbs/2048.jpg", icon: "🔢", color: "#e0a92a",
  },
  {
    id: "age-of-war", title: "Age of War", cat: "Arcade",
    tags: ["strategy", "tug of war", "defense", "evolution", "flash"], type: "self",
    blurb: "Defend your base and evolve through the ages to crush the enemy — the classic.",
    thumb: "assets/thumbs/age-of-war.jpg", icon: "🏰", color: "#3a3020", featured: true,
  },
  {
    id: "age-of-war-2", title: "Age of War 2", cat: "Arcade",
    tags: ["strategy", "tug of war", "defense", "evolution", "flash"], type: "self",
    blurb: "The sequel — more ages, more units, more mayhem across the battlefield.",
    thumb: "assets/thumbs/age-of-war-2-v2.jpg", icon: "🏰", color: "#33291a",
  },
  {
    id: "learn-to-fly", title: "Learn to Fly", cat: "Arcade",
    tags: ["launch", "upgrade", "penguin", "distance", "flash"], type: "self",
    blurb: "Launch a penguin, earn cash, upgrade, and finally learn to fly.",
    thumb: "assets/thumbs/learn-to-fly.jpg", icon: "🐧", color: "#1a3a4a",
  },
  {
    id: "1-on-1-soccer", title: "1 on 1 Soccer", cat: "2 Player",
    tags: ["soccer", "sports", "2 player", "versus", "flash"], type: "self",
    blurb: "Frantic one-button soccer duels — score before your rival does.",
    thumb: "assets/thumbs/1-on-1-soccer.jpg", icon: "⚽", color: "#1c3a24",
  },
  {
    id: "bloxorz", title: "Bloxorz", cat: "Puzzle",
    tags: ["blocks", "logic", "roll", "brain", "flash"], type: "self",
    blurb: "Roll the block to the hole without falling off the edge. Fiendish.",
    thumb: "assets/thumbs/bloxorz.jpg", icon: "🟫", color: "#20242e",
  },

  // ---- arcade / racing / skill classics ----
  {
    id: "moto-x3m", title: "Moto X3M", cat: "Racing",
    tags: ["bike", "stunt", "racing", "obstacle", "time trial"], type: "embed",
    src: "https://cyamanz.github.io/play/motox3m/",
    blurb: "Blast through explosive obstacle courses on a dirt bike — beat the clock, nail the flips.",
    about: "Moto X3M is a time-trial dirt-bike game built around explosive, physics-driven obstacle courses. Flip through the air for a time bonus, thread past saws and swinging hazards, and shave every second off the clock to earn all three stars on a level.",
    howto: "Press Up or W to accelerate, Down or S to brake and reverse, and Left/Right to lean and rotate in mid-air. Land your flips cleanly — bailing costs time, and the clock is everything.",
    thumb: "assets/thumbs/moto-x3m.jpg", icon: "🏍️", color: "#3a2a12", featured: true,
  },
  {
    id: "run-3", title: "Run 3", cat: "Arcade",
    tags: ["runner", "space", "endless", "skill", "platform"], type: "embed",
    src: "https://cyamanz.github.io/play/run3/",
    blurb: "Sprint and leap through crumbling tunnels in space — don't fall into the void.",
    about: "Run 3 is an endless space-runner where a little alien sprints and leaps through crumbling tunnels floating in the void. Jump the gaps, rotate the tunnel to run along its walls and ceiling, and get as deep as you can before a missing tile drops you into space.",
    howto: "Use the Left and Right arrow keys to move and Space or Up to jump. Run onto a wall to spin the whole tunnel around you — using the sides is the key to crossing the biggest gaps.",
    thumb: "assets/thumbs/run-3.jpg", icon: "🌌", color: "#1a1440", featured: true,
  },
  {
    id: "vex-3", title: "Vex 3", cat: "Action",
    tags: ["platformer", "parkour", "stickman", "obstacle", "skill"], type: "embed",
    src: "https://cyamanz.github.io/play/vex-3/",
    blurb: "A brutal stickman parkour gauntlet of saws, spikes and split-second jumps.",
    thumb: "assets/thumbs/vex-3.jpg", icon: "🏃", color: "#1c2630",
  },
  {
    id: "vex-4", title: "Vex 4", cat: "Action",
    tags: ["platformer", "parkour", "stickman", "obstacle", "skill"], type: "embed",
    src: "https://cyamanz.github.io/play/vex-4/",
    blurb: "More traps, more acts — the stickman parkour series at its most devious.",
    thumb: "assets/thumbs/vex-4.jpg", icon: "🏃", color: "#22303a",
  },
  {
    id: "happy-wheels", title: "Happy Wheels", cat: "Arcade",
    tags: ["ragdoll", "physics", "obstacle", "gore", "bike"], type: "embed",
    src: "https://cyamanz.github.io/play/happy-wheels/",
    blurb: "The infamous ragdoll obstacle course — survive the traps, or don't. Usually don't.",
    about: "Happy Wheels is the notorious ragdoll physics game where you pilot absurd characters through booby-trapped obstacle courses. Between the brutal traps and a giant library of user-made levels, just reaching the finish line in one piece is half the (gruesome) fun.",
    howto: "Use the arrow keys to accelerate, brake, and lean your weight, and Space for your character's special move like ejecting. Balance carefully — one bad bump launches you straight into the spikes.",
    thumb: "assets/thumbs/happy-wheels.jpg", icon: "🦽", color: "#2a1414",
  },
  {
    id: "cut-the-rope", title: "Cut the Rope", cat: "Puzzle",
    tags: ["physics", "puzzle", "rope", "candy", "logic"], type: "embed",
    src: "https://cyamanz.github.io/play/cut-the-rope/",
    blurb: "Slice ropes to feed candy to Om Nom — a physics puzzle classic.",
    thumb: "assets/thumbs/cut-the-rope.jpg", icon: "🍬", color: "#1c2e14",
  },
  {
    id: "cubefield", title: "Cubefield", cat: "Arcade",
    tags: ["reflex", "endless", "dodge", "retro", "skill"], type: "embed",
    src: "https://cyamanz.github.io/play/cubefield/",
    blurb: "Steer through an endless field of blocks at breakneck speed. One touch and it's over.",
    thumb: "assets/thumbs/cubefield.jpg", icon: "🔻", color: "#141820",
  },
  {
    id: "drift-boss", title: "Drift Boss", cat: "Racing",
    tags: ["drift", "one button", "endless", "car", "timing"], type: "embed",
    src: "https://cyamanz.github.io/play/drift-boss/",
    blurb: "One click to drift — time each turn perfectly and keep the car on the road.",
    thumb: "assets/thumbs/drift-boss.jpg", icon: "🚗", color: "#20182e",
  },
  {
    id: "basketball-stars", title: "Basketball Stars", cat: "2 Player",
    tags: ["basketball", "sports", "2 player", "versus", "arcade"], type: "embed",
    src: "https://cyamanz.github.io/play/basketball-stars/",
    blurb: "Fast 1-on-1 hoops — dunk, steal and drain threes solo or against a friend.",
    thumb: "assets/thumbs/basketball-stars.jpg", icon: "🏀", color: "#2e1c10",
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
    thumb: "assets/thumbs/dino-run.png", icon: "🦖", color: "#232830",
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
    thumb: "assets/thumbs/minecraft-152-v2.jpg", icon: "⛏️", color: "#3a2a18",
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
    id: "potato-patter", title: "Potato Patter", cat: "Idle",
    tags: ["clicker", "incremental", "idle", "original", "potato"], type: "self",
    blurb: "Tap the spud, buy Idahoans, prestige for more — an original clicker by Tate Bell.",
    thumb: "assets/thumbs/potato-patter.jpg", icon: "🥔", color: "#3a2a16",
  },
  {
    id: "slap-marine", title: "Slap-Marine", cat: "Action", ar: "16 / 9",
    tags: ["survival", "underwater", "waves", "action", "original"], type: "self",
    blurb: "Dive deep and slap your way through endless swarms of fish — an original underwater survival brawler by Tate Bell.",
    thumb: "assets/thumbs/slap-marine.jpg", icon: "🤿", color: "#12283a",
  },
  {
    id: "farty-mc-fly", title: "Farty McFly", cat: "Arcade", ar: "16 / 9",
    tags: ["platformer", "physics", "launch", "levels", "original"], type: "self",
    blurb: "Fart your way through stormy obstacle courses — an original momentum platformer by Tate Bell.",
    thumb: "assets/thumbs/farty-mc-fly.jpg", icon: "💨", color: "#20202e",
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
