const songs = [
  {
    title: "Lost in the City Lights",
    artist: "Cosmo Sheldrake",
    src: "lost-in-city.mp3",
    img: "cover-1.jpg",
  },
  {
    title: "Forest Lullaby",
    artist: "Lesfm",
    src: "forest-lullaby.mp3",
    img: "cover-2.jpg",
  },
];

let currentSongIndex = 0;

const audio = new Audio();

const songImg = document.getElementById('cover-image');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');

const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progressBar = document.getElementById('progress-bar');

const playBtn = document.getElementById('play-btn');
const playBtnImg = playBtn.querySelector('img');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

function loadSong(currentIndex) {
  const { title, artist, img, src } = songs[currentIndex];
  songTitle.textContent = title;
  songArtist.textContent = artist;
  songImg.src = `./src/assets/images/${img}`;
  audio.src = `./src/assets/tracks/${src}`;
  audio.load();
  
  updateProgressBar();
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const seg = Math.floor(seconds % 60);
  return `${min}:${seg < 10 ? '0' + seg : seg}`;
}

function playMusic() {
  if (audio.paused) {
    audio.play();
    playBtnImg.src = "./src/assets/icons/pause.svg";
  } else {
    audio.pause();
    playBtnImg.src = "./src/assets/icons/play.svg";
  }
}

function changeMusic(direction) {
  currentSongIndex = (currentSongIndex + direction + songs.length) % songs.length;
  loadSong(currentSongIndex);
  playMusic();
}

function updateProgressBar() {
  const { duration, currentTime } = audio;
  const progressPercent = (currentTime / duration) * 100 || 0;
  
  progressBar.value = progressPercent;
  
  // Efeito de "pintar" a barra usando gradiente
  progressBar.style.background = `linear-gradient(to right, #C93B76 ${progressPercent}%, #E5E7EB33 ${progressPercent}%)`;
  
  currentTimeEl.textContent = formatTime(currentTime);
  if (!isNaN(duration)) {
    durationEl.textContent = formatTime(duration);
  }
}

playBtn.addEventListener('click', playMusic);
nextBtn.addEventListener('click', () => changeMusic(1));
prevBtn.addEventListener('click', () => changeMusic(-1));

progressBar.addEventListener('input', () => {
  const time = (progressBar.value / 100) * audio.duration;
  audio.currentTime = time;
  updateProgressBar();
});

audio.addEventListener('timeupdate', updateProgressBar);
audio.addEventListener('ended', () => changeMusic(1));
audio.addEventListener('loadedmetadata', updateProgressBar);

// Inicialização
loadSong(currentSongIndex);