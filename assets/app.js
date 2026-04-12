const audioState = {
  context: null,
};

function getAudioContext() {
  if (!audioState.context) {
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) {
      return null;
    }

    audioState.context = new Context();
  }

  return audioState.context;
}

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
  btn.innerHTML = "✓ Copied!";
  btn.classList.add("ok");
  window.setTimeout(() => {
    btn.innerHTML = original;
    btn.classList.remove("ok");
  }, 1600);
}

async function playTone(card, sound) {
  const context = getAudioContext();
  if (!context) return;

  if (context.state === "suspended") {
    await context.resume();
  }

  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const now = context.currentTime;

  const config =
    sound === "release"
      ? { type: "triangle", start: 720, end: 420, attack: 0.01, release: 0.18, volume: 0.045 }
      : { type: "square", start: 420, end: 240, attack: 0.008, release: 0.16, volume: 0.06 };

  oscillator.type = config.type;
  oscillator.frequency.setValueAtTime(config.start, now);
  oscillator.frequency.exponentialRampToValueAtTime(config.end, now + config.release);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(config.volume, now + config.attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + config.release);

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start(now);
  oscillator.stop(now + config.release + 0.02);

  card.style.transform = "scale(0.97)";
  window.setTimeout(() => {
    card.style.transform = "";
  }, 140);
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

function initPagination() {
  document.querySelectorAll(".paginated").forEach((grid) => {
    const items = Array.from(grid.children).filter(
      (child) => child.tagName === "DIV" && !child.classList.contains("pagination-controls"),
    );
    items.forEach((child) => child.classList.add("page-item"));

    if (items.length <= 8) return;

    let controls = grid.parentElement.querySelector(".pagination-controls");
    if (!controls) {
      controls = document.createElement("div");
      controls.className = "pagination-controls";
      controls.style.marginTop = "30px";
      controls.style.display = "flex";
      controls.style.gap = "15px";
      controls.style.justifyContent = "center";
      controls.style.width = "100%";
      controls.style.clear = "both";
      controls.innerHTML =
        '<button class="btn-outline prev-btn" style="padding:12px 24px;background:rgba(255,255,255,0.05);color:#fff;border:1px solid rgba(255,255,255,0.1);border-radius:8px;cursor:pointer;font-weight:bold;transition:0.3s">← Previous</button><button class="btn-outline next-btn" style="padding:12px 24px;background:rgba(194,164,255,0.15);color:#c2a4ff;border:1px solid #c2a4ff;border-radius:8px;cursor:pointer;font-weight:bold;transition:0.3s">Next →</button>';
      grid.parentElement.appendChild(controls);
    }

    const pageSize = 6;
    let currentPage = 1;
    const maxPage = Math.ceil(items.length / pageSize);
    const nextButton = controls.querySelector(".next-btn");
    const previousButton = controls.querySelector(".prev-btn");

    const renderPage = () => {
      items.forEach((item, index) => {
        const isVisible = index >= (currentPage - 1) * pageSize && index < currentPage * pageSize;
        item.style.display = isVisible ? "" : "none";
        item.style.opacity = isVisible ? "1" : "0";
        if (isVisible) {
          window.setTimeout(() => {
            item.style.transform = "translateY(0)";
          }, 50);
        }
      });

      previousButton.style.opacity = currentPage === 1 ? "0.3" : "1";
      previousButton.style.pointerEvents = currentPage === 1 ? "none" : "auto";
      nextButton.style.opacity = currentPage === maxPage ? "0.3" : "1";
      nextButton.style.pointerEvents = currentPage === maxPage ? "none" : "auto";
    };

    nextButton.addEventListener("click", () => {
      if (currentPage >= maxPage) return;
      currentPage += 1;
      renderPage();
      grid.closest("section")?.scrollIntoView({ behavior: "smooth" });
    });

    previousButton.addEventListener("click", () => {
      if (currentPage <= 1) return;
      currentPage -= 1;
      renderPage();
      grid.closest("section")?.scrollIntoView({ behavior: "smooth" });
    });

    renderPage();
  });
}

function initAudioCards() {
  const activate = (card) => {
    const sound = card.dataset.sound;
    if (!sound) return;
    playTone(card, sound);
  };

  document.querySelectorAll(".au-c[data-sound]").forEach((card) => {
    card.addEventListener("click", () => activate(card));
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      activate(card);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCursor();
  initCopyButtons();
  initScrollEffects();
  initPagination();
  initAudioCards();
});
