/* Homepage content — edit this file to change menus, tiles and courses. */
/* =====================================================================
   EDIT HERE
   image : path to a picture for the tile, e.g. "assets/tiles/lectures.jpg"
           (landscape, about 1200×750 px). Leave "" to show the icon.
   ===================================================================== */

/* Left menu. Set href (e.g. "about.html") and active: true when a page is ready. */
const NAV = [
  { label: "Home",    icon: "home",   href: "#",  active: true,  current: true },
  { label: "About",   icon: "user",   href: "",   active: false },
  { label: "Resume",  icon: "file",   href: "",   active: false },
  { label: "Contact", icon: "mail",   href: "",   active: false },
];

/* Big tiles on the right. action "lectures" / "others" opens a list; null = coming soon. */
const MENU = [
  { title: "Lectures",          text: "Course materials I teach",       icon: "book",  image: "", action: "lectures" },
  { title: "Research",          text: "Publications & ongoing work",    icon: "flask", image: "", action: null },
  { title: "Community Service", text: "Community engagement",           icon: "hands", image: "", action: null },
  { title: "Others",            text: "More activities & resources",    icon: "grid",  image: "", action: "others" },
];

/* Courses. url = address of each course's GitHub Pages site; ready: true = clickable. */
const COURSES = [
  { name: "Communication Skill",                   url: "/communication-skill/",               ready: true,  icon: "chat",   image: "" },
  { name: "Manajemen Proyek Sistem Informasi",     url: "/manajemen-proyek-si/",               ready: true,  icon: "kanban", image: "" },
  { name: "Transformasi Digital",                  url: "/transformasi-digital/",              ready: true,  icon: "spark",  image: "" },
  { name: "Kepemimpinan dan Manajemen Organisasi", url: "/kepemimpinan-manajemen-organisasi/", ready: true,  icon: "people", image: "" },
  { name: "Data Warehouse",                        url: "/data-warehouse/",                    ready: true,  icon: "db",     image: "" },
  { name: "Metode Peramalan",                      url: "/metode-peramalan/",                  ready: true,  icon: "trend",  image: "" },
];

/* Items shown under "Others". url = page address; ready: true = clickable. */
const OTHERS = [
  { name: "Atlas Komputasi & AI", text: "Disiplin komputasi, area riset, ML & DL, metodologi riset, dan notasi matematis", url: "/atlas/", ready: true, icon: "map", image: "" },
];
