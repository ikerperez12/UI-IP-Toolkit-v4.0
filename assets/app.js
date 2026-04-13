const backgroundAudioState = {
  audio: null,
  toggle: null,
  hasUserPaused: false,
  unlockAttached: false,
};

async function copySnippet(btn) {
  const card = btn.closest("[data-snippet]") || btn.closest(".has-copy");
  if (!card) return;

  const type = card.dataset.snippet;
  let code = "";

  if (card.dataset.html) {
    code = card.dataset.html;
  } else if (type === "color") {
    const color = card.dataset.color;
    const name = card.dataset.name;
    code = `<div style="background:${color};width:100px;height:100px"></div>\n<!-- ${name} - ${color} -->`;
  } else if (type === "gradient") {
    const css = card.dataset.css;
    code = `<div style="background:${css};width:100px;height:100px"></div>\n<!-- ${css} -->`;
  } else if (type === "anim") {
    const keyframe = card.dataset.keyframe || "";
    const usage = card.dataset.usage || "";
    code = `<style>${keyframe}</style>\n<div style="${usage}">Animation</div>`;
  } else if (type === "font") {
    code = `font-family: ${card.dataset.font};`;
  } else {
    code = card.innerHTML;
  }

  try {
    await navigator.clipboard.writeText(code);
  } catch {
    const fallback = document.createElement("textarea");
    fallback.value = code;
    fallback.setAttribute("readonly", "");
    fallback.style.position = "absolute";
    fallback.style.left = "-9999px";
    document.body.appendChild(fallback);
    fallback.select();
    document.execCommand("copy");
    fallback.remove();
  }

  const original = btn.innerHTML;
  btn.innerHTML = "Copied";
  btn.classList.add("ok");
  window.setTimeout(() => {
    btn.innerHTML = original;
    btn.classList.remove("ok");
  }, 1600);
}

function setBackgroundAudioState(state) {
  const { toggle } = backgroundAudioState;
  if (!toggle) return;

  const label = toggle.querySelector(".sound-label");
  const isPlaying = state === "playing";
  const isBlocked = state === "blocked";
  const text = isPlaying ? "Sound on" : isBlocked ? "Tap for sound" : "Sound off";

  toggle.dataset.state = state;
  toggle.setAttribute("aria-pressed", String(isPlaying));
  toggle.setAttribute("aria-label", isPlaying ? "Turn background music off" : "Turn background music on");
  toggle.title = text;

  if (label) {
    label.textContent = text;
  }
}

async function playBackgroundAudio() {
  const { audio } = backgroundAudioState;
  if (!audio) return false;

  try {
    audio.muted = false;
    await audio.play();
    setBackgroundAudioState("playing");
    return true;
  } catch {
    setBackgroundAudioState("blocked");
    return false;
  }
}

function attachBackgroundAudioUnlock() {
  if (backgroundAudioState.unlockAttached) return;

  backgroundAudioState.unlockAttached = true;
  const events = ["pointerdown", "keydown", "touchstart", "wheel"];
  const unlock = async () => {
    if (backgroundAudioState.hasUserPaused) return;

    const started = await playBackgroundAudio();
    if (started) {
      events.forEach((eventName) => {
        window.removeEventListener(eventName, unlock);
      });
    }
  };

  events.forEach((eventName) => {
    window.addEventListener(eventName, unlock, { passive: true });
  });
}

function scheduleBackgroundAudioAutoplay() {
  const tryAutoplay = () => {
    if (!backgroundAudioState.hasUserPaused) {
      playBackgroundAudio();
    }
  };

  tryAutoplay();
  window.addEventListener("load", tryAutoplay, { once: true });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      tryAutoplay();
    }
  });
}

function initCursor() {
  const cur = document.getElementById("cur");
  const trl = document.getElementById("trl");
  if (!cur || !trl) return;

  window.addEventListener("mousemove", (event) => {
    cur.style.transform = `translate3d(${event.clientX - 8}px, ${event.clientY - 8}px, 0)`;
    window.setTimeout(() => {
      trl.style.transform = `translate3d(${event.clientX - 2}px, ${event.clientY - 2}px, 0)`;
    }, 50);
  });

  document.addEventListener("mousedown", () => cur.classList.add("ck"));
  document.addEventListener("mouseup", () => cur.classList.remove("ck"));

  const attachHovers = () => {
    document.querySelectorAll("a, button, .has-copy, .cpb").forEach((element) => {
      if (element.dataset.hoverAttached) return;

      element.addEventListener("mouseenter", () => cur.classList.add("h"));
      element.addEventListener("mouseleave", () => cur.classList.remove("h"));
      element.dataset.hoverAttached = "true";
    });
  };

  attachHovers();
  const observer = new MutationObserver(attachHovers);
  observer.observe(document.body, { childList: true, subtree: true });
}

function initCopyButtons() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".cpb");
    if (!button) return;

    event.preventDefault();
    copySnippet(button);
  });
}

function initScrollEffects() {
  const revealItems = document.querySelectorAll(".rv, .sg > *");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("v");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.05, rootMargin: "0px 0px -50px 0px" },
  );

  revealItems.forEach((element) => observer.observe(element));

  window.addEventListener("scroll", () => {
    const progress = document.getElementById("prg");
    if (progress) {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      progress.style.width = `${(winScroll / height) * 100}%`;
    }

    const nav = document.getElementById("nav");
    if (nav) {
      nav.classList.toggle("sc", window.scrollY > 50);
    }
  });
}

function getPaginationItems(grid) {
  return Array.from(grid.children).filter(
    (child) => child.nodeType === 1 && !child.classList.contains("pagination-controls"),
  );
}

function getGridColumnCount(grid) {
  const template = window.getComputedStyle(grid).gridTemplateColumns;
  if (!template || template === "none") return 0;
  return template.split(" ").filter(Boolean).length;
}

function getWrappedColumnCount(items) {
  if (!items.length) return 1;

  items.forEach((item) => {
    item.hidden = false;
  });

  const firstTop = Math.round(items[0].getBoundingClientRect().top);
  let columns = 0;

  for (const item of items) {
    const top = Math.round(item.getBoundingClientRect().top);
    if (Math.abs(top - firstTop) <= 4) {
      columns += 1;
      continue;
    }

    break;
  }

  return Math.max(columns, 1);
}

function measurePageSize(grid, items) {
  if (!items.length) return 1;

  const explicit = Number(grid.dataset.pageSize || 0);
  if (explicit > 0) return Math.min(items.length, explicit);

  const columns = getGridColumnCount(grid) || getWrappedColumnCount(items);
  const rows = window.innerWidth < 640 ? 4 : columns >= 4 ? 3 : columns >= 2 ? 3 : 6;
  const minimum = Number(grid.dataset.minPageSize || (window.innerWidth < 640 ? 5 : 8));

  return Math.min(items.length, Math.max(minimum, columns * rows));
}

function createPaginationControls(grid) {
  let controls = grid.parentElement.querySelector(".pagination-controls");
  if (controls) {
    return controls;
  }

  controls = document.createElement("div");
  controls.className = "pagination-controls";
  controls.innerHTML = `
    <button type="button" class="btn-outline prev-btn">Previous set</button>
    <span class="pagination-status" aria-live="polite"></span>
    <button type="button" class="btn-outline next-btn">Next set</button>
  `;
  grid.parentElement.appendChild(controls);
  return controls;
}

