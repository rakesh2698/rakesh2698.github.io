function initBootSequence() {
  const overlay = document.getElementById("boot-sequence");
  const linesEl = document.getElementById("boot-lines");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const bootLines = [
    "[ OK ] Loading rakesh-satpathy.identity",
    "[ OK ] Starting sre-engineer.service",
    "[ OK ] Mounting infrastructure...",
    "[ OK ] Reducing incidents.service",
    "[ OK ] Portfolio ready",
  ];

  if (reducedMotion) {
    overlay.classList.add("boot-done");
    overlay.setAttribute("hidden", "");
    return;
  }

  let i = 0;
  const showNextLine = () => {
    if (i < bootLines.length) {
      linesEl.textContent += (i > 0 ? "\n" : "") + bootLines[i];
      i += 1;
      setTimeout(showNextLine, 450);
    } else {
      setTimeout(() => {
        overlay.classList.add("boot-done");
        setTimeout(() => overlay.setAttribute("hidden", ""), 400);
      }, 500);
    }
  };
  showNextLine();
}

function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${percent}%`;
  };
  window.addEventListener("scroll", update);
  update();
}

function initUptimeCounter() {
  const el = document.getElementById("uptime-counter");
  const start = Date.now();

  const format = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  setInterval(() => {
    el.textContent = format(Date.now() - start);
  }, 1000);
}

let toastHideTimeout;

function showToast(message, duration = 2000) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.removeAttribute("hidden");
  requestAnimationFrame(() => toast.classList.add("show"));

  clearTimeout(toastHideTimeout);
  toastHideTimeout = setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.setAttribute("hidden", ""), 200);
  }, duration);
}

function initCopyToClipboard() {
  document.querySelectorAll(".copyable").forEach((el) => {
    el.addEventListener("click", () => {
      const value = el.getAttribute("data-copy-value");
      navigator.clipboard.writeText(value).then(() => {
        showToast(`$ copied "${value}" to clipboard ✓`);
      });
    });
  });
}

function initSudoEasterEgg() {
  const target = "sudo";
  let buffer = "";

  window.addEventListener("keydown", (e) => {
    if (e.key.length !== 1) return;
    buffer = (buffer + e.key.toLowerCase()).slice(-target.length);
    if (buffer === target) {
      showToast("$ sudo access granted — you now have root on my résumé 🔓", 3000);
      buffer = "";
    }
  });
}

function initTypingEffect() {
  const target = document.getElementById("typed-text");
  const text = "~/rakesh-satpathy $ whoami";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) {
    target.textContent = text;
    return;
  }

  let i = 0;
  const type = () => {
    target.textContent = text.slice(0, i);
    i += 1;
    if (i <= text.length) {
      setTimeout(type, 45);
    }
  };
  type();
}

function initScrollSpy() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-50% 0px -50% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

function initRevealOnScroll() {
  const sections = document.querySelectorAll("main section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  sections.forEach((section) => observer.observe(section));
}

function initThemeToggle() {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const stored = localStorage.getItem("theme");

  if (stored) {
    root.setAttribute("data-theme", stored);
  }

  toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", current);
    localStorage.setItem("theme", current);
  });
}

function initExperienceToggles() {
  document.querySelectorAll(".timeline-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const bullets = button.nextElementSibling;
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      bullets.hidden = expanded;
      button.querySelector(".toggle-icon").textContent = expanded ? "+" : "−";
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initBootSequence();
  initScrollProgress();
  initUptimeCounter();
  initCopyToClipboard();
  initSudoEasterEgg();
  initTypingEffect();
  initExperienceToggles();
  initScrollSpy();
  initRevealOnScroll();
  initThemeToggle();
});
