const musicToggle = document.querySelector('#musicToggle');
const backgroundMusic = document.querySelector('#backgroundMusic');
const exploreButton = document.querySelector('#exploreButton');
let hasExploredCatalog = false;
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
    if (isPageVisible && window.scrollY > 0) await playBackgroundMusic();
  } else {
    userMutedMusic = true;
    backgroundMusic.pause();
    updateMusicButton(false);
  }
});

backgroundMusic.addEventListener('play', () => updateMusicButton(true));
backgroundMusic.addEventListener('pause', () => updateMusicButton(false));

exploreButton.addEventListener('click', () => {
  hasExploredCatalog = true;
  userMutedMusic = false;
  updateMusicButton(true);
  backgroundMusic.play().catch(() => updateMusicButton(false));
});

exploreButton.addEventListener('touchstart', () => {
  hasExploredCatalog = true;
  userMutedMusic = false;
  updateMusicButton(true);
  backgroundMusic.play().catch(() => updateMusicButton(false));
}, { passive: true });

window.addEventListener('scroll', () => {
  if (hasExploredCatalog && window.scrollY <= 0 && !backgroundMusic.paused) {
    backgroundMusic.pause();
  }
}, { passive: true });

document.addEventListener('visibilitychange', () => {
  isPageVisible = document.visibilityState === 'visible';
  if (!isPageVisible) {
    backgroundMusic.pause();
    return;
  }
});