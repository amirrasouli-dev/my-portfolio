const roles = [
  "توسعه‌دهنده فرانت‌اند",
  "طراح و سازنده وب‌سایت",
  "برنامه‌نویس وردپرس",
];
const el = document.getElementById("typed");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

if (el) {
  if (reduce) {
    el.textContent = roles[0];
  } else {
    let r = 0,
      i = 0,
      deleting = false;
    const tick = () => {
      const word = roles[r];
      i += deleting ? -1 : 1;
      el.textContent = word.slice(0, i);
      let delay = deleting ? 40 : 85;
      if (!deleting && i === word.length) {
        deleting = true;
        delay = 1600;
      } else if (deleting && i === 0) {
        deleting = false;
        r = (r + 1) % roles.length;
        delay = 400;
      }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 600);
  }
}

const y = document.getElementById("y");
if (y)
  y.textContent = new Date()
    .getFullYear()
    .toLocaleString("fa-IR", { useGrouping: false });

if ("IntersectionObserver" in window && !reduce) {
  document.documentElement.classList.add("js");
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.15 },
  );
  document.querySelectorAll(".reveal").forEach((n) => io.observe(n));
}
const hero = document.querySelector(".hero");
if (hero && !reduce && matchMedia("(hover: hover)").matches) {
  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty("--mx", e.clientX - r.left + "px");
    hero.style.setProperty("--my", e.clientY - r.top + "px");
  });
}

const mb = document.querySelector(".menu-btn"),
  menu = document.getElementById("menu");
if (mb && menu) {
  const set = (o) => {
    menu.classList.toggle("open", o);
    mb.setAttribute("aria-expanded", o);
    mb.setAttribute("aria-label", o ? "بستن منو" : "باز کردن منو");
  };
  mb.addEventListener("click", () =>
    set(mb.getAttribute("aria-expanded") !== "true"),
  );
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) set(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") set(false);
  });
}

const fb = document.querySelectorAll(".filters button");
fb.forEach((b) =>
  b.addEventListener("click", () => {
    fb.forEach((x) => x.setAttribute("aria-pressed", x === b));
    document.querySelectorAll(".post").forEach((p) => {
      p.hidden = b.dataset.f !== "all" && p.dataset.cat !== b.dataset.f;
    });
  }),
);
