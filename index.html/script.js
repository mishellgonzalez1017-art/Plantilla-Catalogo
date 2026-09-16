import products from './productos.js';

const musicToggle = document.querySelector('#musicToggle');
const backgroundMusic = document.querySelector('#backgroundMusic');
const exploreButton = document.querySelector('#exploreButton');
const intro = document.querySelector('#intro');
let hasExploredCatalog = false;
let isPageVisible = document.visibilityState === 'visible';
let userMutedMusic = false;
let selectedBrand = 'Todas';
let cart = JSON.parse(localStorage.getItem('atelier-belle-cart') || '{}');
const WHATSAPP_PHONE = '50240283552';
const whatsappMessage = '¡Hola! Me interesa obtener información sobre las plantillas para catálogos web para mi negocio.';
const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;
const money = value => `$${value.toFixed(2)}`;
const productById = id => products.find(product => product.id === id);

function updateMusicButton(isPlaying) {
  musicToggle.classList.toggle('is-playing', isPlaying);
  musicToggle.setAttribute('aria-pressed', String(isPlaying));
  musicToggle.setAttribute('aria-label', `${isPlaying ? 'Pausar' : 'Reproducir'} música de fondo`);
  musicToggle.querySelector('.music-toggle__icon').textContent = isPlaying ? '🔊' : '🔇';
}

async function playBackgroundMusic() {
  try {
    await backgroundMusic.play();
    updateMusicButton(true);
    return true;
  } catch (error) {
    updateMusicButton(false);
    return false;
  }
}

function renderProducts() {
  const term = document.querySelector('#searchInput').value.trim().toLowerCase();
  const visible = products.filter(product => (
    (selectedBrand === 'Todas' || product.brand === selectedBrand)
    && (!term || `${product.name} ${product.brand} ${product.id}`.toLowerCase().includes(term))
  ));
  document.querySelector('#productGrid').innerHTML = visible.map(product => {
    const productWaText = encodeURIComponent(`¡Hola! Me interesa la plantilla del catálogo y quiero información sobre el producto: ${product.name} (Código: ${product.id})`);
    return `<article class="product-card group overflow-hidden p-3"><div class="relative mb-4 aspect-[.86] overflow-hidden rounded-xl bg-[#e9ded4]"><img class="product-image h-full w-full object-cover" src="${product.image}" alt="${product.name}" loading="lazy"><span class="absolute left-3 top-3 bg-[#fbf8f4]/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.14em] text-wine">${product.brand}</span><button class="add-button absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#fbf8f4] text-ink shadow-md transition hover:bg-wine hover:text-white" data-id="${product.id}" aria-label="Añadir ${product.name} al carrito"><i data-lucide="plus" class="h-5 w-5"></i></button></div><div class="flex items-start justify-between gap-3"><div><h3 class="display text-xl font-semibold leading-none sm:text-2xl">${product.name}</h3><p class="mt-2 text-xs leading-5 text-[#81756d]">${product.description}</p></div><span class="shrink-0 text-sm font-semibold">Q${product.price}</span></div><a class="product-whatsapp mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#3a8c67] px-3 py-2 text-center text-[10px] font-bold uppercase tracking-[.08em] text-white transition hover:bg-[#2f7455]" href="https://wa.me/${WHATSAPP_PHONE}?text=${productWaText}" target="_blank" rel="noopener">Consultar plantilla <i data-lucide="message-circle" class="h-4 w-4"></i></a><p class="mt-3 text-[9px] font-semibold uppercase tracking-[.18em] text-[#aa9c93]">Código ${product.id}</p></article>`;
    return `<article class="product-card group overflow-hidden p-3.5"><div class="product-image-container mb-4"><img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy"><span class="absolute left-3 top-3 rounded-md bg-[#fbf8f4]/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.14em] text-wine shadow-sm">${product.brand}</span><button class="add-button absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#fbf8f4] text-ink shadow-md transition hover:bg-wine hover:text-white" data-id="${product.id}" aria-label="Añadir ${product.name} al carrito"><i data-lucide="plus" class="h-5 w-5"></i></button></div><div class="flex items-start justify-between gap-3"><div><h3 class="display text-xl font-semibold leading-none sm:text-2xl">${product.name}</h3><p class="mt-2 text-xs leading-5 text-[#81756d]">${product.description}</p></div><span class="shrink-0 text-sm font-semibold text-wine">Q${product.price}</span></div><a class="product-whatsapp mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#3a8c67] px-3 py-2.5 text-center text-[10px] font-bold uppercase tracking-[.08em] text-white transition hover:bg-[#2f7455]" href="https://wa.me/${WHATSAPP_PHONE}?text=${productWaText}" target="_blank" rel="noopener">Consultar plantilla <i data-lucide="message-circle" class="h-4 w-4"></i></a><p class="mt-3 text-[9px] font-semibold uppercase tracking-[.18em] text-[#aa9c93]">Código ${product.id}</p></article>`;
  }).join('');
  document.querySelector('#emptyState').classList.toggle('hidden', visible.length > 0);
  lucide.createIcons();
  document.querySelectorAll('.add-button').forEach(button => button.addEventListener('click', () => addToCart(button.dataset.id)));
}

