const S = 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';

const ICONS = {
  basics: `<path d="M5 5h14v11h-9l-5 4z"/>`,
  smalltalk: `<path d="M4 5h11v8H8l-4 3z"/><path d="M15 9h5v8l-3-2h-6"/>`,
  numbers: `<path d="M5 9h14M5 15h14M10 4 8 20M16 4l-2 16"/>`,
  colors: `<path d="M12 4a8 8 0 1 0 0 16c1.4 0 1.8-1 1.8-2s.6-2 2-2h1.2a3 3 0 0 0 3-3c0-5-3.6-9-8-9z"/><circle cx="8" cy="10" r=".6"/><circle cx="12" cy="8" r=".6"/><circle cx="16" cy="10" r=".6"/>`,
  food: `<path d="M12 7.5C9 5.5 5 7.5 5 12c0 4 3 8 7 8s7-4 7-8c0-4.5-4-6.5-7-4.5z"/><path d="M12 7.5c0-2 1-3.5 3-4.5"/>`,
  supermarket: `<circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/><path d="M3 4h2l2.5 11h10L20 8H6.6"/>`,
  market: `<path d="M5 10h14l-1.6 10H6.6z"/><path d="M8.5 10 12 4l3.5 6"/>`,
  bakery: `<path d="M4 11a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8H4z"/><path d="M9 11v4M12 11v4M15 11v4"/>`,
  cafe: `<path d="M5 9h11v6.5A4.5 4.5 0 0 1 11.5 20h-2A4.5 4.5 0 0 1 5 15.5z"/><path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16M8 6V4M11.5 6V4"/>`,
  pharmacy: `<rect x="4" y="6" width="16" height="14" rx="3"/><path d="M12 10v6M9 13h6M9 6V4h6v2"/>`,
  doctor: `<path d="M3 12h4l3-7 4 14 3-7h4"/>`,
  handyman: `<path d="M14.5 4a5 5 0 0 0-4.8 6.5L4 16.2V20h3.8l5.7-5.7A5 5 0 0 0 20 9.5l-3.2 1.3-2.6-2.6L15.5 5z"/>`,
  transport: `<rect x="4" y="4" width="16" height="13" rx="3"/><path d="M4 11h16M8 20v-3M16 20v-3"/><circle cx="8.5" cy="14" r=".6"/><circle cx="15.5" cy="14" r=".6"/>`,
  taxi: `<path d="M5 12 6.5 7h11L19 12"/><path d="M4 12h16v5h-2M4 17V12M4 17h2M8 17h8"/><circle cx="7" cy="17" r="1.4"/><circle cx="17" cy="17" r="1.4"/>`,
  time: `<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>`,
  post: `<rect x="4" y="6" width="16" height="12" rx="2.5"/><path d="m4.5 7.5 7.5 6 7.5-6"/>`,
  hairdresser: `<circle cx="6.5" cy="7" r="2.3"/><circle cx="6.5" cy="17" r="2.3"/><path d="M8.5 8.5 19 17M8.5 15.5 19 7"/>`,
  emergency: `<path d="M12 4 3 20h18z"/><path d="M12 10v4"/><circle cx="12" cy="17" r=".5"/>`,
  animals: `<circle cx="7" cy="9" r="1.6"/><circle cx="12" cy="7" r="1.6"/><circle cx="17" cy="9" r="1.6"/><path d="M12 12c-2.6 0-5 2.2-5 4.4 0 1.3 1 2.1 2.2 1.9 1-.2 1.8-.6 2.8-.6s1.8.4 2.8.6c1.2.2 2.2-.6 2.2-1.9 0-2.2-2.4-4.4-5-4.4z"/>`
};

function icon(id) {
  const body = ICONS[id] || ICONS.basics;
  return `<svg viewBox="0 0 24 24" ${S} aria-hidden="true">${body}</svg>`;
}

function plural(n, forms) {
  const a = n % 100, b = n % 10;
  if (a > 10 && a < 20) return forms[2];
  if (b === 1) return forms[0];
  if (b >= 2 && b <= 4) return forms[1];
  return forms[2];
}

let DATA = null;
const view = document.getElementById('view');

function renderHome() {
  const tiles = DATA.categories.map(c => `
    <a class="tile" href="#/cat/${c.id}">
      <span class="tile-icon">${icon(c.id)}</span>
      <p class="tile-name">${c.title}</p>
      <p class="tile-count">${c.items.length} ${plural(c.items.length, ['фраза', 'фразы', 'фраз'])}</p>
    </a>`).join('');
  view.innerHTML = `
    <h1 class="app-title">Сербский на каждый день</h1>
    <p class="app-sub">Разговорник с транскрипцией · работает офлайн</p>
    <div class="grid">${tiles}</div>`;
  document.title = 'Сербский на каждый день';
}

function renderCategory(id) {
  const c = DATA.categories.find(x => x.id === id);
  if (!c) { location.hash = '#/'; return; }
  const cards = c.items.map(it => `
    <div class="phrase">
      <p class="ru">${it.ru}</p>
      <p class="sr">${it.sr}</p>
      <p class="tr">${it.tr}</p>
    </div>`).join('');
  view.innerHTML = `
    <div class="cat-header">
      <a class="back" href="#/" aria-label="Назад к категориям">
        <svg viewBox="0 0 24 24" ${S}><path d="M14 6l-6 6 6 6"/></svg>
      </a>
      <h1 class="cat-title">${c.title}</h1>
    </div>
    <div class="phrases">${cards}</div>`;
  document.title = c.title + ' — Сербский на каждый день';
}

function route() {
  const m = location.hash.match(/^#\/cat\/(.+)$/);
  if (m && DATA) renderCategory(decodeURIComponent(m[1]));
  else if (DATA) renderHome();
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', route);

fetch('data.json')
  .then(r => r.json())
  .then(d => { DATA = d; route(); })
  .catch(() => {
    view.innerHTML = '<p class="loading">Не удалось загрузить фразы. Обновите страницу.</p>';
  });

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js'));
}