function updatePaginationInstance(instance) {
  const { grid, items, controls, prevButton, nextButton, status } = instance;

  const previousPage = instance.currentPage || 1;
  instance.pageSize = measurePageSize(grid, items);
  instance.maxPage = Math.max(1, Math.ceil(items.length / instance.pageSize));
  instance.currentPage = Math.min(previousPage, instance.maxPage);

  if (items.length <= instance.pageSize) {
    items.forEach((item) => {
      item.hidden = false;
      item.style.opacity = "1";
      item.style.transform = "";
    });
    controls.hidden = true;
    return;
  }

  controls.hidden = false;

  items.forEach((item, index) => {
    const visible =
      index >= (instance.currentPage - 1) * instance.pageSize &&
      index < instance.currentPage * instance.pageSize;

    item.hidden = !visible;
    item.style.opacity = visible ? "1" : "0";
    item.style.transform = visible ? "translateY(0)" : "translateY(8px)";
  });

  const firstVisible = (instance.currentPage - 1) * instance.pageSize + 1;
  const lastVisible = Math.min(instance.currentPage * instance.pageSize, items.length);
  status.textContent = `Items ${firstVisible}-${lastVisible} of ${items.length} - Page ${instance.currentPage} / ${instance.maxPage}`;
  prevButton.disabled = instance.currentPage === 1;
  nextButton.disabled = instance.currentPage === instance.maxPage;
}

function encodeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function copyButtonMarkup() {
  return `<button class="cpb"><svg><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>Copy</button>`;
}

function createToolkitCard(item, className = "ut-c") {
  return `
    <div class="${className} has-copy page-item" data-snippet="btn" data-html="${encodeAttribute(item.html)}">
      <div class="mini-preview ${item.previewMode || ""}">${item.preview}</div>
      <div class="ut-n">${item.title}</div>
      <div class="kit-meta">${item.description}</div>
      ${copyButtonMarkup()}
    </div>
  `;
}

function addToolkitCards(selector, items, className = "ut-c") {
  const grid = document.querySelector(selector);
  if (!grid) return;

  grid.insertAdjacentHTML("beforeend", items.map((item) => createToolkitCard(item, className)).join(""));
  grid.classList.add("paginated");
  grid.dataset.minPageSize = grid.dataset.minPageSize || "8";
}

function createStyleCard(item) {
  const vars = Object.entries(item.colors)
    .map(([name, value]) => `--${name}:${value};`)
    .join("");
  const swatches = Object.values(item.colors)
    .map((color) => `<div class="sty-s" style="background:${color}"></div>`)
    .join("");
  const tags = item.tags.map((tag) => `<span>${tag}</span>`).join("");

  return `
    <div class="sty-c has-copy page-item" data-snippet="btn" data-html="${encodeAttribute(`<style>:root{${vars}}</style>`)}">
      <div class="sty-h"><div class="sty-n">${item.name}</div><span class="sty-t">${item.group}</span></div>
      <div class="sty-p">${swatches}</div>
      <div class="sty-d">${item.description}</div>
      <div class="sty-k">${tags}</div>
      ${copyButtonMarkup()}
    </div>
  `;
}

function createPaletteCard(item) {
  const vars = Object.entries(item.colors)
    .map(([name, value]) => `--${name}:${value};`)
    .join("");
  const swatches = Object.values(item.colors)
    .map((color) => `<div style="background:${color}" title="${color}"></div>`)
    .join("");
  const labels = item.labels.map((label) => `<span>${label}</span>`).join("");

  return `
    <div class="ip-c has-copy page-item" data-snippet="btn" data-html="${encodeAttribute(`<style>:root{${vars}}</style>`)}">
      <div class="ip-n">${item.name}</div>
      <div class="ip-s">${swatches}</div>
      <div class="ip-l">${labels}</div>
      ${copyButtonMarkup()}
    </div>
  `;
}

function addStyleAndPaletteCards() {
  const styleGrid = document.querySelector("#styles .sty-g");
  if (styleGrid) {
    const styles = [
      { name: "Linear Editorial", group: "SAAS", description: "Strict monochrome surfaces with one kinetic violet action.", tags: ["Docs", "SaaS", "Launch"], colors: { primary: "#0A0A0B", secondary: "#F4F1EA", accent: "#8B5CF6", bg: "#111113" } },
      { name: "Clay Console", group: "PRODUCT", description: "Warm off-white panels, thick controls, and friendly command UI.", tags: ["Forms", "AI", "Tools"], colors: { primary: "#2F2A24", secondary: "#F3E7D3", accent: "#E07A5F", bg: "#FFF8ED" } },
      { name: "Signal Noir", group: "DATA", description: "Dark telemetry language with green signals and amber warnings.", tags: ["Metrics", "Dashboards", "Ops"], colors: { primary: "#050608", secondary: "#111827", accent: "#22C55E", warning: "#F59E0B" } },
      { name: "Liquid Chrome", group: "FUTURE", description: "Iridescent product cards for AI, music, and premium tooling.", tags: ["Hero", "Cards", "Brand"], colors: { primary: "#E5E7EB", secondary: "#0F172A", accent: "#67E8F9", glow: "#F0ABFC" } },
      { name: "Arcade OS", group: "RETRO", description: "Bold block contrast, candy accents, and pressed-state controls.", tags: ["Games", "Badges", "Buttons"], colors: { primary: "#111827", secondary: "#FEF3C7", accent: "#F97316", cyan: "#22D3EE" } },
      { name: "Calm Finance", group: "FINTECH", description: "Trust-first surfaces with clean green deltas and readable numbers.", tags: ["Finance", "Tables", "Cards"], colors: { primary: "#0F172A", secondary: "#E2E8F0", accent: "#10B981", info: "#38BDF8" } },
    ];
    styleGrid.insertAdjacentHTML("beforeend", styles.map(createStyleCard).join(""));
    styleGrid.classList.add("paginated");
    styleGrid.dataset.minPageSize = "8";
  }

  const paletteGrid = document.querySelector("#palettes .ip-g");
  if (paletteGrid) {
    const palettes = [
      { name: "AI Studio", labels: ["Violet brain", "Mint success", "Ink UI"], colors: { primary: "#7C3AED", secondary: "#14B8A6", cta: "#F472B6", bg: "#09090B", text: "#F8FAFC" } },
      { name: "Creator Economy", labels: ["Warm social", "Lemon CTA", "Graphite"], colors: { primary: "#FB7185", secondary: "#F97316", cta: "#FACC15", bg: "#18181B", text: "#FFF7ED" } },
      { name: "Cloud Infra", labels: ["Blue control", "Slate shell", "Cyan edge"], colors: { primary: "#2563EB", secondary: "#0F172A", cta: "#06B6D4", bg: "#020617", text: "#E0F2FE" } },
      { name: "Health Tech", labels: ["Calm teal", "Safe blue", "Soft paper"], colors: { primary: "#0D9488", secondary: "#0284C7", cta: "#84CC16", bg: "#F8FAFC", text: "#134E4A" } },
      { name: "Music Product", labels: ["Bass black", "Hot magenta", "Stage amber"], colors: { primary: "#050505", secondary: "#DB2777", cta: "#F59E0B", bg: "#111827", text: "#FDF2F8" } },
      { name: "Legal SaaS", labels: ["Ink", "Ivory", "Gold proof"], colors: { primary: "#111827", secondary: "#FAF7ED", cta: "#B45309", bg: "#F5F5F4", text: "#1F2937" } },
    ];
    paletteGrid.insertAdjacentHTML("beforeend", palettes.map(createPaletteCard).join(""));
    paletteGrid.classList.add("paginated");
    paletteGrid.dataset.minPageSize = "8";
  }
}

