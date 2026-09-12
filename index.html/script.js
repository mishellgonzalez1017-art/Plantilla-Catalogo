const musicToggle = document.querySelector('#musicToggle');
const backgroundMusic = document.querySelector('#backgroundMusic');
const interactionEvents = ['pointerdown', 'keydown'];

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

function removeInteractionListeners() {
  interactionEvents.forEach(eventName => document.removeEventListener(eventName, enableMusicAfterInteraction));
}

function enableMusicAfterInteraction() {
  removeInteractionListeners();
  if (backgroundMusic.paused) playBackgroundMusic();
}

musicToggle.addEventListener('click', async () => {
  removeInteractionListeners();
  if (backgroundMusic.paused) {
    await playBackgroundMusic();
  } else {
    backgroundMusic.pause();
    updateMusicButton(false);
  }
});

backgroundMusic.addEventListener('play', () => updateMusicButton(true));
backgroundMusic.addEventListener('pause', () => updateMusicButton(false));

interactionEvents.forEach(eventName => document.addEventListener(eventName, enableMusicAfterInteraction, { once: true }));
playBackgroundMusic();