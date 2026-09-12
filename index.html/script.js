const musicToggle = document.querySelector('#musicToggle');
const backgroundMusic = document.querySelector('#backgroundMusic');
const exploreButton = document.querySelector('#exploreButton');
const catalogSection = document.querySelector('#catalogo');
let hasExploredCatalog = false;
let isCatalogVisible = false;
let isPageVisible = document.visibilityState === 'visible';
let userMutedMusic = false;

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

musicToggle.addEventListener('click', async () => {
  if (!hasExploredCatalog) return;
  if (backgroundMusic.paused) {
    userMutedMusic = false;
    if (isCatalogVisible && isPageVisible) await playBackgroundMusic();
  } else {
    userMutedMusic = true;
    backgroundMusic.pause();
    updateMusicButton(false);
  }
});

backgroundMusic.addEventListener('play', () => updateMusicButton(true));
backgroundMusic.addEventListener('pause', () => updateMusicButton(false));

exploreButton.addEventListener('click', async () => {
  hasExploredCatalog = true;
  userMutedMusic = false;
  await playBackgroundMusic();
});

const catalogObserver = new IntersectionObserver(([entry]) => {
  isCatalogVisible = entry.isIntersecting;
  if (!isCatalogVisible || !isPageVisible || userMutedMusic) {
    backgroundMusic.pause();
    return;
  }
  if (hasExploredCatalog) playBackgroundMusic();
}, { threshold: 0.2 });

catalogObserver.observe(catalogSection);

document.addEventListener('visibilitychange', () => {
  isPageVisible = document.visibilityState === 'visible';
  if (!isPageVisible) {
    backgroundMusic.pause();
    return;
  }
  if (hasExploredCatalog && isCatalogVisible && !userMutedMusic) playBackgroundMusic();
});