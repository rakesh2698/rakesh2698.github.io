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
  initTypingEffect();
  initExperienceToggles();
  initScrollSpy();
  initRevealOnScroll();
  initThemeToggle();
});