function enhanceCatalog() {
  addStyleAndPaletteCards();

  addToolkitCards("#buttons .btn-g", [
    { title: "Spotlight CTA", description: "Cursor-friendly hero action with a glow ring.", preview: `<button style="padding:13px 24px;border-radius:999px;border:1px solid rgba(255,255,255,.18);background:radial-gradient(circle at 30% 20%,rgba(255,255,255,.28),transparent 35%),linear-gradient(135deg,#c2a4ff,#fb8dff);color:#060507;font-weight:800">Start build</button>`, html: `<button style="padding:13px 24px;border-radius:999px;border:1px solid rgba(255,255,255,.18);background:radial-gradient(circle at 30% 20%,rgba(255,255,255,.28),transparent 35%),linear-gradient(135deg,#c2a4ff,#fb8dff);color:#060507;font-weight:800">Start build</button>` },
    { title: "Command Button", description: "Keyboard-first action with shortcut affordance.", preview: `<button style="display:flex;gap:14px;align-items:center;padding:12px 16px;border-radius:14px;border:1px solid rgba(255,255,255,.1);background:#0f0f13;color:#fff">Search <kbd style="padding:3px 7px;border-radius:6px;background:#24242b;color:#c2a4ff">Ctrl K</kbd></button>`, html: `<button style="display:flex;gap:14px;align-items:center;padding:12px 16px;border-radius:14px;border:1px solid rgba(255,255,255,.1);background:#0f0f13;color:#fff">Search <kbd style="padding:3px 7px;border-radius:6px;background:#24242b;color:#c2a4ff">Ctrl K</kbd></button>` },
    { title: "Magnetic Pill", description: "Soft glass pill for pricing and hero sections.", preview: `<button style="padding:12px 22px;border-radius:999px;border:1px solid rgba(194,164,255,.35);background:rgba(194,164,255,.08);color:#eae5ec;box-shadow:inset 0 1px rgba(255,255,255,.12),0 12px 40px rgba(194,164,255,.12)">Join waitlist</button>`, html: `<button style="padding:12px 22px;border-radius:999px;border:1px solid rgba(194,164,255,.35);background:rgba(194,164,255,.08);color:#eae5ec;box-shadow:inset 0 1px rgba(255,255,255,.12),0 12px 40px rgba(194,164,255,.12)">Join waitlist</button>` },
    { title: "Split Action", description: "Primary action plus compact dropdown segment.", preview: `<div style="display:inline-flex;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,.12)"><button style="padding:12px 18px;background:#fff;color:#09090b;border:0;font-weight:800">Deploy</button><button style="padding:12px 13px;background:#e5e7eb;color:#09090b;border:0">...</button></div>`, html: `<div style="display:inline-flex;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,.12)"><button style="padding:12px 18px;background:#fff;color:#09090b;border:0;font-weight:800">Deploy</button><button style="padding:12px 13px;background:#e5e7eb;color:#09090b;border:0">...</button></div>` },
    { title: "Danger Confirm", description: "Destructive action with calm red treatment.", preview: `<button style="padding:12px 20px;border-radius:12px;border:1px solid rgba(244,63,94,.38);background:rgba(244,63,94,.12);color:#fecdd3;font-weight:700">Delete project</button>`, html: `<button style="padding:12px 20px;border-radius:12px;border:1px solid rgba(244,63,94,.38);background:rgba(244,63,94,.12);color:#fecdd3;font-weight:700">Delete project</button>` },
    { title: "Stripe Sheen", description: "Animated CSS sheen for checkout or upgrade CTAs.", preview: `<button style="position:relative;overflow:hidden;padding:13px 26px;border-radius:12px;border:0;background:#635bff;color:white;font-weight:800">Upgrade Pro</button>`, html: `<style>@keyframes sheen{to{transform:translateX(220%) rotate(12deg)}}</style><button style="position:relative;overflow:hidden;padding:13px 26px;border-radius:12px;border:0;background:#635bff;color:white;font-weight:800">Upgrade Pro<span style="position:absolute;inset:-20px auto -20px -60px;width:32px;background:rgba(255,255,255,.35);transform:rotate(12deg);animation:sheen 2.8s infinite"></span></button>` },
  ]);

  addToolkitCards("#inputs .inp-g", [
    { title: "Command Palette", description: "Search field with grouped actions and shortcut chips.", previewMode: "stack", preview: `<div style="display:flex;justify-content:space-between;gap:10px;padding:10px;border-radius:12px;background:#0f1117;border:1px solid rgba(255,255,255,.08)"><span style="color:#9ca3af">Search actions...</span><kbd style="color:#c2a4ff">CMD K</kbd></div><div class="kit-row"><span class="kit-pill">Open</span><span class="kit-pill">Create</span><span class="kit-pill">Invite</span></div>`, html: `<div style="padding:12px;border-radius:16px;background:#0f1117;border:1px solid rgba(255,255,255,.08);color:#fff"><div style="display:flex;justify-content:space-between"><span>Search actions...</span><kbd>CMD K</kbd></div><hr style="border-color:rgba(255,255,255,.08)"><button style="display:block;width:100%;text-align:left;background:transparent;border:0;color:#fff;padding:8px">Open command center</button></div>` },
    { title: "Card Checkout", description: "Compact payment form with grouped card metadata.", previewMode: "stack", preview: `<div style="height:34px;border-radius:10px;background:#111827;border:1px solid rgba(255,255,255,.12)"></div><div class="kit-row"><div style="height:28px;flex:1;border-radius:8px;background:#111827"></div><div style="height:28px;width:62px;border-radius:8px;background:#111827"></div></div>`, html: `<form style="display:grid;gap:10px;padding:16px;border-radius:18px;background:#0b0b10;color:#fff"><input placeholder="Card number" style="padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.12);background:#111827;color:#fff"><div style="display:grid;grid-template-columns:1fr 88px;gap:10px"><input placeholder="MM / YY" style="padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.12);background:#111827;color:#fff"><input placeholder="CVC" style="padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.12);background:#111827;color:#fff"></div></form>` },
    { title: "Invite Row", description: "Team invite input with role selector and action.", preview: `<div style="display:flex;gap:8px;width:100%"><div style="flex:1;height:38px;border-radius:999px;background:#111827;border:1px solid rgba(255,255,255,.08)"></div><button style="border:0;border-radius:999px;background:#c2a4ff;color:#060507;padding:0 14px;font-weight:800">Invite</button></div>`, html: `<div style="display:flex;gap:8px"><input placeholder="teammate@company.com" style="flex:1;padding:12px 14px;border-radius:999px;border:1px solid rgba(255,255,255,.1);background:#111827;color:#fff"><select style="border-radius:999px;background:#111827;color:#fff;border:1px solid rgba(255,255,255,.1)"><option>Editor</option><option>Viewer</option></select><button style="border:0;border-radius:999px;background:#c2a4ff;color:#060507;padding:0 16px;font-weight:800">Invite</button></div>` },
    { title: "Search Filter Bar", description: "Dense filter surface for dashboards and tables.", preview: `<div style="display:grid;grid-template-columns:1fr 70px;gap:8px;width:100%"><div style="height:36px;border-radius:10px;background:#111827"></div><div style="height:36px;border-radius:10px;background:rgba(194,164,255,.18)"></div></div>`, html: `<div style="display:grid;grid-template-columns:1fr auto;gap:8px"><input placeholder="Filter deployments..." style="padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,.1);background:#111827;color:#fff"><button style="padding:0 16px;border-radius:10px;border:1px solid rgba(194,164,255,.2);background:rgba(194,164,255,.12);color:#c2a4ff">Filters</button></div>` },
    { title: "Segmented Control", description: "Three-state switch for billing or views.", preview: `<div style="display:flex;padding:4px;border-radius:999px;background:#101018;border:1px solid rgba(255,255,255,.08)"><span style="padding:7px 12px;border-radius:999px;background:#fff;color:#000">Day</span><span style="padding:7px 12px">Week</span><span style="padding:7px 12px">Month</span></div>`, html: `<div role="tablist" style="display:inline-flex;padding:4px;border-radius:999px;background:#101018;border:1px solid rgba(255,255,255,.08);color:#fff"><button style="padding:8px 14px;border:0;border-radius:999px;background:#fff;color:#000">Day</button><button style="padding:8px 14px;border:0;background:transparent;color:#aaa">Week</button><button style="padding:8px 14px;border:0;background:transparent;color:#aaa">Month</button></div>` },
    { title: "Inline Validation", description: "Input with status copy and success accent.", previewMode: "stack", preview: `<div style="height:38px;border-radius:10px;border:1px solid rgba(74,222,128,.45);background:rgba(74,222,128,.08)"></div><span style="font-size:11px;color:#4ade80">Available username</span>`, html: `<label style="display:grid;gap:6px;color:#fff">Username<input value="ui-toolkit" style="padding:12px;border-radius:10px;border:1px solid rgba(74,222,128,.45);background:rgba(74,222,128,.08);color:#fff"><span style="font-size:12px;color:#4ade80">Available username</span></label>` },
  ]);

  addToolkitCards("#components .cp-g", [
    { title: "Command Menu", description: "Copy-paste shell for app launchers.", previewMode: "stack", preview: `<div style="height:28px;border-radius:8px;background:#111827"></div><div style="display:grid;gap:6px"><span class="kit-pill">Create project</span><span class="kit-pill">Open settings</span></div>`, html: `<div style="max-width:360px;border-radius:18px;background:#09090b;border:1px solid rgba(255,255,255,.1);padding:12px;color:#fff"><input placeholder="Type a command..." style="width:100%;box-sizing:border-box;padding:12px;border-radius:12px;background:#111827;border:0;color:#fff"><button style="width:100%;text-align:left;margin-top:8px;padding:10px;background:transparent;border:0;color:#fff">Create project</button></div>` },
    { title: "Activity Timeline", description: "Status history for deployments or audits.", previewMode: "stack", preview: `<div class="kit-row"><span style="width:8px;height:8px;border-radius:50%;background:#4ade80"></span><span style="height:10px;flex:1;background:#1f2937;border-radius:4px"></span></div><div class="kit-row"><span style="width:8px;height:8px;border-radius:50%;background:#c2a4ff"></span><span style="height:10px;flex:1;background:#1f2937;border-radius:4px"></span></div>`, html: `<ol style="display:grid;gap:12px;margin:0;padding:0;list-style:none;color:#fff"><li><span style="color:#4ade80">*</span> Build passed</li><li><span style="color:#c2a4ff">*</span> Preview deployed</li><li><span style="color:#f59e0b">*</span> Domain pending</li></ol>` },
    { title: "Pricing Mini", description: "Compact plan card for landing pages.", previewMode: "stack", preview: `<strong style="font-size:18px;color:#fff">$19/mo</strong><button style="border:0;border-radius:10px;background:#c2a4ff;padding:9px;color:#060507;font-weight:800">Choose</button>`, html: `<div style="padding:20px;border-radius:20px;background:#0f1117;border:1px solid rgba(255,255,255,.1);color:#fff"><p style="margin:0;color:#c2a4ff">Pro</p><h3 style="margin:6px 0;font-size:32px">$19/mo</h3><button style="width:100%;border:0;border-radius:12px;background:#c2a4ff;padding:12px;color:#060507;font-weight:800">Choose plan</button></div>` },
    { title: "Empty State", description: "Friendly zero-state for dashboards.", previewMode: "stack", preview: `<div style="width:44px;height:44px;border-radius:14px;background:rgba(194,164,255,.16)"></div><strong>No projects yet</strong><span style="font-size:11px;color:#9ca3af">Create your first workspace.</span>`, html: `<div style="text-align:center;padding:28px;border-radius:20px;border:1px dashed rgba(255,255,255,.18);color:#fff"><div style="width:48px;height:48px;margin:auto;border-radius:14px;background:rgba(194,164,255,.16)"></div><h3>No projects yet</h3><p>Create your first workspace to start shipping.</p></div>` },
    { title: "Metric Delta", description: "Single KPI tile with trend line.", previewMode: "stack", preview: `<span style="color:#9ca3af">Revenue</span><strong style="font-size:24px;color:#fff">$71.8k</strong><span style="color:#4ade80">+12.4%</span>`, html: `<div style="padding:18px;border-radius:18px;background:#0f1117;color:#fff;border:1px solid rgba(255,255,255,.08)"><span style="color:#9ca3af">Revenue</span><h3 style="font-size:32px;margin:4px 0">$71.8k</h3><span style="color:#4ade80">+12.4% this month</span></div>` },
    { title: "Notification Stack", description: "Layered alerts for product feedback.", previewMode: "stack", preview: `<div style="height:28px;border-radius:10px;background:rgba(74,222,128,.14)"></div><div style="height:28px;border-radius:10px;background:rgba(194,164,255,.14)"></div>`, html: `<div style="display:grid;gap:8px"><div style="padding:12px;border-radius:12px;background:rgba(74,222,128,.14);color:#bbf7d0">Saved successfully</div><div style="padding:12px;border-radius:12px;background:rgba(194,164,255,.14);color:#ddd6fe">Preview deployed</div></div>` },
  ]);

  addToolkitCards("#layouts .ly-g", [
    { title: "SaaS Shell", description: "Sidebar, toolbar, and content grid in one snippet.", preview: `<div style="display:grid;grid-template-columns:36px 1fr;gap:8px;width:100%;height:88px"><div style="border-radius:10px;background:#111827"></div><div style="display:grid;grid-template-rows:18px 1fr;gap:8px"><div style="border-radius:8px;background:#1f2937"></div><div style="border-radius:12px;background:rgba(194,164,255,.08)"></div></div></div>`, html: `<div style="display:grid;grid-template-columns:240px 1fr;gap:16px;min-height:480px"><aside style="border-radius:20px;background:#111827"></aside><main style="display:grid;grid-template-rows:72px 1fr;gap:16px"><header style="border-radius:20px;background:#1f2937"></header><section style="border-radius:20px;background:rgba(194,164,255,.08)"></section></main></div>` },
    { title: "Feature Bento", description: "Asymmetric marketing block for product pages.", preview: `<div style="display:grid;grid-template-columns:1.4fr .8fr;grid-template-rows:1fr 1fr;gap:8px;width:100%;height:88px"><div style="grid-row:span 2;border-radius:12px;background:rgba(194,164,255,.16)"></div><div style="border-radius:12px;background:#111827"></div><div style="border-radius:12px;background:#1f2937"></div></div>`, html: `<div style="display:grid;grid-template-columns:1.4fr .8fr;grid-template-rows:1fr 1fr;gap:16px"><article style="grid-row:span 2;min-height:280px;border-radius:28px;background:rgba(194,164,255,.16)"></article><article style="border-radius:28px;background:#111827"></article><article style="border-radius:28px;background:#1f2937"></article></div>` },
    { title: "Docs Article", description: "Reader-friendly article rail with aside navigation.", preview: `<div style="display:grid;grid-template-columns:42px 1fr 32px;gap:8px;width:100%;height:88px"><div></div><div style="border-radius:12px;background:#111827"></div><div style="border-radius:10px;background:#1f2937"></div></div>`, html: `<div style="display:grid;grid-template-columns:1fr minmax(0,760px) 220px;gap:28px"><div></div><article style="min-height:520px;border-radius:22px;background:#111827"></article><aside style="border-radius:18px;background:#1f2937"></aside></div>` },
    { title: "Mobile Stack", description: "App screen composition with sticky bottom actions.", preview: `<div style="width:70px;height:104px;border-radius:18px;background:#111827;display:grid;grid-template-rows:20px 1fr 18px;gap:6px;padding:8px"><span style="border-radius:8px;background:#1f2937"></span><span style="border-radius:10px;background:rgba(194,164,255,.15)"></span><span style="border-radius:8px;background:#c2a4ff"></span></div>`, html: `<main style="max-width:390px;min-height:720px;border-radius:32px;background:#09090b;padding:18px;display:grid;grid-template-rows:56px 1fr 64px;gap:16px"><header style="border-radius:18px;background:#111827"></header><section style="border-radius:22px;background:rgba(194,164,255,.12)"></section><nav style="border-radius:22px;background:#c2a4ff"></nav></main>` },
  ]);

  addToolkitCards("#loading .load-g", [
    { title: "AI Thinking", description: "Three pulses for generated content states.", preview: `<div class="kit-row"><span style="width:10px;height:10px;border-radius:50%;background:#c2a4ff"></span><span style="width:10px;height:10px;border-radius:50%;background:#fb8dff"></span><span style="width:10px;height:10px;border-radius:50%;background:#4ade80"></span></div>`, html: `<style>@keyframes think{50%{transform:translateY(-6px);opacity:.5}}</style><div style="display:flex;gap:8px"><span style="width:10px;height:10px;border-radius:50%;background:#c2a4ff;animation:think .9s infinite"></span><span style="width:10px;height:10px;border-radius:50%;background:#fb8dff;animation:think .9s .15s infinite"></span><span style="width:10px;height:10px;border-radius:50%;background:#4ade80;animation:think .9s .3s infinite"></span></div>` },
    { title: "Upload Ring", description: "Circular progress treatment for file flows.", preview: `<div style="width:58px;height:58px;border-radius:50%;background:conic-gradient(#c2a4ff 72%,rgba(255,255,255,.08) 0);display:grid;place-items:center"><span style="width:42px;height:42px;border-radius:50%;background:#09090b"></span></div>`, html: `<div style="width:64px;height:64px;border-radius:50%;background:conic-gradient(#c2a4ff 72%,rgba(255,255,255,.08) 0);display:grid;place-items:center"><span style="width:46px;height:46px;border-radius:50%;background:#09090b"></span></div>` },
    { title: "Skeleton Article", description: "Article placeholder with staggered lines.", previewMode: "stack", preview: `<div style="height:18px;width:75%;border-radius:999px;background:#1f2937"></div><div style="height:12px;border-radius:999px;background:#111827"></div><div style="height:12px;width:60%;border-radius:999px;background:#111827"></div>`, html: `<div style="display:grid;gap:10px"><div style="height:20px;width:75%;border-radius:999px;background:#1f2937"></div><div style="height:12px;border-radius:999px;background:#111827"></div><div style="height:12px;width:60%;border-radius:999px;background:#111827"></div></div>` },
    { title: "Terminal Loader", description: "CLI-style loading strip for developer tools.", preview: `<div style="font-family:monospace;color:#4ade80;background:#020617;border-radius:10px;padding:12px;width:100%">build: pending_</div>`, html: `<div style="font-family:monospace;color:#4ade80;background:#020617;border-radius:10px;padding:12px">build: pending<span style="animation:blink 1s infinite">_</span></div>` },
  ]);

  addToolkitCards("#textfx .tx-g", [
    { title: "Gradient Headline", description: "Large text fill for hero statements.", preview: `<strong style="font-size:32px;letter-spacing:-.08em;background:linear-gradient(90deg,#fff,#c2a4ff,#fb8dff);-webkit-background-clip:text;color:transparent">Launch fast</strong>`, html: `<h1 style="font-size:72px;letter-spacing:-.08em;background:linear-gradient(90deg,#fff,#c2a4ff,#fb8dff);-webkit-background-clip:text;color:transparent">Launch fast</h1>` },
    { title: "Outlined Label", description: "Editorial stroke treatment for category headers.", preview: `<strong style="font-size:34px;color:transparent;-webkit-text-stroke:1px #c2a4ff">SYSTEM</strong>`, html: `<span style="font-size:48px;font-weight:900;color:transparent;-webkit-text-stroke:1px #c2a4ff">SYSTEM</span>` },
    { title: "Ticker Text", description: "Scrolling marquee strip for launch notes.", preview: `<div style="white-space:nowrap;color:#c2a4ff">NEW COMPONENTS - READY -</div>`, html: `<marquee style="color:#c2a4ff;letter-spacing:.18em">NEW COMPONENTS - READY TO COPY -</marquee>` },
    { title: "Soft Highlight", description: "Inline marker for documentation and docs pages.", preview: `<p>Use <mark style="background:rgba(194,164,255,.22);color:#fff;border-radius:6px;padding:2px 6px">copy-safe</mark> assets.</p>`, html: `<p>Use <mark style="background:rgba(194,164,255,.22);color:#fff;border-radius:6px;padding:2px 6px">copy-safe</mark> assets.</p>` },
  ]);

  addToolkitCards("#glass .gl-g", [
    { title: "Glass Dock", description: "Floating navigation dock with blurred surface.", preview: `<div style="display:flex;gap:8px;padding:8px;border-radius:999px;background:rgba(255,255,255,.08);backdrop-filter:blur(16px)"><span class="kit-pill">Home</span><span class="kit-pill">Docs</span><span class="kit-pill">Build</span></div>`, html: `<nav style="display:flex;gap:8px;padding:8px;border-radius:999px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(16px)"><a style="padding:8px 12px;color:#fff">Home</a><a style="padding:8px 12px;color:#fff">Docs</a><a style="padding:8px 12px;color:#fff">Build</a></nav>` },
    { title: "Frosted Modal", description: "Premium overlay panel for confirmations.", preview: `<div style="width:100%;padding:16px;border-radius:18px;background:rgba(255,255,255,.08);backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.16)">Confirm action</div>`, html: `<div style="padding:24px;border-radius:24px;background:rgba(255,255,255,.08);backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.16);color:#fff">Confirm action</div>` },
    { title: "Orb Status", description: "Glass status badge with glow dot.", preview: `<div style="display:flex;gap:8px;align-items:center;padding:8px 12px;border-radius:999px;background:rgba(255,255,255,.08)"><span style="width:8px;height:8px;border-radius:50%;background:#4ade80;box-shadow:0 0 14px #4ade80"></span>Live</div>`, html: `<div style="display:inline-flex;gap:8px;align-items:center;padding:8px 12px;border-radius:999px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);color:#fff"><span style="width:8px;height:8px;border-radius:50%;background:#4ade80;box-shadow:0 0 14px #4ade80"></span>Live</div>` },
    { title: "Blurred Card Stack", description: "Layered product cards for hero art.", preview: `<div style="position:relative;width:120px;height:78px"><span style="position:absolute;inset:16px 0 0 20px;border-radius:16px;background:rgba(194,164,255,.14)"></span><span style="position:absolute;inset:0 20px 16px 0;border-radius:16px;background:rgba(255,255,255,.08);backdrop-filter:blur(12px)"></span></div>`, html: `<div style="position:relative;width:240px;height:150px"><span style="position:absolute;inset:34px 0 0 44px;border-radius:24px;background:rgba(194,164,255,.14)"></span><span style="position:absolute;inset:0 44px 34px 0;border-radius:24px;background:rgba(255,255,255,.08);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.14)"></span></div>` },
  ]);

  const note = document.createElement("p");
  note.className = "catalog-source-note";
  note.textContent = "Expanded with original patterns inspired by current copy-paste UI ecosystems: shadcn/ui blocks, Magic UI, Aceternity UI, ReactBits, Flowbite, DaisyUI, CodePen, and GitHub component galleries.";
  document.querySelector("footer.final-cta")?.before(note);
}

