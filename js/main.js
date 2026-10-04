/* Homepage behaviour — normally no need to edit. Reads NAV, MENU, COURSES from data.js. */
/* ---------------------------------------------------------------------- */
const ICONS = {
  home:   '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  user:   '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  file:   '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
  mail:   '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  book:   '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/><path d="M9 7h7M9 11h5"/>',
  flask:  '<path d="M9 3h6M10 3v6L4.5 18.5A2 2 0 0 0 6.2 21.5h11.6a2 2 0 0 0 1.7-3L14 9V3"/><path d="M7.5 15h9"/>',
  hands:  '<path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M21 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  grid:   '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  chat:   '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/>',
  kanban: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7v7M12 7v4M16 7v9"/>',
  spark:  '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 17l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8z"/>',
  people: '<circle cx="12" cy="6" r="3"/><path d="M6 21v-2a6 6 0 0 1 12 0v2"/><circle cx="4.5" cy="10" r="2"/><circle cx="19.5" cy="10" r="2"/>',
  db:     '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  trend:  '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 6-6"/><path d="M16 8h4v4"/>',
};
const svg = (n, s = 24, w = 2) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n]}</svg>`;
const GO = '<span class="go"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>';

function tile({ title, text, icon, image, href, clickable, big, chip }) {
  const iconSize = big ? 72 : 52;
  const inner = `
    <div class="media">
      ${chip || ""}
      ${svg(icon, iconSize, 1.6)}
      ${image ? `<img src="${image}" alt="" loading="lazy" onerror="this.remove()">` : ""}
    </div>
    <div class="tile-body">
      <div class="tile-text">
        <div class="tile-title">${title}</div>
        ${text ? `<div class="tile-desc">${text}</div>` : ""}
      </div>
      ${clickable ? GO : ""}
    </div>`;
  return clickable
    ? `<a class="tile clickable" href="${href}">${inner}</a>`
    : `<div class="tile disabled" aria-disabled="true">${inner}</div>`;
}

document.getElementById("mainNav").innerHTML = NAV.map(n => {
  const cls = "nav-item" + (n.current ? " current" : "");
  const body = `${svg(n.icon, 18)}<span>${n.label}</span>${n.active ? "" : '<span class="soon">Soon</span>'}`;
  return n.active
    ? `<a class="${cls}" href="${n.href}" ${n.current ? 'aria-current="page"' : ""}>${body}</a>`
    : `<span class="${cls}" aria-disabled="true" title="Coming soon">${body}</span>`;
}).join("");

document.getElementById("menuTiles").innerHTML = MENU.map(m => tile({
  title: m.title, text: m.text, icon: m.icon, image: m.image, big: true,
  href: "#" + m.action, clickable: !!m.action,
  chip: m.action ? "" : '<span class="chip soon">Coming soon</span>',
})).join("");

document.getElementById("courseTiles").innerHTML = COURSES.map(c => tile({
  title: c.name, icon: c.icon, image: c.image, href: c.url, clickable: c.ready,
  chip: c.ready ? '<span class="chip live">Available</span>' : '<span class="chip soon">Coming soon</span>',
})).join("");

/* Hash router: #lectures shows the course list, anything else the home tiles. */
function route() {
  const lectures = location.hash === "#lectures";
  document.getElementById("view-home").classList.toggle("active", !lectures);
  document.getElementById("view-lectures").classList.toggle("active", lectures);
}
window.addEventListener("hashchange", () => { route(); window.scrollTo({ top: 0 }); });
route();
document.getElementById("backBtn").addEventListener("click", () => {
  history.pushState("", document.title, location.pathname + location.search);
  route();
});

/* Theme toggle */
const root = document.documentElement;
try { const t = localStorage.getItem("theme"); if (t) root.dataset.theme = t; } catch (e) {}
document.getElementById("themeBtn").addEventListener("click", () => {
  const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = dark ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
});

document.getElementById("year").textContent = new Date().getFullYear();
