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

function measurePageSize(items) {
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

  columns = Math.max(columns, 1);
  const rows = window.innerWidth < 640 ? 4 : columns >= 4 ? 2 : columns === 3 ? 2 : columns === 2 ? 3 : 4;
  return Math.max(1, columns * rows);
}

function createPaginationControls(grid) {
  let controls = grid.parentElement.querySelector(".pagination-controls");
  if (controls) {
    return controls;
  }

  controls = document.createElement("div");
  controls.className = "pagination-controls";
  controls.innerHTML = `
    <button type="button" class="btn-outline prev-btn">Previous</button>
    <span class="pagination-status" aria-live="polite"></span>
    <button type="button" class="btn-outline next-btn">Next</button>
  `;
  grid.parentElement.appendChild(controls);
  return controls;
}

function updatePaginationInstance(instance) {
  const { grid, items, controls, prevButton, nextButton, status } = instance;

  const previousPage = instance.currentPage || 1;
  instance.pageSize = measurePageSize(items);
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

  status.textContent = `${instance.currentPage} / ${instance.maxPage}`;
  prevButton.disabled = instance.currentPage === 1;
  nextButton.disabled = instance.currentPage === instance.maxPage;
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
  initPagination();
  initBackgroundAudio();
});