function addMarketplaceDepth() {
  addToolkitCards("#neu .neu-g", [
    { title: "Inset Panel", description: "Soft dashboard surface with pressed interior depth.", preview: `<div style="width:100%;height:70px;border-radius:18px;background:#e0e5ec;box-shadow:inset 8px 8px 16px rgba(163,177,198,.55),inset -8px -8px 16px rgba(255,255,255,.75)"></div>`, html: `<div style="padding:24px;border-radius:22px;background:#e0e5ec;box-shadow:inset 8px 8px 16px rgba(163,177,198,.55),inset -8px -8px 16px rgba(255,255,255,.75);color:#3f4654">Inset panel</div>` },
    { title: "Raised Avatar", description: "Tactile user avatar for profile rows.", preview: `<div style="width:64px;height:64px;border-radius:50%;background:#e0e5ec;box-shadow:8px 8px 16px rgba(163,177,198,.6),-8px -8px 16px #fff;display:grid;place-items:center;color:#444;font-weight:900">UI</div>`, html: `<div style="width:64px;height:64px;border-radius:50%;background:#e0e5ec;box-shadow:8px 8px 16px rgba(163,177,198,.6),-8px -8px 16px #fff;display:grid;place-items:center;color:#444;font-weight:900">UI</div>` },
    { title: "Soft Slider", description: "Neumorphic range control visual.", preview: `<div style="width:100%;height:16px;border-radius:999px;background:#e0e5ec;box-shadow:inset 5px 5px 10px rgba(163,177,198,.55),inset -5px -5px 10px #fff"><div style="width:58%;height:100%;border-radius:999px;background:#c2a4ff"></div></div>`, html: `<div style="height:16px;border-radius:999px;background:#e0e5ec;box-shadow:inset 5px 5px 10px rgba(163,177,198,.55),inset -5px -5px 10px #fff"><div style="width:58%;height:100%;border-radius:999px;background:#c2a4ff"></div></div>` },
    { title: "Soft Toggle", description: "Raised toggle switch for settings UI.", preview: `<div style="width:72px;height:36px;border-radius:999px;background:#e0e5ec;box-shadow:6px 6px 12px rgba(163,177,198,.55),-6px -6px 12px #fff;padding:4px"><div style="margin-left:auto;width:28px;height:28px;border-radius:50%;background:#c2a4ff"></div></div>`, html: `<div style="width:72px;height:36px;border-radius:999px;background:#e0e5ec;box-shadow:6px 6px 12px rgba(163,177,198,.55),-6px -6px 12px #fff;padding:4px"><div style="margin-left:auto;width:28px;height:28px;border-radius:50%;background:#c2a4ff"></div></div>` },
  ]);

  addToolkitCards("#borders .abd-g", [
    { title: "Aurora Edge", description: "Multi-color conic border for premium cards.", preview: `<div style="padding:2px;border-radius:18px;background:conic-gradient(from 90deg,#c2a4ff,#fb8dff,#4ade80,#c2a4ff);width:100%"><div style="height:76px;border-radius:16px;background:#060507"></div></div>`, html: `<div style="padding:2px;border-radius:18px;background:conic-gradient(from 90deg,#c2a4ff,#fb8dff,#4ade80,#c2a4ff)"><div style="padding:24px;border-radius:16px;background:#060507;color:#fff">Aurora edge</div></div>` },
    { title: "Dashed Motion", description: "Copy-paste dashed border with moving offset.", preview: `<div style="width:100%;height:78px;border-radius:16px;border:2px dashed #c2a4ff;display:grid;place-items:center;color:#c2a4ff">Dashed</div>`, html: `<style>@keyframes dashOffset{to{outline-offset:8px}}</style><div style="padding:24px;border-radius:16px;border:2px dashed #c2a4ff;color:#c2a4ff;animation:dashOffset 1.2s ease-in-out infinite alternate">Dashed motion</div>` },
    { title: "Corner Rails", description: "Minimal corner accents without a full box.", preview: `<div style="position:relative;width:100%;height:78px"><span style="position:absolute;inset:0;border-radius:16px;background:#09090b"></span><span style="position:absolute;left:0;top:0;width:34px;height:34px;border-left:2px solid #c2a4ff;border-top:2px solid #c2a4ff"></span><span style="position:absolute;right:0;bottom:0;width:34px;height:34px;border-right:2px solid #fb8dff;border-bottom:2px solid #fb8dff"></span></div>`, html: `<div style="position:relative;padding:24px;border-radius:16px;background:#09090b;color:#fff"><span style="position:absolute;left:0;top:0;width:34px;height:34px;border-left:2px solid #c2a4ff;border-top:2px solid #c2a4ff"></span><span style="position:absolute;right:0;bottom:0;width:34px;height:34px;border-right:2px solid #fb8dff;border-bottom:2px solid #fb8dff"></span>Corner rails</div>` },
    { title: "Glow Frame", description: "Static frame for hero cards and modals.", preview: `<div style="width:100%;height:78px;border-radius:18px;border:1px solid rgba(194,164,255,.42);box-shadow:0 0 30px rgba(194,164,255,.18),inset 0 0 24px rgba(194,164,255,.08)"></div>`, html: `<div style="padding:24px;border-radius:18px;border:1px solid rgba(194,164,255,.42);box-shadow:0 0 30px rgba(194,164,255,.18),inset 0 0 24px rgba(194,164,255,.08);color:#fff">Glow frame</div>` },
  ]);

  addToolkitCards("#hover .hf-g", [
    { title: "Tilt Card", description: "Lightweight transform hover for product tiles.", preview: `<div style="width:96px;height:68px;border-radius:16px;background:linear-gradient(135deg,#111827,#3b0764);transform:rotate(-4deg);box-shadow:0 18px 45px rgba(0,0,0,.32)"></div>`, html: `<div style="width:180px;height:120px;border-radius:18px;background:linear-gradient(135deg,#111827,#3b0764);transition:transform .25s" onmouseover="this.style.transform='rotate(-4deg) scale(1.04)'" onmouseout="this.style.transform='none'"></div>` },
    { title: "Image Lift", description: "Gallery card hover with lift and shadow.", preview: `<div style="width:110px;height:78px;border-radius:18px;background:linear-gradient(135deg,#c2a4ff,#fb8dff);box-shadow:0 18px 45px rgba(194,164,255,.2)"></div>`, html: `<div style="width:220px;height:140px;border-radius:22px;background:linear-gradient(135deg,#c2a4ff,#fb8dff);transition:transform .25s,box-shadow .25s" onmouseover="this.style.transform='translateY(-8px)';this.style.boxShadow='0 24px 70px rgba(194,164,255,.28)'" onmouseout="this.style.transform='none';this.style.boxShadow='none'"></div>` },
    { title: "Underline Trail", description: "Navigation hover with delayed underline.", preview: `<span style="position:relative;color:#fff;border-bottom:2px solid #c2a4ff;padding-bottom:5px">Docs</span>`, html: `<a style="position:relative;color:#fff;text-decoration:none;padding-bottom:5px;border-bottom:2px solid #c2a4ff">Docs</a>` },
    { title: "Depth Press", description: "Button hover that becomes a physical press.", preview: `<button style="padding:12px 18px;border:2px solid #000;background:#facc15;color:#000;box-shadow:5px 5px 0 #000;font-weight:900">Press</button>`, html: `<button style="padding:12px 18px;border:2px solid #000;background:#facc15;color:#000;box-shadow:5px 5px 0 #000;font-weight:900;transition:.12s" onmousedown="this.style.transform='translate(5px,5px)';this.style.boxShadow='0 0 0 #000'" onmouseup="this.style.transform='none';this.style.boxShadow='5px 5px 0 #000'">Press</button>` },
  ]);

  addToolkitCards("#utils .ut-g", [
    { title: "Toast Shelf", description: "Bottom-right stack for product notifications.", previewMode: "stack", preview: `<div style="height:30px;border-radius:10px;background:rgba(74,222,128,.14)"></div><div style="height:30px;border-radius:10px;background:rgba(251,141,255,.12)"></div>`, html: `<div style="position:fixed;right:18px;bottom:18px;display:grid;gap:8px"><div style="padding:12px 14px;border-radius:12px;background:#111827;color:#fff">Saved</div><div style="padding:12px 14px;border-radius:12px;background:#111827;color:#fff">Deployed</div></div>` },
    { title: "Breadcrumb Path", description: "Compact hierarchy path for dashboards.", preview: `<div style="display:flex;gap:8px;color:#9ca3af"><span>Home</span><span>/</span><span style="color:#fff">Library</span></div>`, html: `<nav style="display:flex;gap:8px;color:#9ca3af"><a>Home</a><span>/</span><a>Projects</a><span>/</span><strong style="color:#fff">Toolkit</strong></nav>` },
    { title: "Step Indicator", description: "Three-step progress marker for onboarding.", preview: `<div style="display:flex;gap:8px;align-items:center"><span class="kit-pill">1</span><span style="height:2px;width:34px;background:#c2a4ff"></span><span class="kit-pill">2</span><span style="height:2px;width:34px;background:#333"></span><span class="kit-pill">3</span></div>`, html: `<div style="display:flex;gap:8px;align-items:center"><span>1</span><span style="height:2px;width:48px;background:#c2a4ff"></span><span>2</span><span style="height:2px;width:48px;background:#333"></span><span>3</span></div>` },
    { title: "KBD Strip", description: "Shortcut row for docs and command menus.", preview: `<div class="kit-row"><kbd class="kit-pill">Ctrl</kbd><kbd class="kit-pill">Shift</kbd><kbd class="kit-pill">P</kbd></div>`, html: `<div style="display:flex;gap:6px"><kbd style="padding:5px 9px;border-radius:7px;background:#111827;color:#c2a4ff">Ctrl</kbd><kbd style="padding:5px 9px;border-radius:7px;background:#111827;color:#c2a4ff">Shift</kbd><kbd style="padding:5px 9px;border-radius:7px;background:#111827;color:#c2a4ff">P</kbd></div>` },
  ]);

  addToolkitCards("#neutral .cp-g", [
    { title: "Review Card", description: "Social proof block for landing pages.", previewMode: "stack", preview: `<div class="kit-row"><span style="width:28px;height:28px;border-radius:50%;background:#c2a4ff"></span><strong>Maria</strong></div><span style="color:#facc15">*****</span><p style="margin:0;color:#9ca3af">Clean and fast.</p>`, html: `<figure style="padding:20px;border-radius:18px;background:#111827;color:#fff"><div style="display:flex;gap:10px;align-items:center"><span style="width:32px;height:32px;border-radius:50%;background:#c2a4ff"></span><strong>Maria</strong></div><p>Clean and fast.</p></figure>` },
    { title: "Coupon Card", description: "Promo block for commerce sections.", previewMode: "stack", preview: `<strong style="font-size:22px;color:#fff">SAVE20</strong><span style="color:#9ca3af">20% off today</span>`, html: `<div style="padding:18px;border:1px dashed #c2a4ff;border-radius:18px;color:#fff"><strong style="font-size:24px">SAVE20</strong><p>20% off today</p></div>` },
    { title: "Feature List", description: "Compact feature checklist.", previewMode: "stack", preview: `<span>+ Fast deploy</span><span>+ Secure headers</span><span>+ Local audio</span>`, html: `<ul style="display:grid;gap:8px;color:#fff;list-style:none;padding:0"><li>+ Fast deploy</li><li>+ Secure headers</li><li>+ Local audio</li></ul>` },
    { title: "Stats Trio", description: "Three compact numbers for hero support.", preview: `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%"><strong>280+</strong><strong>29</strong><strong>0</strong></div>`, html: `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;color:#fff"><div><strong>280+</strong><p>Assets</p></div><div><strong>29</strong><p>Sections</p></div><div><strong>0</strong><p>Deps</p></div></div>` },
  ]);

  addToolkitCards("#tw-g, .tw-g", [
    { title: "Hero Banner", description: "Tailwind-style marketing strip with CTA.", previewMode: "stack", preview: `<strong style="color:#fff">Ship faster</strong><button style="border:0;border-radius:8px;background:#4f46e5;color:#fff;padding:8px">Start</button>`, html: `<section style="padding:32px;border-radius:24px;background:#111827;color:#fff"><h2>Ship faster</h2><p>Copy-ready UI patterns for launch pages.</p><button style="border:0;border-radius:8px;background:#4f46e5;color:#fff;padding:10px 16px">Start</button></section>` },
    { title: "Table Row", description: "Admin row with status pill and action.", preview: `<div style="display:grid;grid-template-columns:1fr auto;gap:10px;width:100%;color:#fff"><span>Deployment</span><span class="kit-pill">Ready</span></div>`, html: `<div style="display:grid;grid-template-columns:1fr auto auto;gap:12px;padding:12px;border-bottom:1px solid #1f2937;color:#fff"><span>Deployment</span><span style="color:#4ade80">Ready</span><button>View</button></div>` },
    { title: "FAQ Item", description: "Expandable-looking support block.", previewMode: "stack", preview: `<strong style="color:#fff">Can I copy it?</strong><span style="color:#9ca3af">Yes, every card ships snippet data.</span>`, html: `<details style="padding:16px;border-radius:14px;background:#111827;color:#fff"><summary>Can I copy it?</summary><p>Yes, every card ships snippet data.</p></details>` },
    { title: "Profile Header", description: "User header with avatar and CTA.", preview: `<div style="display:flex;gap:10px;align-items:center;width:100%"><span style="width:36px;height:36px;border-radius:50%;background:#818cf8"></span><div style="flex:1;height:12px;border-radius:6px;background:#1f2937"></div><button style="border:0;border-radius:8px;background:#4f46e5;color:#fff;padding:7px">Follow</button></div>`, html: `<div style="display:flex;gap:12px;align-items:center;color:#fff"><span style="width:44px;height:44px;border-radius:50%;background:#818cf8"></span><div style="flex:1"><strong>UI Toolkit</strong><p>@frontend</p></div><button style="border:0;border-radius:8px;background:#4f46e5;color:#fff;padding:8px 12px">Follow</button></div>` },
  ]);

  addToolkitCards("#shadows .sh-g", [
    { title: "Floating Panel", description: "Soft ambient panel shadow for modals.", preview: `<div style="width:90px;height:62px;border-radius:16px;background:#111827;box-shadow:0 28px 80px rgba(0,0,0,.45)"></div>`, html: `<div style="padding:24px;border-radius:18px;background:#111827;box-shadow:0 28px 80px rgba(0,0,0,.45);color:#fff">Floating panel</div>` },
    { title: "Colored Elevation", description: "Brand-colored ambient shadow.", preview: `<div style="width:90px;height:62px;border-radius:16px;background:#2b174f;box-shadow:0 20px 60px rgba(194,164,255,.35)"></div>`, html: `<div style="padding:24px;border-radius:18px;background:#2b174f;box-shadow:0 20px 60px rgba(194,164,255,.35);color:#fff">Colored elevation</div>` },
    { title: "Inset Well", description: "Inner shadow well for dashboards.", preview: `<div style="width:90px;height:62px;border-radius:16px;background:#0b0b10;box-shadow:inset 0 0 28px rgba(255,255,255,.08)"></div>`, html: `<div style="padding:24px;border-radius:18px;background:#0b0b10;box-shadow:inset 0 0 28px rgba(255,255,255,.08);color:#fff">Inset well</div>` },
    { title: "Hard Offset", description: "Neobrutalist card shadow.", preview: `<div style="width:90px;height:62px;border-radius:8px;background:#facc15;box-shadow:8px 8px 0 #000"></div>`, html: `<div style="padding:24px;border:2px solid #000;border-radius:8px;background:#facc15;box-shadow:8px 8px 0 #000;color:#000;font-weight:900">Hard offset</div>` },
  ]);

  addToolkitCards("#tokens .ut-g", [
    { title: "Color Semantic Tokens", description: "Success, warning, danger, and info variables.", previewMode: "stack", preview: `<span class="kit-pill">success</span><span class="kit-pill">warning</span><span class="kit-pill">danger</span>`, html: `<style>:root{--success:#22c55e;--warning:#f59e0b;--danger:#f43f5e;--info:#38bdf8}</style>` },
    { title: "Container Tokens", description: "Readable max-width variables for layouts.", previewMode: "stack", preview: `<span>--container-sm: 640px</span><span>--container-lg: 1120px</span>`, html: `<style>:root{--container-sm:640px;--container-md:880px;--container-lg:1120px;--container-xl:1360px}</style>` },
    { title: "Motion Duration Tokens", description: "Shared timing scale for interactions.", previewMode: "stack", preview: `<span>fast 120ms</span><span>normal 220ms</span><span>slow 420ms</span>`, html: `<style>:root{--duration-fast:120ms;--duration-normal:220ms;--duration-slow:420ms}</style>` },
    { title: "Surface Tokens", description: "Layered backgrounds for card systems.", previewMode: "stack", preview: `<span style="height:18px;border-radius:8px;background:#09090b"></span><span style="height:18px;border-radius:8px;background:#111827"></span>`, html: `<style>:root{--surface-base:#060507;--surface-card:#111827;--surface-raised:#1f2937;--surface-glass:rgba(255,255,255,.08)}</style>` },
  ]);

  addToolkitCards("#animations .an-g", [
    { title: "Reveal Up", description: "Scroll reveal keyframe for cards.", preview: `<div style="width:70px;height:46px;border-radius:12px;background:#c2a4ff;animation:revUp 1.2s ease infinite alternate"></div><style>@keyframes revUp{from{transform:translateY(12px);opacity:.3}to{transform:none;opacity:1}}</style>`, html: `<style>@keyframes revealUp{from{transform:translateY(14px);opacity:0}to{transform:none;opacity:1}}</style><div style="animation:revealUp .5s ease both">Reveal up</div>` },
    { title: "Blur In", description: "Soft focus entrance animation.", preview: `<div style="color:#fff;animation:blurIn 1.2s ease infinite alternate">Focus</div><style>@keyframes blurIn{from{filter:blur(8px);opacity:.2}to{filter:blur(0);opacity:1}}</style>`, html: `<style>@keyframes blurIn{from{filter:blur(8px);opacity:0}to{filter:blur(0);opacity:1}}</style><div style="animation:blurIn .6s ease both">Focus</div>` },
    { title: "Orbit Dot", description: "Tiny orbital loader for async states.", preview: `<div style="width:48px;height:48px;border:1px solid #333;border-radius:50%;position:relative;animation:orbit 1s linear infinite"><span style="position:absolute;top:-4px;left:20px;width:8px;height:8px;border-radius:50%;background:#c2a4ff"></span></div><style>@keyframes orbit{to{transform:rotate(360deg)}}</style>`, html: `<style>@keyframes orbit{to{transform:rotate(360deg)}}</style><div style="width:48px;height:48px;border:1px solid #333;border-radius:50%;position:relative;animation:orbit 1s linear infinite"><span style="position:absolute;top:-4px;left:20px;width:8px;height:8px;border-radius:50%;background:#c2a4ff"></span></div>` },
    { title: "Elastic Pop", description: "Button and badge attention animation.", preview: `<div style="padding:10px 14px;border-radius:999px;background:#c2a4ff;color:#000;font-weight:900;animation:pop .9s ease infinite alternate">Pop</div><style>@keyframes pop{to{transform:scale(1.08)}}</style>`, html: `<style>@keyframes elasticPop{50%{transform:scale(1.12)}100%{transform:scale(1)}}</style><button style="animation:elasticPop .6s ease">Pop</button>` },
  ]);

  addToolkitCards("#gradients .gr-g", [
    { title: "Mesh Glow", description: "Layered radial gradient background.", preview: `<div style="width:100%;height:78px;border-radius:16px;background:radial-gradient(circle at 20% 20%,#c2a4ff,transparent 30%),radial-gradient(circle at 80% 30%,#fb8dff,transparent 32%),#060507"></div>`, html: `<div style="min-height:220px;background:radial-gradient(circle at 20% 20%,#c2a4ff,transparent 30%),radial-gradient(circle at 80% 30%,#fb8dff,transparent 32%),#060507"></div>` },
    { title: "Commerce Warmth", description: "Warm landing gradient for shops.", preview: `<div style="width:100%;height:78px;border-radius:16px;background:linear-gradient(135deg,#fff7ed,#fb923c,#be123c)"></div>`, html: `<div style="background:linear-gradient(135deg,#fff7ed,#fb923c,#be123c);min-height:220px"></div>` },
    { title: "Data Night", description: "Dashboard gradient for dark panels.", preview: `<div style="width:100%;height:78px;border-radius:16px;background:linear-gradient(135deg,#020617,#0f766e,#0ea5e9)"></div>`, html: `<div style="background:linear-gradient(135deg,#020617,#0f766e,#0ea5e9);min-height:220px"></div>` },
    { title: "Luxury Ink", description: "Editorial luxury palette gradient.", preview: `<div style="width:100%;height:78px;border-radius:16px;background:linear-gradient(135deg,#09090b,#78350f,#f5f5f4)"></div>`, html: `<div style="background:linear-gradient(135deg,#09090b,#78350f,#f5f5f4);min-height:220px"></div>` },
  ]);
}