function saveCart() { localStorage.setItem('atelier-belle-cart', JSON.stringify(cart)); }
function addToCart(id) { cart[id] = (cart[id] || 0) + 1; saveCart(); renderCart(); showToast(); }
function changeQuantity(id, amount) { cart[id] = (cart[id] || 0) + amount; if (cart[id] <= 0) delete cart[id]; saveCart(); renderCart(); }

function renderCart() {
  const entries = Object.entries(cart).map(([id, quantity]) => ({ product: productById(id), quantity })).filter(item => item.product);
  const itemCount = entries.reduce((sum, item) => sum + item.quantity, 0);
  const total = entries.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  document.querySelector('#cartCount').textContent = itemCount;
  document.querySelector('#cartTotal').textContent = money(total);
  document.querySelector('#cartItems').innerHTML = entries.length ? entries.map(({ product, quantity }) => `<div class="flex gap-4 border-b border-[#e6ddd6] py-5"><img src="${product.image}" alt="" class="h-20 w-16 object-cover"><div class="min-w-0 flex-1"><div class="flex justify-between gap-3"><div><p class="text-[9px] font-bold uppercase tracking-[.14em] text-wine">${product.brand}</p><h3 class="display mt-1 truncate text-xl font-semibold">${product.name}</h3><p class="mt-1 text-[10px] uppercase tracking-[.12em] text-[#a0948b]">${product.id}</p></div><strong class="text-sm">${money(product.price * quantity)}</strong></div><div class="mt-3 flex items-center justify-between"><div class="flex items-center border border-[#d8cbc2]"><button class="quantity-button flex h-7 w-7 items-center justify-center" data-id="${product.id}" data-change="-1" aria-label="Reducir cantidad"><i data-lucide="minus" class="h-3 w-3"></i></button><span class="w-7 text-center text-xs">${quantity}</span><button class="quantity-button flex h-7 w-7 items-center justify-center" data-id="${product.id}" data-change="1" aria-label="Aumentar cantidad"><i data-lucide="plus" class="h-3 w-3"></i></button></div><button class="remove-button text-[10px] uppercase tracking-[.12em] text-[#9a8e86] underline underline-offset-4" data-id="${product.id}">Eliminar</button></div></div></div>`).join('') : '<div class="flex h-full flex-col items-center justify-center text-center"><i data-lucide="shopping-bag" class="mb-4 h-8 w-8 text-[#b9aaa1]"></i><p class="display text-3xl">Tu selección está vacía</p><p class="mt-2 max-w-xs text-sm leading-6 text-[#8e8179]">Añade un producto para consultar la plantilla.</p></div>';
  const message = entries.length ? `${whatsappMessage}%0A%0A${entries.map(({ product, quantity }) => `• ${product.id} | ${product.name} x${quantity}`).join('%0A')}` : encodeURIComponent(whatsappMessage);
  document.querySelector('#whatsappButton').href = `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;
  lucide.createIcons();
  document.querySelectorAll('.quantity-button').forEach(button => button.addEventListener('click', () => changeQuantity(button.dataset.id, Number(button.dataset.change))));
  document.querySelectorAll('.remove-button').forEach(button => button.addEventListener('click', () => changeQuantity(button.dataset.id, -cart[button.dataset.id])));
}

function toggleCart(open) {
  document.querySelector('#cartDrawer').classList.toggle('is-open', open);
  document.querySelector('#overlay').classList.toggle('is-open', open);
  document.body.classList.toggle('no-scroll', open || !hasExploredCatalog);
}

let toastTimer;
function showToast() {
  const toast = document.querySelector('#toast');
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function closeIntro() {
  if (!intro || intro.classList.contains('is-hidden')) return;
  intro.classList.add('is-hidden');
  hasExploredCatalog = true;
  document.body.classList.remove('no-scroll');
  setTimeout(() => intro.remove(), 900);
}

function setupScene() {
  if (!window.THREE) return;
  const canvas = document.querySelector('#scene');
  if (!canvas) return;

  // Evitar que gestos de scroll/touch muevan o cierren la pantalla
  if (intro) {
    intro.addEventListener('wheel', e => e.stopPropagation(), { passive: false });
    intro.addEventListener('touchmove', e => e.stopPropagation(), { passive: false });
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, .1, 100);
  camera.position.z = 5;
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 5.2;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.setClearColor(0x000000, 0);
  const group = new THREE.Group();
  scene.add(group);
  const sphere = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.35, 4),
    new THREE.MeshPhysicalMaterial({ color: 0xb26e6d, roughness: .18, metalness: .35, clearcoat: 1, clearcoatRoughness: .15, transparent: true, opacity: .88 })
  );
  group.add(sphere);
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.7, .012, 12, 120),
    new THREE.MeshBasicMaterial({ color: 0xe8c1a7, transparent: true, opacity: .5 })
  );
  ring.rotation.x = 1.1;
  group.add(ring);
  const particles = new THREE.BufferGeometry();
  const positions = [];
  for (let i = 0; i < 380; i += 1) {
    const radius = 2.2 + Math.random() * 2.4;

  // Iluminación de estudio de lujo
  const ambientLight = new THREE.AmbientLight(0xfffaea, 1.4);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xfff1de, 2.6);
  mainLight.position.set(6, 8, 7);
  scene.add(mainLight);

  const fillLight = new THREE.DirectionalLight(0xe8a69c, 1.4);
  fillLight.position.set(-6, -4, -4);
  scene.add(fillLight);

  const goldPointLight = new THREE.PointLight(0xd4af37, 3.8, 25);
  goldPointLight.position.set(4, 3, 3);
  scene.add(goldPointLight);

  const winePointLight = new THREE.PointLight(0x9e3d52, 4.2, 25);
  winePointLight.position.set(-4, -2, 2);
  scene.add(winePointLight);

  const rootGroup = new THREE.Group();
  scene.add(rootGroup);

  // Gema poliédrica central con material físico de refracción y brillo
  const jewelGeometry = new THREE.IcosahedronGeometry(1.3, 2);
  const jewelMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x823b49,
    emissive: 0x220c12,
    roughness: 0.14,
    metalness: 0.38,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    transmission: 0.45,
    thickness: 1.4,
    reflectivity: 0.9,
    transparent: true,
    opacity: 0.92
  });
  const jewelMesh = new THREE.Mesh(jewelGeometry, jewelMaterial);
  rootGroup.add(jewelMesh);

  // Halo geométrico exterior tipo joyería
  const haloGeometry = new THREE.IcosahedronGeometry(1.48, 1);
  const haloMaterial = new THREE.MeshBasicMaterial({
    color: 0xe8a69c,
    wireframe: true,
    transparent: true,
    opacity: 0.28
  });
  const haloMesh = new THREE.Mesh(haloGeometry, haloMaterial);
  rootGroup.add(haloMesh);

  // Anillo orbital 1: Oro pulido
  const ring1Geometry = new THREE.TorusGeometry(1.9, 0.016, 16, 140);
  const ring1Material = new THREE.MeshStandardMaterial({
    color: 0xdeb887,
    metalness: 0.9,
    roughness: 0.18
  });
  const ring1 = new THREE.Mesh(ring1Geometry, ring1Material);
  ring1.rotation.x = 1.15;
  ring1.rotation.y = 0.35;
  rootGroup.add(ring1);

  // Anillo orbital 2: Oro rosa / Cobre
  const ring2Geometry = new THREE.TorusGeometry(2.25, 0.012, 16, 160);
  const ring2Material = new THREE.MeshStandardMaterial({
    color: 0xe8a69c,
    metalness: 0.85,
    roughness: 0.22
  });
  const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
  ring2.rotation.x = -0.75;
  ring2.rotation.z = 0.6;
  rootGroup.add(ring2);

  // Polvo estelar / Partículas flotantes de lujo
  const particleCount = 650;
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = [];
  const particleColors = [];

  const colorPalette = [
    new THREE.Color(0xd4af37), // Oro
    new THREE.Color(0xe8a69c), // Oro rosa
    new THREE.Color(0xfffaea), // Champagne
    new THREE.Color(0xb08b55)  // Bronce
  ];

  for (let i = 0; i < particleCount; i++) {
    const radius = 2.0 + Math.random() * 3.4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions.push(radius * Math.sin(phi) * Math.cos(theta), radius * Math.sin(phi) * Math.sin(theta), radius * Math.cos(phi));
    particlePositions.push(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi)
    );
    const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    particleColors.push(chosenColor.r, chosenColor.g, chosenColor.b);
  }
  particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  group.add(new THREE.Points(particles, new THREE.PointsMaterial({ color: 0xe7b9a4, size: .018, transparent: true, opacity: .8 })));
  const pointer = { x: 0, y: 0 };
  addEventListener('pointermove', event => {
    pointer.x = (event.clientX / innerWidth - .5) * 2;
    pointer.y = (event.clientY / innerHeight - .5) * 2;

  particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3));
  particleGeometry.setAttribute('color', new THREE.Float32BufferAttribute(particleColors, 3));

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.024,
    vertexColors: true,
    transparent: true,
    opacity: 0.82,
    blending: THREE.AdditiveBlending
  });
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  rootGroup.add(particles);

  // Movimiento interactivo suave con inercia lerp
  const pointer = { currentX: 0, currentY: 0, targetX: 0, targetY: 0 };
  window.addEventListener('pointermove', event => {
    pointer.targetX = (event.clientX / window.innerWidth - 0.5) * 2;
    pointer.targetY = (event.clientY / window.innerHeight - 0.5) * 2;
  });

  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', event => {
      if (event.gamma !== null && event.beta !== null) {
        pointer.targetX = Math.max(-1, Math.min(1, event.gamma / 25));
        pointer.targetY = Math.max(-1, Math.min(1, (event.beta - 45) / 25));
      }
    });
  }

  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    group.rotation.y += .0025;
    group.rotation.x += .0008;
    group.rotation.y += (pointer.x * .06 - group.rotation.y) * .003;
    group.position.x += (pointer.x * .15 - group.position.x) * .02;
    group.position.y += (-pointer.y * .15 - group.position.y) * .02;
    const delta = clock.getDelta();

    // Lerp damping para suavidad cinematográfica
    pointer.currentX += (pointer.targetX - pointer.currentX) * 0.04;
    pointer.currentY += (pointer.targetY - pointer.currentY) * 0.04;

    // Rotaciones orbitales independientes
    jewelMesh.rotation.y += 0.005;
    jewelMesh.rotation.x += 0.0025;

    haloMesh.rotation.y -= 0.003;
    haloMesh.rotation.z += 0.002;

    ring1.rotation.z += 0.004;
    ring1.rotation.x += 0.002;

    ring2.rotation.y += 0.0035;
    ring2.rotation.z -= 0.002;

    particles.rotation.y += 0.001;

    // Inclinación reactiva al cursor
    rootGroup.rotation.y = pointer.currentX * 0.28;
    rootGroup.rotation.x = -pointer.currentY * 0.22;
    rootGroup.position.x = pointer.currentX * 0.35;
    rootGroup.position.y = -pointer.currentY * 0.28;

    renderer.render(scene, camera);
  }

  animate();
  addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

musicToggle.addEventListener('click', async () => {
  if (!hasExploredCatalog) return;
  if (backgroundMusic.paused) {
    userMutedMusic = false;
    if (isPageVisible) await playBackgroundMusic();
  } else {
    userMutedMusic = true;
    backgroundMusic.pause();
    updateMusicButton(false);
  }
});
backgroundMusic.addEventListener('play', () => updateMusicButton(true));
backgroundMusic.addEventListener('pause', () => updateMusicButton(false));
exploreButton.addEventListener('click', () => {
  closeIntro();
  userMutedMusic = false;
  backgroundMusic.play().catch(() => updateMusicButton(false));
});
document.addEventListener('visibilitychange', () => {
  isPageVisible = document.visibilityState === 'visible';
  if (!isPageVisible) backgroundMusic.pause();
});
document.querySelector('#searchInput').addEventListener('input', renderProducts);
document.querySelectorAll('.filter-button').forEach(button => button.addEventListener('click', () => {
  selectedBrand = button.dataset.brand;
  document.querySelectorAll('.filter-button').forEach(item => item.classList.toggle('active', item === button));
  renderProducts();
}));
document.querySelector('#cartButton').addEventListener('click', () => toggleCart(true));
document.querySelector('#closeCart').addEventListener('click', () => toggleCart(false));
document.querySelector('#overlay').addEventListener('click', () => toggleCart(false));

document.body.classList.add('no-scroll');
setupScene();
renderProducts();
renderCart();
lucide.createIcons();

function init3DEffects() {
  const heroStage = document.querySelector('.hero-3d-stage');
  const heroScene = document.querySelector('.hero-3d-scene');

  if (heroStage && heroScene && window.matchMedia('(pointer: fine)').matches) {
    heroStage.addEventListener('mousemove', (e) => {
      const rect = heroStage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroScene.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 18}deg)`;
    });
    heroStage.addEventListener('mouseleave', () => {
      heroScene.style.transform = '';
    });
  }

  const categoryCards = document.querySelectorAll('.category-card-3d');
  categoryCards.forEach(card => {
    const inner = card.querySelector('.category-card-inner');
    if (!inner || !window.matchMedia('(pointer: fine)').matches) return;
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      inner.style.transform = `translateY(-10px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      inner.style.transform = '';
    });
  });
}

init3DEffects();
