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

function spawnRipple(el, x, y) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const ripple = document.createElement("span");
  ripple.className = "ripple";
  const size = Math.max(el.offsetWidth, el.offsetHeight) * 1.5;
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${x - size / 2}px`;
  ripple.style.top = `${y - size / 2}px`;
  el.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
}

function initCopyToClipboard() {
  document.querySelectorAll(".copyable").forEach((el) => {
    el.addEventListener("click", (e) => {
      const value = el.getAttribute("data-copy-value");
      navigator.clipboard.writeText(value).then(() => {
        showToast(`$ copied "${value}" to clipboard ✓`);
      });

      const rect = el.getBoundingClientRect();
      spawnRipple(el, e.clientX - rect.left, e.clientY - rect.top);
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

function initCtrlCEasterEgg() {
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") {
      showToast("^C  process not terminated — I love my job too much.", 3000);
    }
  });
}

function initManModal() {
  const trigger = document.getElementById("nav-logo");
  const modal = document.getElementById("man-modal");
  const closeButton = document.getElementById("man-modal-close");

  const open = (e) => {
    e.preventDefault();
    modal.removeAttribute("hidden");
  };
  const close = () => modal.setAttribute("hidden", "");

  trigger.addEventListener("click", open);
  closeButton.addEventListener("click", close);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
  window.addEventListener("keydown", (e) => {
    if (modal.hasAttribute("hidden")) return;
    if (e.key === "Escape" || e.key.toLowerCase() === "q") close();
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

function initProjectCardReveal() {
  const cards = document.querySelectorAll(".project-card");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) {
    cards.forEach((card) => card.classList.add("card-revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(cards).indexOf(entry.target);
          setTimeout(() => entry.target.classList.add("card-revealed"), index * 120);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  cards.forEach((card) => observer.observe(card));
}

function initProjectCardTilt() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return;

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;

      card.style.setProperty("--mouse-x", `${percentX}%`);
      card.style.setProperty("--mouse-y", `${percentY}%`);

      const rotateY = ((x / rect.width) - 0.5) * 10;
      const rotateX = ((y / rect.height) - 0.5) * -10;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
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
      button.querySelector(".toggle-label").textContent = expanded ? "view details" : "hide details";
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initBootSequence();
  initScrollProgress();
  initUptimeCounter();
  initCopyToClipboard();
  initSudoEasterEgg();
  initCtrlCEasterEgg();
  initManModal();
  initTypingEffect();
  initExperienceToggles();
  initScrollSpy();
  initRevealOnScroll();
  initProjectCardReveal();
  initProjectCardTilt();
  initThemeToggle();
});