function initPagination() {
  const instances = [];

  document.querySelectorAll(".paginated").forEach((grid) => {
    const items = getPaginationItems(grid);
    items.forEach((item) => item.classList.add("page-item"));

    if (items.length <= 1) return;

    const controls = createPaginationControls(grid);
    const prevButton = controls.querySelector(".prev-btn");
    const nextButton = controls.querySelector(".next-btn");
    const status = controls.querySelector(".pagination-status");

    const instance = {
      grid,
      items,
      controls,
      prevButton,
      nextButton,
      status,
      currentPage: 1,
      maxPage: 1,
      pageSize: items.length,
    };

    prevButton.addEventListener("click", () => {
      if (instance.currentPage === 1) return;
      instance.currentPage -= 1;
      updatePaginationInstance(instance);
      grid.closest("section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    nextButton.addEventListener("click", () => {
      if (instance.currentPage === instance.maxPage) return;
      instance.currentPage += 1;
      updatePaginationInstance(instance);
      grid.closest("section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    updatePaginationInstance(instance);
    instances.push(instance);
  });

  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      instances.forEach((instance) => updatePaginationInstance(instance));
    }, 150);
  });
}

function initBackgroundAudio() {
  backgroundAudioState.audio = document.getElementById("background-audio");
  backgroundAudioState.toggle = document.getElementById("background-audio-toggle");

  const { audio, toggle } = backgroundAudioState;
  if (!audio || !toggle) return;

  audio.autoplay = true;
  audio.loop = true;
  audio.muted = false;
  audio.volume = 0.32;
  setBackgroundAudioState("paused");

  audio.addEventListener("play", () => setBackgroundAudioState("playing"));
  audio.addEventListener("pause", () => setBackgroundAudioState("paused"));

  toggle.addEventListener("click", async () => {
    if (audio.paused) {
      backgroundAudioState.hasUserPaused = false;
      await playBackgroundAudio();
      return;
    }

    backgroundAudioState.hasUserPaused = true;
    audio.pause();
    setBackgroundAudioState("paused");
  });

  attachBackgroundAudioUnlock();
  scheduleBackgroundAudioAutoplay();
}

document.addEventListener("DOMContentLoaded", () => {
  initCursor();
  initCopyButtons();
  initScrollEffects();
  enhanceCatalog();
  addMarketplaceDepth();
  initPagination();
  initBackgroundAudio();
});
