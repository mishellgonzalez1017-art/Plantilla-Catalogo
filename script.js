import { catalogos } from './productos.js';
import config from './config.js';

// ------------------------------------------------------------
// ESTADO
// ------------------------------------------------------------
let currentFilter = 'Planes';
let searchQuery = '';
let currentModalIndex = 0;
let hasEntered = false;
let cotizacion = JSON.parse(localStorage.getItem('nexo-cotizacion') || '[]');

const WHATSAPP_PHONE = config.whatsappNumber;
const waLink = (message) => `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

// ------------------------------------------------------------
// ENLACES DE WHATSAPP Y REDES DESDE config.js
// ------------------------------------------------------------
function setupLinks() {
  document.querySelectorAll('[data-social]').forEach(link => {
    const url = config.social[link.dataset.social];
    if (url) link.href = url; else link.remove();
  });
  document.getElementById('waNavButton').href = waLink(config.whatsappMessages.nav);
  document.getElementById('waCtaButton').href = waLink(config.whatsappMessages.cta);
  const footerWa = document.querySelector('[data-wa-footer]');
  if (footerWa) footerWa.textContent = `WhatsApp: +${WHATSAPP_PHONE.slice(0,3)} ${WHATSAPP_PHONE.slice(3,7)}-${WHATSAPP_PHONE.slice(7)}`;
}

// ------------------------------------------------------------
// LLUVIA DE ETIQUETAS (intro) — generada por JS
// ------------------------------------------------------------
function buildTagRain() {
  const container = document.getElementById('tagRain');
  const symbols = ['🏷️', '◆', '✦'];
  const total = window.innerWidth < 640 ? 14 : 22;
  let html = '';
  for (let i = 0; i < total; i += 1) {
    const left = Math.random() * 100;
    const size = (1.4 + Math.random() * 1.4).toFixed(2);
    const duration = (6 + Math.random() * 4).toFixed(2);
    const delay = (-Math.random() * 10).toFixed(2);
    const drift = Math.round(-70 + Math.random() * 140);
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    html += `<span class="tag-drop" style="--left:${left}%; --size:${size}rem; --duration:${duration}s; --delay:${delay}s; --drift:${drift}px;">${symbol}</span>`;
  }
  container.innerHTML = html;
}

// ------------------------------------------------------------
// MÚSICA DE FONDO (rotación de 3 canciones)
// ------------------------------------------------------------
const bgMusic = document.getElementById('bgMusic');
const canciones = ['musica/cancion1.mp3', 'musica/cancion2.mp3', 'musica/cancion3.mp3'];
let playlist = [...canciones].sort(() => Math.random() - 0.5);
let trackIndex = 0;
bgMusic.src = playlist[trackIndex];

function playNextTrack() {
  trackIndex += 1;
  if (trackIndex >= playlist.length) {
    playlist = [...canciones].sort(() => Math.random() - 0.5);
    trackIndex = 0;
  }
  bgMusic.src = playlist[trackIndex];
  bgMusic.play().catch(() => {});
}
bgMusic.addEventListener('ended', playNextTrack);

function updateMusicButton(isPlaying) {
  const btn = document.getElementById('musicToggle');
  btn.classList.toggle('is-playing', isPlaying);
  btn.setAttribute('aria-pressed', String(isPlaying));
  btn.innerHTML = `<i data-lucide="${isPlaying ? 'volume-2' : 'volume-x'}" class="h-[18px] w-[18px]"></i>`;
  lucide.createIcons();
}

document.getElementById('musicToggle').addEventListener('click', () => {
  if (!hasEntered) return;
  if (bgMusic.paused) { bgMusic.play().then(() => updateMusicButton(true)).catch(() => updateMusicButton(false)); }
  else { bgMusic.pause(); updateMusicButton(false); }
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden && !bgMusic.paused) { bgMusic.pause(); updateMusicButton(false); }
});

// ------------------------------------------------------------
// INTRO 3D (three.js) — recolorado a violeta / cian
// ------------------------------------------------------------
function setupScene() {
  if (!window.THREE) return;
  const canvas = document.querySelector('#scene');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 5.2;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  scene.add(new THREE.AmbientLight(0xd9d6ff, 1.1));
  const keyLight = new THREE.DirectionalLight(0xdfe7ff, 2.6);
  keyLight.position.set(5, 7, 6);
  scene.add(keyLight);
  const violetLight = new THREE.PointLight(0x7c6cff, 4.2, 20);
  violetLight.position.set(-4, -2, 3);
  scene.add(violetLight);
  const cyanLight = new THREE.PointLight(0x2dd4e0, 4.2, 18);
  cyanLight.position.set(4, 2, 4);
  scene.add(cyanLight);

  const rootGroup = new THREE.Group();
  scene.add(rootGroup);
  const coreMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.28, 1), new THREE.MeshPhysicalMaterial({
    color: 0x2a2a55, emissive: 0x120a2e, roughness: 0.15, metalness: 0.45,
    clearcoat: 1.0, clearcoatRoughness: 0.1, transmission: 0.4, thickness: 1.4,
    reflectivity: 0.9, transparent: true, opacity: 0.92
  }));
  rootGroup.add(coreMesh);
  const haloMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.48, 1), new THREE.MeshBasicMaterial({ color: 0x2dd4e0, wireframe: true, transparent: true, opacity: 0.3 }));
  rootGroup.add(haloMesh);
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.014, 16, 140), new THREE.MeshStandardMaterial({ color: 0x8f89ff, metalness: 0.9, roughness: 0.2 }));
  ring1.rotation.x = 1.15; ring1.rotation.y = 0.35;
  rootGroup.add(ring1);
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.25, 0.011, 16, 160), new THREE.MeshStandardMaterial({ color: 0x2dd4e0, metalness: 0.85, roughness: 0.24 }));
  ring2.rotation.x = -0.75; ring2.rotation.z = 0.6;
  rootGroup.add(ring2);

  const particleGeometry = new THREE.BufferGeometry();
  const positions = []; const colors = [];
  const palette = [new THREE.Color(0x2dd4e0), new THREE.Color(0x7c6cff), new THREE.Color(0xf5f6fb), new THREE.Color(0x8f89ff)];
  for (let i = 0; i < 600; i += 1) {
    const radius = 2.0 + Math.random() * 3.4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions.push(radius * Math.sin(phi) * Math.cos(theta), radius * Math.sin(phi) * Math.sin(theta), radius * Math.cos(phi));
    const c = palette[Math.floor(Math.random() * palette.length)];
    colors.push(c.r, c.g, c.b);
  }
  particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  particleGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({ size: 0.023, vertexColors: true, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending }));
  rootGroup.add(particles);

  const pointer = { cx: 0, cy: 0, tx: 0, ty: 0 };
  window.addEventListener('pointermove', e => {
    pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
    pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    requestAnimationFrame(animate);
    pointer.cx += (pointer.tx - pointer.cx) * 0.04;
    pointer.cy += (pointer.ty - pointer.cy) * 0.04;
    coreMesh.rotation.y += 0.005; coreMesh.rotation.x += 0.0025;
    haloMesh.rotation.y -= 0.003; haloMesh.rotation.z += 0.002;
    ring1.rotation.z += 0.004; ring1.rotation.x += 0.002;
    ring2.rotation.y += 0.0035; ring2.rotation.z -= 0.002;
    particles.rotation.y += 0.001;
    rootGroup.rotation.y = pointer.cx * 0.28;
    rootGroup.rotation.x = -pointer.cy * 0.22;
    rootGroup.position.x = pointer.cx * 0.35;
    rootGroup.position.y = -pointer.cy * 0.28;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// ------------------------------------------------------------
// ENTRAR AL CATÁLOGO
// ------------------------------------------------------------
function startExperience() {
  hasEntered = true;
  const intro = document.getElementById('intro');
  intro.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
  document.getElementById('cartToggle').classList.remove('hidden');
  bgMusic.play().then(() => updateMusicButton(true)).catch(() => updateMusicButton(false));
  setTimeout(() => intro.remove(), 900);
}
document.getElementById('exploreButton').addEventListener('click', startExperience);

// ------------------------------------------------------------
// FILTRO DE CATEGORÍAS + BUSCADOR
// ------------------------------------------------------------
function normalizar(value) { return value.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }

document.querySelectorAll('.cat-btn').forEach(btn => btn.addEventListener('click', () => {
  currentFilter = btn.dataset.cat;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.toggle('active', b === btn));
  renderGaleria();
}));

document.getElementById('searchInput').addEventListener('input', e => {
  searchQuery = e.target.value;
  renderGaleria();
});

// ------------------------------------------------------------
// RENDER DE LA GALERÍA
// ------------------------------------------------------------
function filteredList() {
  const term = normalizar(searchQuery.trim().replace(/^#/, ''));
  return catalogos.filter(item => {
    const matchCat = item.cat === currentFilter;
    const matchSearch = !term || normalizar(item.titulo).includes(term) || normalizar(item.id).replace(/^#/, '').includes(term);
    return matchCat && matchSearch;
  });
}

function renderGaleria() {
  const container = document.getElementById('galeria');
  const empty = document.getElementById('emptyState');
  const list = filteredList();
  container.innerHTML = list.map((item, i) => `
    <article class="product-card" style="animation-delay:${i * 0.06}s" data-global-index="${catalogos.indexOf(item)}">
      <div class="product-card__media">
        <img src="${item.img}" alt="${item.titulo}" loading="lazy">
        <span class="product-card__tag">${item.cat}</span>
        ${item.tag ? `<span class="product-card__badge">${item.tag}</span>` : ''}
      </div>
      <div class="product-card__body">
        <h3>${item.titulo}</h3>
        <p>${item.resumen}</p>
        <p class="product-card__price">${item.precio}</p>
      </div>
    </article>`).join('');
  empty.classList.toggle('hidden', list.length > 0);
  container.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => openModal(Number(card.dataset.globalIndex)));
  });
}

// ------------------------------------------------------------
// MODAL DE DETALLE
// ------------------------------------------------------------
function openModal(globalIndex) {
  currentModalIndex = globalIndex;
  renderModal();
  document.getElementById('modal').classList.add('is-open');
  document.body.classList.add('no-scroll');
}
function closeModal() {
  document.getElementById('modal').classList.remove('is-open');
  document.body.classList.remove('no-scroll');
}
function stepModal(dir) {
  const list = filteredList();
  const current = catalogos[currentModalIndex];
  let idx = list.indexOf(current);
  idx = (idx + dir + list.length) % list.length;
  currentModalIndex = catalogos.indexOf(list[idx]);
  renderModal();
}
function renderModal() {
  const item = catalogos[currentModalIndex];
  document.getElementById('mImg').src = item.img;
  document.getElementById('mCat').textContent = item.cat;
  document.getElementById('mTitulo').textContent = item.titulo;
  document.getElementById('mPrecio').textContent = item.precio;
  document.getElementById('mResumen').textContent = item.resumen;
  document.getElementById('mFeatures').innerHTML = item.features.map(f => `<li>${f}</li>`).join('');
  const btn = document.getElementById('btnAgregar');
  const yaAgregado = cotizacion.some(entry => entry.id === item.id);
  btn.disabled = yaAgregado;
  btn.innerHTML = yaAgregado
    ? 'Ya está en tu cotización ✓'
    : 'Agregar a mi cotización <i data-lucide="plus" class="h-4 w-4"></i>';
  lucide.createIcons();
}
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalPrev').addEventListener('click', () => stepModal(-1));
document.getElementById('modalNext').addEventListener('click', () => stepModal(1));

// ------------------------------------------------------------
// COTIZACIÓN (carrito de interés)
// ------------------------------------------------------------
function saveCotizacion() { localStorage.setItem('nexo-cotizacion', JSON.stringify(cotizacion)); }

function addToCotizacion() {
  const item = catalogos[currentModalIndex];
  if (cotizacion.some(entry => entry.id === item.id)) return;
  cotizacion.push(item);
  saveCotizacion();
  renderCotizacion();
  renderModal();
  showToast();
}
document.getElementById('btnAgregar').addEventListener('click', addToCotizacion);

function removeFromCotizacion(id) {
  cotizacion = cotizacion.filter(entry => entry.id !== id);
  saveCotizacion();
  renderCotizacion();
}

function renderCotizacion() {
  const container = document.getElementById('cartItems');
  const badge = document.getElementById('cartBadge');
  const totalEl = document.getElementById('cartTotal');

  if (cotizacion.length === 0) {
    container.innerHTML = '<p class="cart-empty">Aún no agregas nada. Explora los planes y el portafolio para armar tu cotización.</p>';
    badge.classList.add('hidden');
    totalEl.textContent = 'Q0';
    document.getElementById('whatsappButton').href = waLink('¡Hola! Quiero platicar sobre un catálogo web para mi negocio.');
    return;
  }

  badge.textContent = cotizacion.length;
  badge.classList.remove('hidden');

  let total = 0;
  container.innerHTML = cotizacion.map(item => {
    total += Number(item.precio.replace(/[^0-9]/g, '')) || 0;
    return `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.titulo}">
        <div class="cart-item__info">
          <p class="tag">${item.cat}</p>
          <h4>${item.titulo}</h4>
          <p class="price">${item.precio}</p>
          <button class="cart-item__remove" data-id="${item.id}">Quitar</button>
        </div>
      </div>`;
  }).join('');
  totalEl.textContent = `Q${total}`;

  container.querySelectorAll('.cart-item__remove').forEach(btn => {
    btn.addEventListener('click', () => removeFromCotizacion(btn.dataset.id));
  });

  const lines = cotizacion.map((item, i) => `${i + 1}. ${item.titulo} (${item.cat}) — ${item.precio}`).join('\n');
  const message = `¡Hola! Quiero cotizar mi catálogo web. Esto es lo que me interesa:\n\n${lines}\n\nTotal estimado: Q${total}\n¿Platicamos los detalles?`;
  document.getElementById('whatsappButton').href = waLink(message);
}

function toggleCartSidebar(open) {
  document.getElementById('cartSidebar').classList.toggle('is-open', open);
  document.getElementById('overlay').classList.toggle('is-open', open);
}
document.getElementById('cartToggle').addEventListener('click', () => toggleCartSidebar(true));
document.getElementById('closeCart').addEventListener('click', () => toggleCartSidebar(false));
document.getElementById('overlay').addEventListener('click', () => toggleCartSidebar(false));

let toastTimer;
function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

// ------------------------------------------------------------
// INICIO
// ------------------------------------------------------------
document.body.classList.add('no-scroll');
buildTagRain();
setupLinks();
setupScene();
renderGaleria();
renderCotizacion();
lucide.createIcons();
