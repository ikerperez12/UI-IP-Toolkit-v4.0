const backgroundAudioState = {
  audio: null,
  toggle: null,
  hasUserPaused: false,
  unlockAttached: false,
};

const catalogPaginationState = {
  instances: [],
  frame: 0,
  resizeObserver: null,
};

const catalogSectionConfig = {
  "#colors .pal-g": {
    minWidth: 130,
    gap: 10,
    rows: { wide: 3, desktop: 3, tablet: 3, mobile: 4 },
    reserveHeight: { wide: 372, desktop: 372, tablet: 472, mobile: 0 },
  },
  "#gradients .gr-g": {
    minWidth: 260,
    gap: 16,
    rows: { wide: 2, desktop: 2, tablet: 2, mobile: 3 },
    reserveHeight: { wide: 336, desktop: 336, tablet: 520, mobile: 0 },
  },
  "#animations .an-g": {
    minWidth: 155,
    gap: 14,
    rows: { wide: 3, desktop: 3, tablet: 3, mobile: 4 },
    reserveHeight: { wide: 556, desktop: 556, tablet: 620, mobile: 0 },
  },
  "#typography .fn-r": {
    minWidth: 220,
    gap: 16,
    rows: { wide: 2, desktop: 2, tablet: 2, mobile: 3 },
    reserveHeight: { wide: 540, desktop: 540, tablet: 760, mobile: 0 },
  },
  "#buttons .btn-g": {
    minWidth: 250,
    gap: 18,
    rows: { wide: 2, desktop: 2, tablet: 2, mobile: 3 },
    reserveHeight: { wide: 536, desktop: 536, tablet: 690, mobile: 0 },
  },
  "#loading .load-g": {
    minWidth: 220,
    gap: 18,
    rows: { wide: 2, desktop: 2, tablet: 2, mobile: 3 },
    reserveHeight: { wide: 518, desktop: 518, tablet: 690, mobile: 0 },
  },
  "#textfx .tx-g": {
    minWidth: 300,
    gap: 18,
    rows: { wide: 2, desktop: 2, tablet: 2, mobile: 3 },
    reserveHeight: { wide: 474, desktop: 474, tablet: 620, mobile: 0 },
  },
  "#shadows .sh-g": {
    minWidth: 200,
    gap: 16,
    rows: { wide: 2, desktop: 2, tablet: 2, mobile: 3 },
    reserveHeight: { wide: 422, desktop: 422, tablet: 568, mobile: 0 },
  },
  "#hover .hf-g": {
    minWidth: 260,
    gap: 18,
    rows: { wide: 2, desktop: 2, tablet: 2, mobile: 3 },
    reserveHeight: { wide: 612, desktop: 612, tablet: 760, mobile: 0 },
  },
  "#glass .gl-g": {
    minWidth: 280,
    gap: 20,
    rows: { wide: 2, desktop: 2, tablet: 2, mobile: 3 },
    reserveHeight: { wide: 650, desktop: 650, tablet: 810, mobile: 0 },
  },
  "#utils .ut-g": {
    minWidth: 220,
    gap: 14,
    rows: { wide: 2, desktop: 2, tablet: 2, mobile: 3 },
    reserveHeight: { wide: 510, desktop: 510, tablet: 680, mobile: 0 },
  },
  "#neutral .cp-g": {
    minWidth: 260,
    gap: 18,
    rows: { wide: 2, desktop: 2, tablet: 2, mobile: 3 },
    reserveHeight: { wide: 552, desktop: 552, tablet: 720, mobile: 0 },
  },
  "#components .cp-g": {
    minWidth: 260,
    gap: 18,
    rows: { wide: 2, desktop: 2, tablet: 2, mobile: 3 },
    reserveHeight: { wide: 552, desktop: 552, tablet: 720, mobile: 0 },
  },
  "#layouts .ly-g": {
    minWidth: 260,
    gap: 18,
    rows: { wide: 2, desktop: 2, tablet: 2, mobile: 3 },
    reserveHeight: { wide: 540, desktop: 540, tablet: 720, mobile: 0 },
  },
  "#styles .sty-g": {
    minWidth: 250,
    gap: 18,
    rows: { wide: 2, desktop: 2, tablet: 2, mobile: 3 },
    reserveHeight: { wide: 520, desktop: 520, tablet: 710, mobile: 0 },
  },
  "#palettes .ip-g": {
    minWidth: 220,
    gap: 16,
    rows: { wide: 2, desktop: 2, tablet: 2, mobile: 3 },
    reserveHeight: { wide: 428, desktop: 428, tablet: 580, mobile: 0 },
  },
  "#spacing .sp-g": {
    minWidth: 220,
    gap: 16,
    rows: { wide: 2, desktop: 2, tablet: 2, mobile: 3 },
    reserveHeight: { wide: 424, desktop: 424, tablet: 580, mobile: 0 },
  },
  "#sera-navigation .cp-g": {
    minWidth: 260,
    gap: 18,
    rows: { wide: 2, desktop: 2, tablet: 2, mobile: 3 },
    reserveHeight: { wide: 552, desktop: 552, tablet: 720, mobile: 0 },
  },
  "#sera-cards .cp-g": {
    minWidth: 280,
    gap: 18,
    rows: { wide: 2, desktop: 2, tablet: 2, mobile: 3 },
    reserveHeight: { wide: 626, desktop: 626, tablet: 790, mobile: 0 },
  },
  "#sera-sections .cp-g": {
    minWidth: 320,
    gap: 20,
    rows: { wide: 2, desktop: 2, tablet: 1, mobile: 2 },
    reserveHeight: { wide: 666, desktop: 666, tablet: 412, mobile: 0 },
  },
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

function getViewportTier() {
  if (window.innerWidth >= 1280) return "wide";
  if (window.innerWidth >= 1024) return "desktop";
  if (window.innerWidth >= 768) return "tablet";
  return "mobile";
}

function getResponsiveConfigValue(value, tier) {
  if (value == null || typeof value === "number") return value;
  return value[tier] ?? value.desktop ?? value.wide ?? Object.values(value)[0];
}

function getSectionConfig(grid) {
  return catalogSectionConfig[grid.dataset.catalogKey] || {};
}

function getGridGap(grid) {
  const config = getSectionConfig(grid);
  return Number(grid.dataset.gridGap || config.gap || 16);
}

function getGridMinWidth(grid) {
  const config = getSectionConfig(grid);
  return Number(grid.dataset.minCardWidth || config.minWidth || 220);
}

function applyGridStability(grid, items, minHeightOverride = null) {
  const config = getSectionConfig(grid);
  const tier = getViewportTier();
  const minWidth = getGridMinWidth(grid);
  const gap = getGridGap(grid);
  const reserveHeight =
    minHeightOverride == null
      ? Number(getResponsiveConfigValue(config.reserveHeight, tier) || 0)
      : Number(minHeightOverride || 0);

  grid.classList.add("catalog-grid");
  grid.dataset.tier = tier;
  grid.style.display = "grid";
  grid.style.gap = `${gap}px`;
  grid.style.alignItems = "stretch";
  grid.style.gridTemplateColumns = `repeat(auto-fill, minmax(min(${minWidth}px, 100%), 1fr))`;
  grid.style.setProperty("--catalog-min-card-width", `${minWidth}px`);
  grid.style.setProperty("--catalog-grid-gap", `${gap}px`);

  if (reserveHeight > 0 && items.length > 1) {
    grid.style.minHeight = `${reserveHeight}px`;
  } else {
    grid.style.removeProperty("min-height");
  }
}

function getTargetRowCount(grid) {
  const config = getSectionConfig(grid);
  const tier = getViewportTier();
  return Number(getResponsiveConfigValue(config.rows, tier) || 2);
}

function measureColumns(grid, items) {
  const minWidth = getGridMinWidth(grid);
  const gap = getGridGap(grid);
  const gridWidth = Math.max(grid.clientWidth, grid.getBoundingClientRect().width);

  if (gridWidth > 0) {
    return Math.max(1, Math.min(items.length, Math.floor((gridWidth + gap) / (minWidth + gap))));
  }

  return Math.max(1, Math.min(items.length, getGridColumnCount(grid) || getWrappedColumnCount(items)));
}

function measureGridProfile(instance) {
  const { grid, items } = instance;
  const tier = getViewportTier();
  const width = Math.round(Math.max(grid.clientWidth, grid.getBoundingClientRect().width));
  const signature = `${tier}:${width}`;

  if (instance.measurementSignature === signature && instance.cardProfile) {
    return instance.cardProfile;
  }

  const snapshot = items.map((item) => ({
    hidden: item.hidden,
    hasHiddenClass: item.classList.contains("hidden"),
    opacity: item.style.opacity,
    transform: item.style.transform,
  }));

  applyGridStability(grid, items, 0);

  items.forEach((item) => {
    item.hidden = false;
    item.classList.remove("hidden");
    item.style.opacity = "1";
    item.style.transform = "";
  });

  const columns = measureColumns(grid, items);
  const rows = getTargetRowCount(grid);
  const gap = getGridGap(grid);
  const maxCardHeight = items.reduce((maxHeight, item) => {
    return Math.max(maxHeight, Math.ceil(item.getBoundingClientRect().height));
  }, 0);

  snapshot.forEach((state, index) => {
    const item = items[index];
    item.hidden = state.hidden;
    item.classList.toggle("hidden", state.hasHiddenClass);
    item.style.opacity = state.opacity;
    item.style.transform = state.transform;
  });

  const reserveHeight = maxCardHeight
    ? maxCardHeight * rows + gap * Math.max(rows - 1, 0)
    : 0;

  instance.measurementSignature = signature;
  instance.cardProfile = {
    columns,
    rows,
    gap,
    maxCardHeight,
    reserveHeight,
  };

  return instance.cardProfile;
}

function measurePageSize(grid, items, profile) {
  if (!items.length) return 1;

  const columns = profile?.columns || measureColumns(grid, items);
  const rows = profile?.rows || getTargetRowCount(grid);
  const minimum = Number(grid.dataset.minPageSize || 1);
  const pageSize = columns * rows;

  return Math.min(items.length, Math.max(minimum, pageSize));
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

function setPaginationItemVisibility(item, visible) {
  item.hidden = !visible;
  item.classList.toggle("hidden", !visible);
  item.style.opacity = visible ? "1" : "0";
  item.style.transform = visible ? "translateY(0)" : "translateY(8px)";
  item.style.pointerEvents = visible ? "" : "none";
  item.setAttribute("aria-hidden", String(!visible));
  item.inert = !visible;
}

function updatePaginationInstance(instance) {
  const { grid, items, controls, prevButton, nextButton, status } = instance;

  const previousPage = instance.currentPage || 1;
  const profile = measureGridProfile(instance);
  applyGridStability(grid, items, profile.reserveHeight);
  instance.columns = profile.columns;
  instance.pageSize = measurePageSize(grid, items, profile);
  instance.maxPage = Math.max(1, Math.ceil(items.length / instance.pageSize));
  instance.currentPage = Math.min(previousPage, instance.maxPage);

  if (items.length <= instance.pageSize) {
    grid.style.removeProperty("min-height");
    items.forEach((item) => {
      setPaginationItemVisibility(item, true);
      item.style.transform = "";
    });
    controls.hidden = true;
    prevButton.disabled = true;
    nextButton.disabled = true;
    return;
  }

  controls.hidden = false;

  items.forEach((item, index) => {
    const visible =
      index >= (instance.currentPage - 1) * instance.pageSize &&
      index < instance.currentPage * instance.pageSize;

    setPaginationItemVisibility(item, visible);
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

function createCardSource(item) {
  return item.source ? `<div class="kit-source">${item.source}</div>` : "";
}

function createToolkitCard(item, className = "ut-c") {
  const previewClass = ["mini-preview", item.previewMode || "", item.previewClass || ""].filter(Boolean).join(" ");

  return `
    <div class="${className} has-copy page-item" data-snippet="btn" data-html="${encodeAttribute(item.html)}">
      <div class="${previewClass}">${item.preview}</div>
      <div class="kit-copy-meta">
        ${createCardSource(item)}
        <div class="ut-n">${item.title}</div>
        <div class="kit-meta">${item.description}</div>
      </div>
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

function createComponentCard(item) {
  const previewClass = ["cp-p", item.previewMode || "", item.previewClass || ""].filter(Boolean).join(" ");

  return `
    <div class="cp-c has-copy page-item" data-snippet="btn" data-html="${encodeAttribute(item.html)}">
      <div class="${previewClass}">${item.preview}</div>
      <div class="cp-i">
        ${createCardSource(item)}
        <h4>${item.title}</h4>
        <p>${item.description}</p>
      </div>
      ${copyButtonMarkup()}
    </div>
  `;
}

function addComponentCards(selector, items) {
  const grid = document.querySelector(selector);
  if (!grid) return;

  grid.insertAdjacentHTML("beforeend", items.map((item) => createComponentCard(item)).join(""));
  grid.classList.add("paginated");
  grid.dataset.minPageSize = grid.dataset.minPageSize || "8";
}

function removeCardsByTitle(selector, matcher) {
  const grid = document.querySelector(selector);
  if (!grid) return;

  Array.from(grid.children).forEach((card) => {
    const title =
      card.querySelector(".ut-n, .ln, .tx-label, .sn, .hf-i h4, .cp-i h4, h4, .gl-p h4, .gl-p, .an, .gl, .cn")?.textContent?.trim() || "";

    if (title && matcher(title)) {
      card.remove();
    }
  });
}

function promoteCards(selector, matcher) {
  const grid = document.querySelector(selector);
  if (!grid) return;

  const cards = Array.from(grid.children).filter((card) => matcher(card));
  cards.reverse().forEach((card) => {
    grid.insertAdjacentElement("afterbegin", card);
  });
}

function normalizeButtonShelves() {
  document.querySelectorAll("#buttons .bw").forEach((shelf) => {
    if (shelf.dataset.shelfReady) return;

    const copyButton = shelf.querySelector(".cpb");
    const previewButton = Array.from(shelf.querySelectorAll("button")).find((button) => button !== copyButton);
    if (!previewButton) return;

    shelf.dataset.shelfReady = "true";
    shelf.classList.add("page-item", "btn-shelf");

    if (!shelf.querySelector(".btn-shelf-stage")) {
      const stage = document.createElement("div");
      stage.className = "btn-shelf-stage";
      previewButton.replaceWith(stage);
      stage.appendChild(previewButton);
    }

    if (!shelf.querySelector(".btn-shelf-meta")) {
      const meta = document.createElement("div");
      meta.className = "btn-shelf-meta";

      const title = document.createElement("div");
      title.className = "btn-shelf-title";
      title.textContent = previewButton.textContent.replace(/\s+/g, " ").trim();

      const note = document.createElement("div");
      note.className = "btn-shelf-note";
      note.textContent = "Classic example";

      meta.append(title, note);
      shelf.appendChild(meta);
    }
  });
}

function setGridPageConfig(selector, config) {
  const grid = document.querySelector(selector);
  if (!grid) return;

  grid.classList.add("paginated");
  grid.dataset.catalogKey = selector;
  grid.dataset.minPageSize = String(config.minPageSize || 1);
  grid.dataset.minCardWidth = String(config.minWidth || 220);
  grid.dataset.gridGap = String(config.gap || 16);
  delete grid.dataset.pageSize;
}

function createColorCard(item) {
  return `
    <div class="cc has-copy page-item" data-snippet="color" data-color="${item.hex}" data-name="${item.name}">
      <div class="csw" style="background:${item.hex}"></div>
      <div class="ci"><div class="cn">${item.name}</div><div class="ch">${item.hex}</div></div>
      ${copyButtonMarkup()}
    </div>
  `;
}

function createGradientCard(item) {
  return `
    <div class="gc has-copy page-item" style="background:${item.css}" data-snippet="gradient" data-css="${encodeAttribute(item.css)}">
      <span class="gl">${item.name}</span>
      ${copyButtonMarkup()}
    </div>
  `;
}

function createFontCard(item) {
  const weights = item.weights.map((weight) => `<span class="wt">${weight}</span>`).join("");
  const sample = item.sample.replaceAll("\n", "<br>");

  return `
    <div class="fc has-copy page-item" data-snippet="font" data-font="'${item.family}', ${item.fallback || "sans-serif"}">
      <div>
        <div class="fn-n">${item.label}</div>
        <div class="fn-s" style="font-family:'${item.family}',${item.fallback || "sans-serif"}">${sample}</div>
      </div>
      <div class="fn-w">${weights}</div>
      ${copyButtonMarkup()}
    </div>
  `;
}

function createAnimationCard(item) {
  return `
    <div class="ac has-copy page-item" data-snippet="btn" data-html="${encodeAttribute(item.html)}">
      <div class="db" style="${item.previewStyle}">${item.previewInner || ""}</div>
      <div class="an">${item.name}</div>
      <div class="ad">${item.description}</div>
      ${copyButtonMarkup()}
    </div>
  `;
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
  note.textContent = "Expanded with original patterns inspired by current copy-paste UI ecosystems: Sera UI, shadcn/ui blocks, Magic UI, Aceternity UI, ReactBits, Flowbite, DaisyUI, CodePen, and GitHub component galleries.";
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

function rebuildTypographyLibrary() {
  const grid = document.querySelector("#typography .fn-r");
  if (!grid) return;

  const fonts = [
    { label: "Space Grotesk", family: "Space Grotesk", sample: "Spatial\nInterface", weights: ["400", "500", "700"] },
    { label: "Sora", family: "Sora", sample: "Future\nSignal", weights: ["300", "400", "600"] },
    { label: "Manrope", family: "Manrope", sample: "Quiet\nProduct", weights: ["400", "600", "800"] },
    { label: "Outfit", family: "Outfit", sample: "Launch\nKit", weights: ["300", "500", "700"] },
    { label: "Plus Jakarta Sans", family: "Plus Jakarta Sans", sample: "Clear\nDashboard", weights: ["400", "600", "800"] },
    { label: "DM Sans", family: "DM Sans", sample: "Editorial\nSystem", weights: ["400", "500", "700"] },
    { label: "Syne", family: "Syne", sample: "Bold\nPoster", weights: ["400", "500", "700"] },
    { label: "Fraunces", family: "Fraunces", sample: "Luxury\nNotes", fallback: "serif", weights: ["300", "400", "600"] },
    { label: "IBM Plex Sans", family: "IBM Plex Sans", sample: "Utility\nForms", weights: ["400", "500", "700"] },
    { label: "Archivo", family: "Archivo", sample: "Sport\nMetrics", weights: ["400", "600", "700"] },
    { label: "Urbanist", family: "Urbanist", sample: "Fluid\nInterface", weights: ["300", "500", "700"] },
    { label: "Instrument Serif", family: "Instrument Serif", fallback: "serif", sample: "Cinematic\nStory", weights: ["400", "500", "700"] },
    { label: "Onest", family: "Onest", sample: "Sharp\nProduct", weights: ["400", "600", "700"] },
    { label: "Rajdhani", family: "Rajdhani", sample: "Motion\nSystem", weights: ["400", "500", "700"] },
    { label: "System Serif", family: "Fraunces", fallback: "serif", sample: "Readable\nStory", weights: ["400", "500", "700"] },
  ];

  grid.innerHTML = fonts.map(createFontCard).join("");
  grid.classList.add("sg", "paginated");
}

function pruneCatalogNoise() {
  removeCardsByTitle("#gradients .gr-g", (title) => /^Dynamic \d+$/i.test(title));
  removeCardsByTitle("#buttons .btn-g", (title) => /^(Brutal|Gradient Btn) \d+$/i.test(title));
  removeCardsByTitle("#loading .load-g", (title) => /^(Spinner|Ping Ring) \d+$/i.test(title));
  removeCardsByTitle("#shadows .sh-g", (title) => /^Shadow \d+$/i.test(title));
}

function addSeraCatalog() {
  addToolkitCards("#buttons .btn-g", [
    {
      source: "Sera UI",
      title: "Ripple Button",
      description: "Rounded action with inline ripple, icon slots and loading state.",
      preview: `<button style="position:relative;overflow:hidden;padding:12px 18px;border-radius:12px;background:#f8fafc;color:#020617;border:0;font-weight:800;box-shadow:0 10px 24px rgba(15,23,42,.18)">Click me<span style="position:absolute;inset:auto auto -18px -10px;width:44px;height:44px;border-radius:50%;background:rgba(15,23,42,.1)"></span></button>`,
      html: `import Button from "@/components/sera-ui/02-buttons/button/button";\n\n<Button variant="default" iconRight={<ArrowRight />}>Click me</Button>`,
    },
    {
      source: "Sera UI",
      title: "Shimmer Button",
      description: "Primary CTA with sweeping sheen for upgrade and checkout moments.",
      preview: `<button style="position:relative;overflow:hidden;padding:12px 20px;border-radius:999px;border:1px solid rgba(255,255,255,.12);background:#0f172a;color:#fff;font-weight:700">Upgrade<span style="position:absolute;inset:-18px auto -18px -40px;width:28px;background:rgba(255,255,255,.32);transform:rotate(14deg)"></span></button>`,
      html: `import ShimmerButton from "@/components/sera-ui/02-buttons/shimmer/shimmer";\n\n<ShimmerButton shimmerColor="#ffffff">Upgrade</ShimmerButton>`,
    },
  ]);

  addToolkitCards("#textfx .tx-g", [
    {
      source: "Sera UI",
      title: "Flip Words",
      description: "Hero copy that flips through stack, framework or role words.",
      previewMode: "stack",
      preview: `<strong style="font-size:28px;color:#fff;line-height:1.1">Build with <span style="display:inline-block;min-width:80px;color:#38bdf8">React</span></strong><div class="kit-row"><span class="kit-pill">Next.js</span><span class="kit-pill">TypeScript</span><span class="kit-pill">Tailwind</span></div>`,
      html: `import FlipWords from "@/components/sera-ui/05-text/flipwords/flipwords";\n\n<FlipWords words={["React", "Next.js", "TypeScript", "Tailwind"]} />`,
    },
    {
      source: "Sera UI",
      title: "Decrypting Text",
      description: "Hacker-style reveal for labels, easter eggs and interactive prompts.",
      previewMode: "stack",
      preview: `<span style="font-family:monospace;font-size:22px;color:#4ade80;letter-spacing:.08em">HELLO_W0RLD</span><span style="font-size:11px;color:#94a3b8">Hover trigger friendly</span>`,
      html: `import DecryptingText from "@/components/sera-ui/05-text/decrypting/decrypting";\n\n<DecryptingText text="HELLO WORLD" onHover />`,
    },
    {
      source: "Sera UI",
      title: "Number Ticker",
      description: "Animated metric counter with prefix, suffix and in-view trigger.",
      previewMode: "stack",
      preview: `<strong style="font-size:32px;color:#fff">$71,897</strong><span style="color:#4ade80;font-size:11px">+12.4% this month</span>`,
      html: `import NumberTicker from "@/components/sera-ui/05-text/ticker/ticker";\n\n<NumberTicker value={71897} prefix="$" suffix=" MRR" />`,
    },
    {
      source: "Sera UI",
      title: "Aurora Text",
      description: "Animated multi-color headline for launch pages and feature banners.",
      preview: `<strong style="font-size:30px;background:linear-gradient(135deg,#ff0080,#7928ca,#0070f3,#00dfd8);background-size:200% 200%;-webkit-background-clip:text;color:transparent">Aurora</strong>`,
      html: `import AuroraText from "@/components/sera-ui/05-text/aurora/aurora";\n\n<AuroraText>Launch faster</AuroraText>`,
    },
  ]);

  addToolkitCards("#loading .load-g", [
    {
      source: "Sera UI",
      title: "Spinner Classic",
      description: "Default SVG spinner for submit, fetch and sync states.",
      preview: `<div style="width:38px;height:38px;border:4px solid rgba(255,255,255,.12);border-top-color:#38bdf8;border-radius:50%"></div>`,
      html: `import { SpinnerClassic } from "@/components/sera-ui/13-tools/loaders/loaders";\n\n<SpinnerClassic size="md" />`,
    },
    {
      source: "Sera UI",
      title: "Spinner Dots",
      description: "Three-dot typing style loader for chat and async panels.",
      preview: `<div style="display:flex;gap:6px"><span style="width:10px;height:10px;border-radius:50%;background:#fff"></span><span style="width:10px;height:10px;border-radius:50%;background:#c2a4ff"></span><span style="width:10px;height:10px;border-radius:50%;background:#fb8dff"></span></div>`,
      html: `import { SpinnerDots } from "@/components/sera-ui/13-tools/loaders/loaders";\n\n<SpinnerDots size="lg" />`,
    },
    {
      source: "Sera UI",
      title: "Spinner Ring",
      description: "Minimal ring loader for dashboards, modals and utility rails.",
      preview: `<div style="width:42px;height:42px;border-radius:50%;border:4px solid rgba(255,255,255,.12);border-top-color:#4ade80"></div>`,
      html: `import { SpinnerRing } from "@/components/sera-ui/13-tools/loaders/loaders";\n\n<SpinnerRing size="md" />`,
    },
    {
      source: "Sera UI",
      title: "Spinner Pulse",
      description: "Single pulse indicator for lightweight background activity.",
      preview: `<div style="width:38px;height:38px;border-radius:50%;background:#c2a4ff;box-shadow:0 0 0 12px rgba(194,164,255,.1)"></div>`,
      html: `import { SpinnerPulse } from "@/components/sera-ui/13-tools/loaders/loaders";\n\n<SpinnerPulse size="md" />`,
    },
  ]);

  addComponentCards("#components .cp-g", [
    {
      source: "Sera UI",
      title: "Status Badge",
      description: "Compact semantic badge with success, warning and destructive variants.",
      previewMode: "stack",
      preview: `<div class="kit-row"><span class="kit-pill">Default</span><span class="kit-pill" style="background:rgba(74,222,128,.14);color:#4ade80">Active</span><span class="kit-pill" style="background:rgba(244,63,94,.14);color:#fb7185">Error</span></div>`,
      html: `import { Badge } from "@/components/sera-ui/03-badges/badge/badge";\n\n<Badge variant="success">Active</Badge>`,
    },
    {
      source: "Sera UI",
      title: "Toast Notification",
      description: "Dismissible top-right alert stack for feedback and async actions.",
      previewMode: "stack",
      preview: `<div style="display:grid;gap:8px;width:100%"><div style="display:flex;gap:10px;align-items:flex-start;padding:12px;border-radius:14px;background:#0f172a;border:1px solid rgba(74,222,128,.18);color:#fff"><span style="width:10px;height:10px;border-radius:50%;background:#4ade80;box-shadow:0 0 0 6px rgba(74,222,128,.12)"></span><div><strong style="display:block;font-size:13px">Saved</strong><span style="font-size:11px;color:#94a3b8">Changes synced</span></div></div><div style="display:flex;gap:10px;align-items:flex-start;padding:12px;border-radius:14px;background:#111827;border:1px solid rgba(56,189,248,.18);color:#fff"><span style="width:10px;height:10px;border-radius:50%;background:#38bdf8"></span><div><strong style="display:block;font-size:13px">Deploying</strong><span style="font-size:11px;color:#94a3b8">Preview in progress</span></div></div></div>`,
      html: `import { Toaster, toast } from "@/components/sera-ui/03-badges/toast/toast";\n\ntoast.success("Saved", "Changes synced");`,
    },
  ]);

  addComponentCards("#sera-navigation .cp-g", [
    {
      source: "Sera UI",
      title: "Dropdown Menu",
      description: "Animated trigger plus compact menu for inline actions and utility panels.",
      previewMode: "stack",
      preview: `<button style="display:inline-flex;align-items:center;gap:8px;padding:11px 16px;border-radius:12px;border:1px solid rgba(255,255,255,.12);background:#111827;color:#fff;font-weight:700">Actions <span style="opacity:.6">v</span></button><div style="display:grid;gap:6px;width:100%;padding:10px;border-radius:14px;background:#0f172a;border:1px solid rgba(255,255,255,.08)"><span class="kit-pill" style="justify-content:flex-start">Edit</span><span class="kit-pill" style="justify-content:flex-start">Duplicate</span><span class="kit-pill" style="justify-content:flex-start">Delete</span></div>`,
      html: `import Dropdown from "@/components/sera-ui/02-buttons/dropdown/dropdown";\n\n<Dropdown trigger="Actions" items={[{ label: "Edit" }, { label: "Delete", danger: true }]} />`,
    },
    {
      source: "Sera UI",
      title: "Tabs",
      description: "Animated tab indicator for profile, settings and docs surfaces.",
      previewMode: "stack",
      preview: `<div style="display:flex;gap:6px;width:100%;padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,.08)"><span class="kit-pill" style="background:#fff;color:#020617">Profile</span><span class="kit-pill">Billing</span><span class="kit-pill">Usage</span></div><div style="width:100%;height:54px;border-radius:14px;background:rgba(255,255,255,.04)"></div>`,
      html: `import Tabs from "@/components/sera-ui/06-navigation/tabs/tabs";\n\n<Tabs tabs={[{ id: "profile", label: "Profile", content: <Profile /> }]} />`,
    },
    {
      source: "Sera UI",
      title: "Accordion",
      description: "Accessible disclosure rows for FAQs, changelogs and settings.",
      previewMode: "stack",
      preview: `<div style="display:grid;gap:8px;width:100%"><div style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border-radius:14px;background:#0f172a;border:1px solid rgba(255,255,255,.08);color:#fff"><span>What is Sera UI?</span><span>+</span></div><div style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border-radius:14px;background:#111827;color:#94a3b8"><span>Is it open source?</span><span>+</span></div></div>`,
      html: `import Accordion from "@/components/sera-ui/07-accordions/accordion/accordion";\n\n<Accordion items={[{ id: "q1", title: "What is Sera UI?", content: "A component library." }]} />`,
    },
    {
      title: "Command Overlay",
      description: "Shortcut-first launcher for docs, search and quick navigation.",
      previewMode: "stack",
      preview: `<div style="width:100%;padding:14px;border-radius:16px;background:#0b1120;border:1px solid rgba(255,255,255,.08);color:#fff"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><span style="font-size:11px;color:#94a3b8">Search docs</span><span class="kit-pill">Ctrl K</span></div><div style="margin-top:10px;height:10px;border-radius:999px;background:rgba(255,255,255,.08)"></div></div>`,
      html: `<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 16px;border-radius:16px;background:#0b1120;border:1px solid rgba(255,255,255,.08);color:#fff"><span>Search docs</span><kbd style="padding:4px 8px;border-radius:8px;background:#111827;color:#c2a4ff">Ctrl K</kbd></div>`,
    },
    {
      title: "Breadcrumb Rail",
      description: "Compact path indicator for nested dashboards and documentation.",
      preview: `<nav style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;color:#94a3b8;font-size:12px"><span>Docs</span><span>/</span><span>Components</span><span>/</span><strong style="color:#fff">Navigation</strong></nav>`,
      html: `<nav style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;color:#94a3b8"><a>Docs</a><span>/</span><a>Components</a><span>/</span><strong style="color:#fff">Navigation</strong></nav>`,
    },
  ]);

  addComponentCards("#sera-cards .cp-g", [
    {
      source: "Sera UI",
      title: "Basic Card",
      description: "Reusable card shell with header, content and footer slots.",
      previewMode: "stack",
      preview: `<div style="width:100%;padding:16px;border-radius:18px;background:#111827;border:1px solid rgba(255,255,255,.08);color:#fff"><span style="font-size:11px;color:#94a3b8">Analytics</span><strong style="display:block;margin-top:6px;font-size:20px">$12.4k</strong><div style="margin-top:12px;height:8px;border-radius:999px;background:rgba(255,255,255,.08)"><div style="width:62%;height:100%;border-radius:999px;background:#c2a4ff"></div></div></div>`,
      html: `import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/sera-ui/08-cards/card/card";\n\n<Card><CardHeader><CardTitle>Analytics</CardTitle></CardHeader></Card>`,
    },
    {
      source: "Sera UI",
      title: "Magic Card",
      description: "Spotlight card with cursor-reactive radial glow treatment.",
      preview: `<div style="width:100%;padding:18px;border-radius:18px;background:radial-gradient(circle at 24% 20%,rgba(56,189,248,.22),transparent 32%),radial-gradient(circle at 76% 78%,rgba(194,164,255,.18),transparent 28%),#0f172a;border:1px solid rgba(255,255,255,.08);color:#fff"><strong style="display:block;font-size:18px">Magic surface</strong><span style="font-size:11px;color:#94a3b8">Hover spotlight ready</span></div>`,
      html: `import MagicCard from "@/components/sera-ui/08-cards/magic/magic";\n\n<MagicCard className="p-6">Magic surface</MagicCard>`,
    },
    {
      source: "Sera UI",
      title: "Login Form",
      description: "Animated auth card with email, password and visibility toggle affordance.",
      previewMode: "stack",
      preview: `<div style="display:grid;gap:10px;width:100%;padding:14px;border-radius:18px;background:#0f172a;border:1px solid rgba(255,255,255,.08)"><div style="height:38px;border-radius:12px;background:#111827"></div><div style="height:38px;border-radius:12px;background:#111827"></div><button style="padding:11px 14px;border-radius:12px;border:0;background:#fff;color:#020617;font-weight:800">Sign in</button></div>`,
      html: `import LoginForm from "@/components/sera-ui/08-cards/login/login";\n\n<LoginForm onSubmit={handleLogin} />`,
    },
    {
      title: "Pricing Stack",
      description: "Commercial pricing slab with CTA and compact feature summary.",
      previewMode: "stack",
      preview: `<div style="width:100%;padding:16px;border-radius:18px;background:#fff;color:#020617"><span style="font-size:11px;color:#64748b">Pro</span><strong style="display:block;margin-top:8px;font-size:28px">$24</strong><div style="margin-top:12px;display:grid;gap:8px"><div style="height:10px;border-radius:999px;background:#e2e8f0"></div><div style="height:10px;width:78%;border-radius:999px;background:#e2e8f0"></div><button style="padding:10px 12px;border-radius:12px;border:0;background:#0f172a;color:#fff;font-weight:800">Start</button></div></div>`,
      html: `<div style="padding:24px;border-radius:20px;background:#fff;color:#020617"><span style="font-size:12px;color:#64748b">Pro</span><strong style="display:block;margin-top:8px;font-size:40px">$24/mo</strong><button style="margin-top:16px;padding:12px 16px;border-radius:12px;border:0;background:#0f172a;color:#fff;font-weight:800">Start</button></div>`,
    },
    {
      title: "Team List Card",
      description: "Member management card with avatar rows and metadata blocks.",
      previewMode: "stack",
      preview: `<div style="width:100%;padding:16px;border-radius:18px;background:#111827;border:1px solid rgba(255,255,255,.08);color:#fff"><strong style="display:block;font-size:15px">Team members</strong><div style="margin-top:12px;display:grid;gap:10px"><div style="display:flex;gap:10px;align-items:center"><span style="width:28px;height:28px;border-radius:50%;background:#374151"></span><div style="display:grid;gap:4px;flex:1"><div style="height:8px;border-radius:999px;background:rgba(255,255,255,.12)"></div><div style="height:8px;width:68%;border-radius:999px;background:rgba(255,255,255,.08)"></div></div></div></div></div>`,
      html: `<div style="padding:20px;border-radius:18px;background:#111827;color:#fff"><h3 style="margin:0 0 12px">Team members</h3><div style="display:flex;gap:12px;align-items:center"><span style="width:36px;height:36px;border-radius:50%;background:#374151"></span><div><strong>Jane Doe</strong><div style="color:#94a3b8">jane@example.com</div></div></div></div>`,
    },
  ]);

  addComponentCards("#sera-sections .cp-g", [
    {
      source: "Sera UI",
      title: "Hero Section",
      description: "Full landing hero with badge, headline, subcopy and dual CTAs.",
      previewMode: "stack",
      preview: `<div style="width:100%;padding:18px;border-radius:22px;background:radial-gradient(circle at top,#7c3aed22,transparent 44%),#0b1120;border:1px solid rgba(255,255,255,.08);color:#fff"><span class="kit-pill">Animated components</span><strong style="display:block;margin-top:12px;font-size:22px;line-height:1.05">Build interfaces faster</strong><span style="display:block;margin-top:8px;font-size:11px;color:#94a3b8">React + Next.js + Tailwind</span><div class="kit-row" style="margin-top:14px"><span class="kit-pill" style="background:#fff;color:#020617">Get started</span><span class="kit-pill">GitHub</span></div></div>`,
      html: `import HeroSection from "@/components/sera-ui/12-sections/hero/hero";\n\n<HeroSection />`,
    },
    {
      title: "Feature Hero",
      description: "Product hero with launch framing, value bullets and feature chips.",
      previewMode: "stack",
      preview: `<div style="width:100%;padding:18px;border-radius:22px;background:linear-gradient(135deg,#0b1120,#15162c);border:1px solid rgba(255,255,255,.08);color:#fff"><span class="kit-pill">Launch</span><strong style="display:block;margin-top:12px;font-size:22px;line-height:1.05">Ship the next release faster</strong><div class="kit-row" style="margin-top:12px"><span class="kit-pill">Metrics</span><span class="kit-pill">Docs</span><span class="kit-pill">Motion</span></div></div>`,
      html: `<section style="padding:48px;border-radius:28px;background:linear-gradient(135deg,#0b1120,#15162c);color:#fff"><h1 style="margin:0;font-size:48px">Ship the next release faster</h1><p style="margin:12px 0 0;color:#94a3b8">Hero section with launch-ready framing.</p></section>`,
    },
    {
      title: "CTA Banner",
      description: "Wide call-to-action strip for docs, pricing and release pages.",
      preview: `<div style="width:100%;padding:18px;border-radius:20px;background:linear-gradient(135deg,#fff,#e2e8f0);color:#020617"><strong style="display:block;font-size:18px">Ready to build?</strong><span style="display:block;margin-top:8px;font-size:11px;color:#475569">Copy a block and launch the next screen.</span></div>`,
      html: `<section style="padding:28px;border-radius:20px;background:linear-gradient(135deg,#fff,#e2e8f0);color:#020617"><strong style="font-size:24px">Ready to build?</strong><p style="margin:8px 0 0;color:#475569">Copy a block and launch the next screen.</p></section>`,
    },
    {
      title: "Stats Header",
      description: "Upper-page metrics band with chips and supporting narrative.",
      previewMode: "stack",
      preview: `<div style="width:100%;padding:18px;border-radius:20px;background:#0f172a;border:1px solid rgba(255,255,255,.08);color:#fff"><div class="kit-row"><span class="kit-pill">Revenue</span><span class="kit-pill">Users</span></div><strong style="display:block;margin-top:12px;font-size:26px">$71,897</strong><span style="display:block;margin-top:6px;color:#4ade80;font-size:11px">+18.4% vs last month</span></div>`,
      html: `<section style="padding:24px;border-radius:20px;background:#0f172a;color:#fff"><div style="display:flex;gap:8px"><span style="padding:6px 10px;border-radius:999px;background:rgba(56,189,248,.14);color:#38bdf8">Revenue</span><span style="padding:6px 10px;border-radius:999px;background:rgba(74,222,128,.14);color:#4ade80">Users</span></div><strong style="display:block;margin-top:12px;font-size:34px">$71,897</strong></section>`,
    },
  ]);

  promoteCards("#buttons .btn-g", (card) => card.querySelector(".kit-source")?.textContent?.trim() === "Sera UI");
  promoteCards("#textfx .tx-g", (card) => card.querySelector(".kit-source")?.textContent?.trim() === "Sera UI");
  promoteCards("#loading .load-g", (card) => card.querySelector(".kit-source")?.textContent?.trim() === "Sera UI");
  promoteCards("#components .cp-g", (card) => card.querySelector(".kit-source")?.textContent?.trim() === "Sera UI");
}

function configureCatalogPagination() {
  normalizeButtonShelves();

  Object.entries(catalogSectionConfig).forEach(([selector, config]) => {
    setGridPageConfig(selector, config);
  });
}

function deepenCatalog() {
  const colorGrid = document.querySelector("#colors .pal-g");
  if (colorGrid) {
    colorGrid.insertAdjacentHTML("beforeend", [
      { name: "Graphite", hex: "#1f2937" },
      { name: "Steel", hex: "#334155" },
      { name: "Cloud", hex: "#cbd5e1" },
      { name: "Indigo", hex: "#6366f1" },
      { name: "Skyline", hex: "#38bdf8" },
      { name: "Lagoon", hex: "#14b8a6" },
      { name: "Emerald", hex: "#10b981" },
      { name: "Sunbeam", hex: "#facc15" },
      { name: "Coral", hex: "#fb7185" },
      { name: "Signal Red", hex: "#ef4444" },
      { name: "Amber", hex: "#f59e0b" },
      { name: "Pearl", hex: "#f8fafc" },
    ].map(createColorCard).join(""));
  }

  const gradientGrid = document.querySelector("#gradients .gr-g");
  if (gradientGrid) {
    gradientGrid.insertAdjacentHTML("beforeend", [
      { name: "Signal Bloom", css: "linear-gradient(135deg,#0f172a,#7c3aed,#fb7185)" },
      { name: "Mint Terminal", css: "linear-gradient(135deg,#020617,#0f766e,#4ade80)" },
      { name: "Copper Editorial", css: "linear-gradient(135deg,#1c1917,#b45309,#f5f5f4)" },
      { name: "Cloud Burst", css: "linear-gradient(135deg,#f8fafc,#cbd5e1,#38bdf8)" },
      { name: "Night Mesh", css: "radial-gradient(circle at 20% 20%,#7c3aed,transparent 35%),radial-gradient(circle at 80% 10%,#06b6d4,transparent 25%),#020617" },
      { name: "Launch Flame", css: "linear-gradient(135deg,#111827,#f97316,#facc15)" },
      { name: "Rose Circuit", css: "linear-gradient(135deg,#111827,#db2777,#fb7185)" },
      { name: "Mono Aurora", css: "linear-gradient(135deg,#020617,#475569,#e2e8f0)" },
      { name: "Electric Mint", css: "linear-gradient(135deg,#020617,#0f766e,#5eead4)" },
      { name: "Studio Iris", css: "linear-gradient(135deg,#1e1b4b,#7c3aed,#c4b5fd)" },
      { name: "Solar Bloom", css: "linear-gradient(135deg,#451a03,#fb923c,#fde68a)" },
      { name: "Ocean Depth", css: "radial-gradient(circle at 15% 15%,#38bdf8,transparent 26%),linear-gradient(135deg,#020617,#0f172a,#0f766e)" },
    ].map(createGradientCard).join(""));
  }

  const animationGrid = document.querySelector("#animations .an-g");
  if (animationGrid) {
    animationGrid.insertAdjacentHTML("beforeend", [
      {
        name: "Radar Sweep",
        description: "Rotating sonar line",
        previewStyle: "border-radius:50%;background:conic-gradient(from 90deg,transparent,rgba(194,164,255,.85),transparent);animation:spin 1.6s linear infinite",
        html: "<style>@keyframes radarSweep{to{transform:rotate(360deg)}}</style><div style=\"width:56px;height:56px;border-radius:50%;background:conic-gradient(from 90deg,transparent,rgba(194,164,255,.85),transparent);animation:radarSweep 1.6s linear infinite\"></div>",
      },
      {
        name: "Wave Lift",
        description: "Organic vertical motion",
        previewStyle: "border-radius:12px;background:linear-gradient(135deg,#38bdf8,#c2a4ff);animation:floatUp 1.8s ease-in-out infinite",
        html: "<style>@keyframes waveLift{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}</style><div style=\"width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,#38bdf8,#c2a4ff);animation:waveLift 1.8s ease-in-out infinite\"></div>",
      },
      {
        name: "Hue Orbit",
        description: "Color-cycling badge",
        previewStyle: "border-radius:999px;background:linear-gradient(135deg,#c2a4ff,#fb8dff);animation:glow 1.4s ease-in-out infinite alternate",
        html: "<style>@keyframes hueOrbit{0%{filter:hue-rotate(0)}100%{filter:hue-rotate(120deg)}}</style><div style=\"display:inline-flex;padding:10px 16px;border-radius:999px;background:linear-gradient(135deg,#c2a4ff,#fb8dff);animation:hueOrbit 1.8s linear infinite\">Orbit</div>",
      },
      {
        name: "Scanline",
        description: "Fast horizontal scan",
        previewStyle: "background:linear-gradient(90deg,transparent,#4ade80,transparent);animation:slideIO 1.5s ease-in-out infinite",
        html: "<style>@keyframes scanline{0%,100%{transform:translateX(-110%)}50%{transform:translateX(110%)}}</style><div style=\"overflow:hidden;width:84px;height:10px;border-radius:999px;background:rgba(255,255,255,.08)\"><div style=\"width:60%;height:100%;background:linear-gradient(90deg,transparent,#4ade80,transparent);animation:scanline 1.5s ease-in-out infinite\"></div></div>",
      },
      {
        name: "Pendulum",
        description: "Balanced swing motion",
        previewStyle: "border-radius:12px;background:linear-gradient(135deg,#facc15,#fb7185);transform-origin:top center;animation:swing 1.8s ease-in-out infinite",
        html: "<style>@keyframes pendulum{0%,100%{transform:rotate(0)}25%{transform:rotate(10deg)}75%{transform:rotate(-10deg)}}</style><div style=\"width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,#facc15,#fb7185);transform-origin:top center;animation:pendulum 1.8s ease-in-out infinite\"></div>",
      },
      {
        name: "Dial Pop",
        description: "Interface attention pulse",
        previewStyle: "border-radius:50%;background:linear-gradient(135deg,#111827,#6366f1);animation:scaleUp 1.2s ease-in-out infinite alternate",
        html: "<style>@keyframes dialPop{0%{transform:scale(.82)}100%{transform:scale(1.08)}}</style><div style=\"width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#111827,#6366f1);animation:dialPop 1.2s ease-in-out infinite alternate\"></div>",
      },
      {
        name: "Signal Blink",
        description: "Status light with clean pulse",
        previewStyle: "border-radius:50%;background:#4ade80;animation:pulse 1s ease-in-out infinite",
        html: "<style>@keyframes signalBlink{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}</style><div style=\"width:16px;height:16px;border-radius:50%;background:#4ade80;animation:signalBlink 1s ease-in-out infinite\"></div>",
      },
      {
        name: "Ribbon Slide",
        description: "Horizontal ribbon sweep",
        previewStyle: "border-radius:999px;background:linear-gradient(90deg,#38bdf8,#c2a4ff);animation:slideIO 1.1s ease-in-out infinite",
        html: "<style>@keyframes ribbonSlide{0%,100%{transform:translateX(-90%)}50%{transform:translateX(90%)}}</style><div style=\"width:90px;height:10px;overflow:hidden;border-radius:999px;background:rgba(255,255,255,.08)\"><div style=\"width:55%;height:100%;border-radius:999px;background:linear-gradient(90deg,#38bdf8,#c2a4ff);animation:ribbonSlide 1.1s ease-in-out infinite\"></div></div>",
      },
      {
        name: "Flip Tile",
        description: "Card flip attention state",
        previewStyle: "border-radius:12px;background:linear-gradient(135deg,#f8fafc,#c2a4ff);animation:spin 1.8s linear infinite",
        html: "<style>@keyframes flipTile{0%,100%{transform:rotateY(0)}50%{transform:rotateY(180deg)}}</style><div style=\"width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,#f8fafc,#c2a4ff);animation:flipTile 1.6s ease-in-out infinite\"></div>",
      },
      {
        name: "Beacon Rise",
        description: "Equalizer-style beacon pulse",
        previewStyle: "border-radius:10px;background:linear-gradient(180deg,#fb7185,#facc15);animation:bounce 1.1s ease infinite",
        html: "<style>@keyframes beaconRise{0%,100%{transform:scaleY(.6);transform-origin:bottom}50%{transform:scaleY(1)}}</style><div style=\"width:16px;height:44px;border-radius:10px;background:linear-gradient(180deg,#fb7185,#facc15);animation:beaconRise 1.1s ease infinite\"></div>",
      },
    ].map(createAnimationCard).join(""));
  }

  addToolkitCards("#buttons .btn-g", [
    { title: "Corner Cut", description: "Sharp editorial CTA with clipped corners.", preview: `<button style="padding:12px 20px;clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px);background:#e2e8f0;color:#020617;border:0;font-weight:800">Launch</button>`, html: `<button style="padding:12px 20px;clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px);background:#e2e8f0;color:#020617;border:0;font-weight:800">Launch</button>` },
    { title: "Glass Rail", description: "Segmented glass action with subtle depth.", preview: `<button style="padding:12px 22px;border-radius:999px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);backdrop-filter:blur(14px);color:#fff">Preview</button>`, html: `<button style="padding:12px 22px;border-radius:999px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);backdrop-filter:blur(14px);color:#fff">Preview</button>` },
    { title: "Loader CTA", description: "Action button with inline progress cue.", preview: `<button style="display:flex;gap:10px;align-items:center;padding:12px 18px;border-radius:12px;background:#111827;color:#fff;border:1px solid rgba(255,255,255,.1)"><span style="width:10px;height:10px;border-radius:50%;background:#4ade80"></span>Syncing</button>`, html: `<button style="display:flex;gap:10px;align-items:center;padding:12px 18px;border-radius:12px;background:#111827;color:#fff;border:1px solid rgba(255,255,255,.1)"><span style="width:10px;height:10px;border-radius:50%;background:#4ade80"></span>Syncing</button>` },
    { title: "Ticket Stub", description: "Commerce-style button with perforated ends.", preview: `<button style="padding:12px 20px;border-radius:14px;background:linear-gradient(135deg,#facc15,#f97316);color:#111827;border:0;font-weight:900;box-shadow:inset 0 0 0 1px rgba(0,0,0,.12)">Reserve</button>`, html: `<button style="padding:12px 20px;border-radius:14px;background:linear-gradient(135deg,#facc15,#f97316);color:#111827;border:0;font-weight:900;box-shadow:inset 0 0 0 1px rgba(0,0,0,.12)">Reserve</button>` },
    { title: "Signal Underline", description: "Minimal text CTA with strong active line.", preview: `<button style="padding:0 0 6px;background:transparent;border:0;border-bottom:2px solid #38bdf8;color:#fff">Read docs</button>`, html: `<button style="padding:0 0 6px;background:transparent;border:0;border-bottom:2px solid #38bdf8;color:#fff">Read docs</button>` },
    { title: "Inset Key", description: "Keyboard-like keycap for utilities.", preview: `<button style="padding:10px 16px;border-radius:10px;background:#e5e7eb;border:1px solid #cbd5e1;box-shadow:inset 0 -2px 0 rgba(15,23,42,.16);color:#0f172a;font-weight:800">Cmd</button>`, html: `<button style="padding:10px 16px;border-radius:10px;background:#e5e7eb;border:1px solid #cbd5e1;box-shadow:inset 0 -2px 0 rgba(15,23,42,.16);color:#0f172a;font-weight:800">Cmd</button>` },
    { title: "Status Split", description: "Button with secondary state rail and count.", preview: `<button style="display:inline-flex;gap:10px;align-items:center;padding:11px 16px;border-radius:14px;background:#fff;color:#020617;border:0;font-weight:800"><span>Inbox</span><span style="padding:4px 8px;border-radius:999px;background:#e2e8f0">12</span></button>`, html: `<button style="display:inline-flex;gap:10px;align-items:center;padding:11px 16px;border-radius:14px;background:#fff;color:#020617;border:0;font-weight:800"><span>Inbox</span><span style="padding:4px 8px;border-radius:999px;background:#e2e8f0">12</span></button>` },
    { title: "Outline Rail", description: "Industrial outline button with lower depth rail.", preview: `<button style="padding:12px 18px;border-radius:12px;border:1px solid rgba(255,255,255,.18);background:#0b1120;color:#fff;box-shadow:inset 0 -3px 0 rgba(56,189,248,.28)">Inspect</button>`, html: `<button style="padding:12px 18px;border-radius:12px;border:1px solid rgba(255,255,255,.18);background:#0b1120;color:#fff;box-shadow:inset 0 -3px 0 rgba(56,189,248,.28)">Inspect</button>` },
    { title: "Live Chip", description: "Compact live-state action chip for dashboards.", preview: `<button style="display:inline-flex;gap:8px;align-items:center;padding:9px 14px;border-radius:999px;background:rgba(74,222,128,.14);border:1px solid rgba(74,222,128,.24);color:#4ade80"><span style="width:8px;height:8px;border-radius:50%;background:#4ade80"></span>Live</button>`, html: `<button style="display:inline-flex;gap:8px;align-items:center;padding:9px 14px;border-radius:999px;background:rgba(74,222,128,.14);border:1px solid rgba(74,222,128,.24);color:#4ade80"><span style="width:8px;height:8px;border-radius:50%;background:#4ade80"></span>Live</button>` },
    { title: "Corner Badge CTA", description: "Action with floating beta badge.", preview: `<button style="position:relative;padding:12px 20px;border-radius:14px;background:linear-gradient(135deg,#38bdf8,#6366f1);color:#fff;border:0;font-weight:800">Preview<span style="position:absolute;top:-8px;right:-6px;padding:3px 7px;border-radius:999px;background:#f8fafc;color:#020617;font-size:9px">Beta</span></button>`, html: `<button style="position:relative;padding:12px 20px;border-radius:14px;background:linear-gradient(135deg,#38bdf8,#6366f1);color:#fff;border:0;font-weight:800">Preview<span style="position:absolute;top:-8px;right:-6px;padding:3px 7px;border-radius:999px;background:#f8fafc;color:#020617;font-size:9px">Beta</span></button>` },
  ]);

  addToolkitCards("#loading .load-g", [
    { title: "Square Orbit", description: "Rotating square loader for app shells.", preview: `<div style="width:34px;height:34px;border:3px solid rgba(255,255,255,.15);border-top-color:#c2a4ff;animation:spin .9s linear infinite"></div>`, html: `<style>@keyframes squareOrbit{to{transform:rotate(360deg)}}</style><div style="width:34px;height:34px;border:3px solid rgba(255,255,255,.15);border-top-color:#c2a4ff;animation:squareOrbit .9s linear infinite"></div>` },
    { title: "Typing Rail", description: "Chat-like typing indicator with soft pulse.", preview: `<div style="display:flex;gap:5px"><span style="width:8px;height:8px;border-radius:50%;background:#fff"></span><span style="width:8px;height:8px;border-radius:50%;background:#c2a4ff"></span><span style="width:8px;height:8px;border-radius:50%;background:#fb8dff"></span></div>`, html: `<style>@keyframes typingRail{0%,100%{transform:translateY(0);opacity:.35}50%{transform:translateY(-6px);opacity:1}}</style><div style="display:flex;gap:5px"><span style="width:8px;height:8px;border-radius:50%;background:#fff;animation:typingRail .9s infinite"></span><span style="width:8px;height:8px;border-radius:50%;background:#c2a4ff;animation:typingRail .9s .15s infinite"></span><span style="width:8px;height:8px;border-radius:50%;background:#fb8dff;animation:typingRail .9s .3s infinite"></span></div>` },
    { title: "Split Bar", description: "Dual-lane progress for queued tasks.", preview: `<div style="display:grid;gap:8px;width:100%"><div style="height:6px;border-radius:999px;background:rgba(255,255,255,.08)"><div style="width:72%;height:100%;border-radius:999px;background:#c2a4ff"></div></div><div style="height:6px;border-radius:999px;background:rgba(255,255,255,.08)"><div style="width:44%;height:100%;border-radius:999px;background:#38bdf8"></div></div></div>`, html: `<div style="display:grid;gap:8px;width:180px"><div style="height:6px;border-radius:999px;background:rgba(255,255,255,.08)"><div style="width:72%;height:100%;border-radius:999px;background:#c2a4ff"></div></div><div style="height:6px;border-radius:999px;background:rgba(255,255,255,.08)"><div style="width:44%;height:100%;border-radius:999px;background:#38bdf8"></div></div></div>` },
    { title: "Glass Skeleton", description: "Soft loading panel for premium cards.", preview: `<div style="width:100%;height:56px;border-radius:18px;background:linear-gradient(120deg,rgba(255,255,255,.05),rgba(255,255,255,.12),rgba(255,255,255,.05));background-size:220% 100%;animation:shimmer 1.4s ease-in-out infinite"></div>`, html: `<div style="width:220px;height:76px;border-radius:18px;background:linear-gradient(120deg,rgba(255,255,255,.05),rgba(255,255,255,.12),rgba(255,255,255,.05));background-size:220% 100%;animation:shimmer 1.4s ease-in-out infinite"></div>` },
    { title: "Dial Loader", description: "Conic loader with clean center cutout.", preview: `<div style="width:42px;height:42px;border-radius:50%;background:conic-gradient(#38bdf8,#c2a4ff,#38bdf8);display:grid;place-items:center;animation:spin 1.1s linear infinite"><span style="width:26px;height:26px;border-radius:50%;background:#060507"></span></div>`, html: `<style>@keyframes dialLoader{to{transform:rotate(360deg)}}</style><div style="width:42px;height:42px;border-radius:50%;background:conic-gradient(#38bdf8,#c2a4ff,#38bdf8);display:grid;place-items:center;animation:dialLoader 1.1s linear infinite"><span style="width:26px;height:26px;border-radius:50%;background:#060507"></span></div>` },
    { title: "Beacon Grid", description: "Grid pulse for dashboards and maps.", preview: `<div style="display:grid;grid-template-columns:repeat(3,8px);gap:5px"><span style="width:8px;height:8px;border-radius:2px;background:#38bdf8"></span><span style="width:8px;height:8px;border-radius:2px;background:#c2a4ff"></span><span style="width:8px;height:8px;border-radius:2px;background:#4ade80"></span><span style="width:8px;height:8px;border-radius:2px;background:#c2a4ff"></span><span style="width:8px;height:8px;border-radius:2px;background:#fff"></span><span style="width:8px;height:8px;border-radius:2px;background:#fb7185"></span></div>`, html: `<style>@keyframes beaconGrid{0%,100%{opacity:.35}50%{opacity:1}}</style><div style="display:grid;grid-template-columns:repeat(3,10px);gap:6px"><span style="width:10px;height:10px;border-radius:2px;background:#38bdf8;animation:beaconGrid .9s infinite"></span><span style="width:10px;height:10px;border-radius:2px;background:#c2a4ff;animation:beaconGrid .9s .1s infinite"></span><span style="width:10px;height:10px;border-radius:2px;background:#4ade80;animation:beaconGrid .9s .2s infinite"></span><span style="width:10px;height:10px;border-radius:2px;background:#c2a4ff;animation:beaconGrid .9s .3s infinite"></span><span style="width:10px;height:10px;border-radius:2px;background:#fff;animation:beaconGrid .9s .4s infinite"></span><span style="width:10px;height:10px;border-radius:2px;background:#fb7185;animation:beaconGrid .9s .5s infinite"></span></div>` },
    { title: "Progress Nodes", description: "Node chain loader for workflow steps.", preview: `<div style="display:flex;gap:8px;align-items:center"><span style="width:10px;height:10px;border-radius:50%;background:#4ade80"></span><span style="width:28px;height:2px;background:#4ade80"></span><span style="width:10px;height:10px;border-radius:50%;background:#c2a4ff"></span><span style="width:28px;height:2px;background:rgba(255,255,255,.12)"></span><span style="width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.18)"></span></div>`, html: `<div style="display:flex;gap:8px;align-items:center"><span style="width:10px;height:10px;border-radius:50%;background:#4ade80"></span><span style="width:28px;height:2px;background:#4ade80"></span><span style="width:10px;height:10px;border-radius:50%;background:#c2a4ff"></span><span style="width:28px;height:2px;background:rgba(255,255,255,.12)"></span><span style="width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.18)"></span></div>` },
    { title: "Thin Scan", description: "Single scanning line for console shells.", preview: `<div style="width:100px;height:12px;overflow:hidden;border-radius:999px;background:rgba(255,255,255,.08)"><div style="width:42px;height:100%;border-radius:999px;background:linear-gradient(90deg,transparent,#4ade80,transparent);animation:slideIO 1.2s ease-in-out infinite"></div></div>`, html: `<style>@keyframes thinScan{0%,100%{transform:translateX(-100%)}50%{transform:translateX(100%)}}</style><div style="width:120px;height:12px;overflow:hidden;border-radius:999px;background:rgba(255,255,255,.08)"><div style="width:42px;height:100%;border-radius:999px;background:linear-gradient(90deg,transparent,#4ade80,transparent);animation:thinScan 1.2s ease-in-out infinite"></div></div>` },
    { title: "Column Rise", description: "Four-column rise for media and audio screens.", preview: `<div style="display:flex;gap:6px;align-items:flex-end;height:34px"><span style="width:7px;height:14px;background:#38bdf8;border-radius:999px"></span><span style="width:7px;height:22px;background:#c2a4ff;border-radius:999px"></span><span style="width:7px;height:30px;background:#fb7185;border-radius:999px"></span><span style="width:7px;height:18px;background:#facc15;border-radius:999px"></span></div>`, html: `<style>@keyframes columnRise{0%,100%{transform:scaleY(.45);transform-origin:bottom}50%{transform:scaleY(1)}}</style><div style="display:flex;gap:6px;align-items:flex-end;height:38px"><span style="width:7px;height:14px;background:#38bdf8;border-radius:999px;animation:columnRise .9s infinite"></span><span style="width:7px;height:22px;background:#c2a4ff;border-radius:999px;animation:columnRise .9s .1s infinite"></span><span style="width:7px;height:30px;background:#fb7185;border-radius:999px;animation:columnRise .9s .2s infinite"></span><span style="width:7px;height:18px;background:#facc15;border-radius:999px;animation:columnRise .9s .3s infinite"></span></div>` },
    { title: "Data Ladder", description: "Stepped loader for metrics and charts.", preview: `<div style="display:grid;grid-template-columns:repeat(4,10px);gap:6px;align-items:end;height:34px"><span style="height:10px;background:#4ade80;border-radius:3px"></span><span style="height:18px;background:#38bdf8;border-radius:3px"></span><span style="height:26px;background:#c2a4ff;border-radius:3px"></span><span style="height:34px;background:#fb7185;border-radius:3px"></span></div>`, html: `<div style="display:grid;grid-template-columns:repeat(4,10px);gap:6px;align-items:end;height:34px"><span style="height:10px;background:#4ade80;border-radius:3px"></span><span style="height:18px;background:#38bdf8;border-radius:3px"></span><span style="height:26px;background:#c2a4ff;border-radius:3px"></span><span style="height:34px;background:#fb7185;border-radius:3px"></span></div>` },
  ]);

  addToolkitCards("#textfx .tx-g", [
    { title: "Noise Gradient", description: "Hero headline with soft spectral range.", preview: `<strong style="font-size:30px;background:linear-gradient(135deg,#fff,#38bdf8,#c2a4ff);-webkit-background-clip:text;color:transparent">Spectrum</strong>`, html: `<h2 style="font-size:54px;background:linear-gradient(135deg,#fff,#38bdf8,#c2a4ff);-webkit-background-clip:text;color:transparent">Spectrum</h2>` },
    { title: "Stamp Serif", description: "Editorial serif lockup for launch pages.", preview: `<strong style="font-family:'Fraunces',serif;font-size:34px;color:#f8fafc">Editorial</strong>`, html: `<h2 style="font-family:'Fraunces',serif;font-size:56px;color:#f8fafc">Editorial</h2>` },
    { title: "Mono Badge", description: "Compact monospaced annotation label.", preview: `<span style="font-family:monospace;font-size:12px;letter-spacing:.18em;color:#4ade80">BUILD READY</span>`, html: `<span style="font-family:monospace;font-size:12px;letter-spacing:.18em;color:#4ade80">BUILD READY</span>` },
    { title: "Layered Blur", description: "Soft duplicate blur for premium titles.", preview: `<strong style="font-size:32px;color:#fff;text-shadow:0 0 16px rgba(194,164,255,.32),0 0 36px rgba(56,189,248,.18)">Soft Layer</strong>`, html: `<h2 style="font-size:52px;color:#fff;text-shadow:0 0 16px rgba(194,164,255,.32),0 0 36px rgba(56,189,248,.18)">Soft Layer</h2>` },
    { title: "Outline Capsule", description: "Uppercase category chip with border emphasis.", preview: `<span style="padding:7px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.18);font-size:11px;letter-spacing:.18em;color:#fff">TOOLKIT</span>`, html: `<span style="padding:7px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.18);font-size:11px;letter-spacing:.18em;color:#fff">TOOLKIT</span>` },
    { title: "Contrast Stack", description: "Thick black-and-white stack for posters.", preview: `<strong style="font-size:32px;color:#fff;text-shadow:4px 4px 0 #020617">Impact</strong>`, html: `<h2 style="font-size:54px;color:#fff;text-shadow:4px 4px 0 #020617">Impact</h2>` },
    { title: "Signal Outline", description: "Neon-lined uppercase tag for data products.", preview: `<strong style="font-size:24px;color:transparent;-webkit-text-stroke:1px #38bdf8;letter-spacing:.18em">STATUS</strong>`, html: `<span style="font-size:32px;color:transparent;-webkit-text-stroke:1px #38bdf8;letter-spacing:.18em">STATUS</span>` },
    { title: "Soft Serif Note", description: "Small editorial lockup for product notes.", preview: `<strong style="font-family:'Instrument Serif',serif;font-size:30px;color:#f8fafc">Release note</strong>`, html: `<h3 style="font-family:'Instrument Serif',serif;font-size:44px;color:#f8fafc">Release note</h3>` },
  ]);

  addToolkitCards("#shadows .sh-g", [
    { title: "Panel Float", description: "Long diffuse shadow for modals.", preview: `<div style="width:100%;height:70px;border-radius:18px;background:#111827;box-shadow:0 24px 80px rgba(2,6,23,.52)"></div>`, html: `<div style="padding:24px;border-radius:18px;background:#111827;box-shadow:0 24px 80px rgba(2,6,23,.52)">Panel float</div>` },
    { title: "Soft Canvas", description: "Paper-like shadow for calm interfaces.", preview: `<div style="width:100%;height:70px;border-radius:18px;background:#f8fafc;box-shadow:0 14px 40px rgba(15,23,42,.14)"></div>`, html: `<div style="padding:24px;border-radius:18px;background:#f8fafc;box-shadow:0 14px 40px rgba(15,23,42,.14)">Soft canvas</div>` },
    { title: "Aqua Glow", description: "Cold luminous edge for charts.", preview: `<div style="width:100%;height:70px;border-radius:18px;background:#0f172a;box-shadow:0 0 0 1px rgba(56,189,248,.24),0 0 34px rgba(56,189,248,.28)"></div>`, html: `<div style="padding:24px;border-radius:18px;background:#0f172a;box-shadow:0 0 0 1px rgba(56,189,248,.24),0 0 34px rgba(56,189,248,.28)">Aqua glow</div>` },
    { title: "Rose Halo", description: "Warm glow for editorial promos.", preview: `<div style="width:100%;height:70px;border-radius:18px;background:#18181b;box-shadow:0 18px 46px rgba(251,113,133,.26)"></div>`, html: `<div style="padding:24px;border-radius:18px;background:#18181b;box-shadow:0 18px 46px rgba(251,113,133,.26)">Rose halo</div>` },
    { title: "Double Stack", description: "Two-layer elevation for hero tiles.", preview: `<div style="width:100%;height:70px;border-radius:18px;background:#fff;box-shadow:0 8px 20px rgba(15,23,42,.08),0 24px 80px rgba(15,23,42,.12)"></div>`, html: `<div style="padding:24px;border-radius:18px;background:#fff;box-shadow:0 8px 20px rgba(15,23,42,.08),0 24px 80px rgba(15,23,42,.12)">Double stack</div>` },
    { title: "Inset Console", description: "Pressed interior for shells and panels.", preview: `<div style="width:100%;height:70px;border-radius:18px;background:#0b1120;box-shadow:inset 0 0 24px rgba(148,163,184,.16)"></div>`, html: `<div style="padding:24px;border-radius:18px;background:#0b1120;box-shadow:inset 0 0 24px rgba(148,163,184,.16)">Inset console</div>` },
  ]);

  addToolkitCards("#hover .hf-g", [
    { title: "Shear Card", description: "Poster-style shear on hover.", preview: `<div style="width:110px;height:78px;border-radius:18px;background:linear-gradient(135deg,#0f172a,#7c3aed);transform:skewX(-6deg)"></div>`, html: `<div style="width:220px;height:140px;border-radius:22px;background:linear-gradient(135deg,#0f172a,#7c3aed);transition:transform .24s" onmouseover="this.style.transform='skewX(-6deg) translateY(-6px)'" onmouseout="this.style.transform='none'"></div>` },
    { title: "Glow Border", description: "Border-only hover with ambient light.", preview: `<div style="width:110px;height:78px;border-radius:18px;border:1px solid rgba(194,164,255,.4);box-shadow:0 0 28px rgba(194,164,255,.18)"></div>`, html: `<div style="width:220px;height:140px;border-radius:22px;border:1px solid rgba(194,164,255,.4);transition:box-shadow .24s" onmouseover="this.style.boxShadow='0 0 34px rgba(194,164,255,.24)'" onmouseout="this.style.boxShadow='none'"></div>` },
    { title: "Reveal Badge", description: "Badge that brightens on hover.", preview: `<span style="padding:8px 12px;border-radius:999px;background:rgba(255,255,255,.08);color:#fff">Hover me</span>`, html: `<span style="padding:8px 12px;border-radius:999px;background:rgba(255,255,255,.08);color:#fff;transition:all .24s" onmouseover="this.style.background='rgba(194,164,255,.18)';this.style.color='#c2a4ff'" onmouseout="this.style.background='rgba(255,255,255,.08)';this.style.color='#fff'">Hover me</span>` },
    { title: "Press Tile", description: "Tile that sinks with tactile feedback.", preview: `<div style="width:110px;height:78px;border-radius:18px;background:#f8fafc;box-shadow:0 8px 0 #94a3b8"></div>`, html: `<div style="width:220px;height:140px;border-radius:22px;background:#f8fafc;box-shadow:0 8px 0 #94a3b8;transition:.12s" onmousedown="this.style.transform='translateY(8px)';this.style.boxShadow='0 0 0 #94a3b8'" onmouseup="this.style.transform='none';this.style.boxShadow='0 8px 0 #94a3b8'"></div>` },
    { title: "Halo Link", description: "Inline link with glowing underline.", preview: `<span style="padding-bottom:4px;border-bottom:2px solid #38bdf8;color:#fff">Open guide</span>`, html: `<a style="padding-bottom:4px;border-bottom:2px solid #38bdf8;color:#fff;text-decoration:none;transition:text-shadow .24s" onmouseover="this.style.textShadow='0 0 20px rgba(56,189,248,.4)'" onmouseout="this.style.textShadow='none'">Open guide</a>` },
    { title: "Depth Orbit", description: "Circular hover with rotating highlight.", preview: `<div style="width:78px;height:78px;border-radius:50%;background:conic-gradient(from 0deg,#38bdf8,#c2a4ff,#38bdf8)"></div>`, html: `<div style="width:120px;height:120px;border-radius:50%;background:conic-gradient(from 0deg,#38bdf8,#c2a4ff,#38bdf8);transition:transform .3s" onmouseover="this.style.transform='rotate(28deg) scale(1.06)'" onmouseout="this.style.transform='none'"></div>` },
    { title: "Glow Lift", description: "Ambient glow that lifts a solid card.", preview: `<div style="width:110px;height:78px;border-radius:18px;background:#111827;box-shadow:0 0 28px rgba(194,164,255,.18)"></div>`, html: `<div style="width:220px;height:140px;border-radius:22px;background:#111827;transition:transform .25s,box-shadow .25s" onmouseover="this.style.transform='translateY(-8px)';this.style.boxShadow='0 0 34px rgba(194,164,255,.24)'" onmouseout="this.style.transform='none';this.style.boxShadow='none'"></div>` },
    { title: "Border Sweep", description: "Card edge accent that travels on hover.", preview: `<div style="width:110px;height:78px;border-radius:18px;background:#0f172a;border:1px solid rgba(255,255,255,.12)"></div>`, html: `<div style="width:220px;height:140px;border-radius:22px;background:#0f172a;border:1px solid rgba(255,255,255,.12);position:relative;overflow:hidden" onmouseover="this.lastChild.style.transform='translateX(160px)'" onmouseout="this.lastChild.style.transform='translateX(-160px)'"><span style="position:absolute;left:-160px;top:0;bottom:0;width:80px;background:linear-gradient(90deg,transparent,rgba(194,164,255,.28),transparent);transition:transform .35s"></span></div>` },
    { title: "Soft Zoom", description: "Image-style zoom without hard movement.", preview: `<div style="width:110px;height:78px;border-radius:18px;background:linear-gradient(135deg,#38bdf8,#c2a4ff);transform:scale(1.02)"></div>`, html: `<div style="width:220px;height:140px;border-radius:22px;background:linear-gradient(135deg,#38bdf8,#c2a4ff);transition:transform .3s" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'"></div>` },
    { title: "Inset Focus", description: "Hovered panel with an inner focus ring.", preview: `<div style="width:110px;height:78px;border-radius:18px;background:#0b1120;box-shadow:inset 0 0 0 1px rgba(194,164,255,.22)"></div>`, html: `<div style="width:220px;height:140px;border-radius:22px;background:#0b1120;transition:box-shadow .25s" onmouseover="this.style.boxShadow='inset 0 0 0 2px rgba(194,164,255,.32)'" onmouseout="this.style.boxShadow='none'"></div>` },
  ]);

  addToolkitCards("#glass .gl-g", [
    { title: "Creator Mode", description: "Glass command chip for creative tools.", preview: `<div style="padding:10px 14px;border-radius:999px;background:rgba(255,255,255,.09);backdrop-filter:blur(18px);color:#fff">Creator mode</div>`, html: `<div style="padding:10px 14px;border-radius:999px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.16);backdrop-filter:blur(18px);color:#fff">Creator mode</div>` },
    { title: "Metric Duo", description: "Two-up stat slab with frosted panel.", preview: `<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%"><div style="height:52px;border-radius:16px;background:rgba(255,255,255,.08)"></div><div style="height:52px;border-radius:16px;background:rgba(255,255,255,.08)"></div></div>`, html: `<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;padding:14px;border-radius:22px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);backdrop-filter:blur(20px)"><div style="padding:16px;border-radius:16px;background:rgba(255,255,255,.06)">42%</div><div style="padding:16px;border-radius:16px;background:rgba(255,255,255,.06)">89%</div></div>` },
    { title: "Glass Slab", description: "Wide radial glass plate for hero copy.", preview: `<div style="width:100%;height:62px;border-radius:24px;background:radial-gradient(circle at top left,rgba(255,255,255,.16),rgba(255,255,255,.05));backdrop-filter:blur(18px)"></div>`, html: `<div style="padding:24px;border-radius:24px;background:radial-gradient(circle at top left,rgba(255,255,255,.16),rgba(255,255,255,.05));border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(18px)">Glass slab</div>` },
    { title: "Overlay Card", description: "Translucent card with soft gradient orb.", preview: `<div style="position:relative;width:100%;height:70px;border-radius:20px;background:rgba(255,255,255,.08);overflow:hidden"><span style="position:absolute;top:-14px;right:-10px;width:44px;height:44px;border-radius:50%;background:radial-gradient(circle,#fb7185,transparent 70%)"></span></div>`, html: `<div style="position:relative;padding:24px;border-radius:20px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(18px);overflow:hidden"><span style="position:absolute;top:-20px;right:-12px;width:68px;height:68px;border-radius:50%;background:radial-gradient(circle,#fb7185,transparent 70%)"></span>Overlay card</div>` },
    { title: "Sidebar Sheet", description: "Frosted side sheet for menus and inspectors.", preview: `<div style="width:100%;height:76px;border-radius:24px;background:linear-gradient(180deg,rgba(255,255,255,.12),rgba(255,255,255,.05));border:1px solid rgba(255,255,255,.14)"></div>`, html: `<div style="padding:24px;border-radius:24px;background:linear-gradient(180deg,rgba(255,255,255,.12),rgba(255,255,255,.05));border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(18px)">Sidebar sheet</div>` },
    { title: "Badge Cluster", description: "Small frosted chips for filters and modes.", preview: `<div style="display:flex;gap:8px;flex-wrap:wrap"><span style="padding:8px 10px;border-radius:999px;background:rgba(255,255,255,.09)">AI</span><span style="padding:8px 10px;border-radius:999px;background:rgba(255,255,255,.09)">3D</span><span style="padding:8px 10px;border-radius:999px;background:rgba(255,255,255,.09)">CSS</span></div>`, html: `<div style="display:flex;gap:8px;flex-wrap:wrap"><span style="padding:8px 10px;border-radius:999px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.14)">AI</span><span style="padding:8px 10px;border-radius:999px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.14)">3D</span><span style="padding:8px 10px;border-radius:999px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.14)">CSS</span></div>` },
    { title: "Glass Meter", description: "Frosted progress meter for premium panels.", preview: `<div style="width:100%;padding:12px;border-radius:18px;background:rgba(255,255,255,.08)"><div style="height:8px;border-radius:999px;background:rgba(255,255,255,.12)"><div style="width:64%;height:100%;border-radius:999px;background:#c2a4ff"></div></div></div>`, html: `<div style="padding:12px;border-radius:18px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(16px)"><div style="height:8px;border-radius:999px;background:rgba(255,255,255,.12)"><div style="width:64%;height:100%;border-radius:999px;background:#c2a4ff"></div></div></div>` },
  ]);

  addToolkitCards("#utils .ut-g", [
    { title: "Status Dock", description: "Dock row for app and deploy states.", preview: `<div style="display:flex;gap:8px"><span class="kit-pill">Live</span><span class="kit-pill">Build</span><span class="kit-pill">DNS</span></div>`, html: `<div style="display:flex;gap:8px"><span style="padding:7px 10px;border-radius:999px;background:rgba(74,222,128,.14);color:#4ade80">Live</span><span style="padding:7px 10px;border-radius:999px;background:rgba(56,189,248,.14);color:#38bdf8">Build</span><span style="padding:7px 10px;border-radius:999px;background:rgba(250,204,21,.14);color:#facc15">DNS</span></div>` },
    { title: "Filter Tokens", description: "Dense token strip for search states.", preview: `<div style="display:flex;gap:6px;flex-wrap:wrap"><span class="kit-pill">CSS</span><span class="kit-pill">React</span><span class="kit-pill">3D</span></div>`, html: `<div style="display:flex;gap:6px;flex-wrap:wrap"><span style="padding:7px 10px;border-radius:999px;background:rgba(255,255,255,.06)">CSS</span><span style="padding:7px 10px;border-radius:999px;background:rgba(255,255,255,.06)">React</span><span style="padding:7px 10px;border-radius:999px;background:rgba(255,255,255,.06)">3D</span></div>` },
    { title: "Metric Chip", description: "Compact KPI badge with delta.", preview: `<div style="padding:10px 12px;border-radius:14px;background:#111827;color:#fff">+18.4%</div>`, html: `<div style="display:inline-flex;gap:8px;align-items:center;padding:10px 12px;border-radius:14px;background:#111827;color:#fff"><strong>+18.4%</strong><span style="color:#4ade80">up</span></div>` },
    { title: "Code Capsule", description: "Inline code shell for docs and tokens.", preview: `<code style="padding:8px 10px;border-radius:10px;background:#0f172a;color:#38bdf8">npm run start</code>`, html: `<code style="padding:8px 10px;border-radius:10px;background:#0f172a;color:#38bdf8">npm run start</code>` },
    { title: "Legend Row", description: "Chart legend utility with compact dots.", preview: `<div style="display:flex;gap:10px"><span style="display:flex;gap:6px;align-items:center"><i style="width:8px;height:8px;border-radius:50%;background:#38bdf8"></i>Traffic</span></div>`, html: `<div style="display:flex;gap:12px;flex-wrap:wrap"><span style="display:flex;gap:6px;align-items:center"><i style="width:8px;height:8px;border-radius:50%;background:#38bdf8"></i>Traffic</span><span style="display:flex;gap:6px;align-items:center"><i style="width:8px;height:8px;border-radius:50%;background:#4ade80"></i>Conversion</span></div>` },
    { title: "Window Rail", description: "Top shell rail for editor mockups.", preview: `<div style="display:flex;gap:8px;padding:8px 10px;border-radius:999px;background:rgba(255,255,255,.05);width:max-content"><span style="width:10px;height:10px;border-radius:50%;background:#ff5f57"></span><span style="width:10px;height:10px;border-radius:50%;background:#febc2e"></span><span style="width:10px;height:10px;border-radius:50%;background:#28c840"></span></div>`, html: `<div style="display:flex;gap:8px;padding:8px 10px;border-radius:999px;background:rgba(255,255,255,.05);width:max-content"><span style="width:10px;height:10px;border-radius:50%;background:#ff5f57"></span><span style="width:10px;height:10px;border-radius:50%;background:#febc2e"></span><span style="width:10px;height:10px;border-radius:50%;background:#28c840"></span></div>` },
    { title: "Command Strip", description: "Shortcut bar with compact actionable keys.", preview: `<div style="display:flex;gap:6px"><span class="kit-pill">Ctrl</span><span class="kit-pill">Shift</span><span class="kit-pill">P</span></div>`, html: `<div style="display:flex;gap:6px"><kbd style="padding:6px 9px;border-radius:8px;background:#111827;color:#c2a4ff">Ctrl</kbd><kbd style="padding:6px 9px;border-radius:8px;background:#111827;color:#c2a4ff">Shift</kbd><kbd style="padding:6px 9px;border-radius:8px;background:#111827;color:#c2a4ff">P</kbd></div>` },
    { title: "Status Pair", description: "Two-state micro summary for headers.", preview: `<div style="display:flex;gap:8px"><span style="padding:7px 10px;border-radius:999px;background:rgba(74,222,128,.14);color:#4ade80">Synced</span><span style="padding:7px 10px;border-radius:999px;background:rgba(56,189,248,.14);color:#38bdf8">Cached</span></div>`, html: `<div style="display:flex;gap:8px"><span style="padding:7px 10px;border-radius:999px;background:rgba(74,222,128,.14);color:#4ade80">Synced</span><span style="padding:7px 10px;border-radius:999px;background:rgba(56,189,248,.14);color:#38bdf8">Cached</span></div>` },
    { title: "Alert Rail", description: "Thin status rail for app-shell notifications.", preview: `<div style="width:100%;height:8px;border-radius:999px;background:linear-gradient(90deg,#fb7185,#facc15,#4ade80)"></div>`, html: `<div style="width:100%;height:8px;border-radius:999px;background:linear-gradient(90deg,#fb7185,#facc15,#4ade80)"></div>` },
    { title: "Breadcrumb Ghost", description: "Soft breadcrumb trail for dense apps.", preview: `<div style="display:flex;gap:8px;color:#94a3b8"><span>Projects</span><span>/</span><span style="color:#fff">Toolkit</span></div>`, html: `<nav style="display:flex;gap:8px;color:#94a3b8"><a>Projects</a><span>/</span><strong style="color:#fff">Toolkit</strong></nav>` },
  ]);
}

function initPagination() {
  const instances = [];
  catalogPaginationState.instances = instances;

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

  const scheduleRefresh = () => {
    window.cancelAnimationFrame(catalogPaginationState.frame);
    catalogPaginationState.frame = window.requestAnimationFrame(() => {
      instances.forEach((instance) => {
        instance.measurementSignature = "";
        updatePaginationInstance(instance);
      });
    });
  };

  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(scheduleRefresh, 120);
  });

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      scheduleRefresh();
    }
  });

  if ("ResizeObserver" in window) {
    catalogPaginationState.resizeObserver?.disconnect();
    const observer = new ResizeObserver(() => scheduleRefresh());
    catalogPaginationState.resizeObserver = observer;
    instances.forEach((instance) => observer.observe(instance.grid));
  }

  if (document.fonts?.ready) {
    document.fonts.ready.then(scheduleRefresh).catch(() => {});
  }
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
  pruneCatalogNoise();
  rebuildTypographyLibrary();
  deepenCatalog();
  addSeraCatalog();
  configureCatalogPagination();
  initPagination();
  initBackgroundAudio();
});
