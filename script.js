/* =========================================
   ELEMENTS
========================================= */

const audio = document.getElementById("audio");

const clock = document.getElementById("clock");

const poster = document.getElementById("poster");

const dayBtn = document.getElementById("dayBtn");
const nightBtn = document.getElementById("nightBtn");

const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const seek = document.getElementById("seek");
const volume = document.getElementById("volume");

const currentTimeEl =
  document.getElementById("currentTime");

const durationEl =
  document.getElementById("duration");

const trackTitle =
  document.getElementById("trackTitle");

const trackArtist =
  document.getElementById("trackArtist");

const cover =
  document.getElementById("cover");

const playlistEl =
  document.getElementById("playlist");

const likeBtn =
  document.getElementById("likeBtn");

const replayBtn =
  document.getElementById("replayBtn");

const audioNote =
  document.getElementById("audioNote");


/* =========================================
   SONG LIST
=========================================

   Put your MP3 files here:

   assets/audio/song1.mp3
   assets/audio/song2.mp3
   assets/audio/song3.mp3

========================================= */

const songs = [

  {
    title: "Safarnama",
    artist: "Lucky Ali",
    src: "assets/audio/song1.mp3",
    cover: "assets/song1-cover.jpg"
  },

  {
    title: "Song 2",
    artist: "Your Artist",
    src: "assets/audio/song2.mp3",
    cover: "assets/song2-cover.jpg"
  },

  {
    title: "Song 3",
    artist: "Your Artist",
    src: "assets/audio/song3.mp3",
    cover: "assets/song3-cover.jpg"
  }

];


/* =========================================
   VARIABLES
========================================= */

let currentIndex = 0;

let isPlaying = false;

let liked = false;


/* =========================================
   FORMAT TIME
========================================= */

function formatTime(seconds) {

  if (
    !Number.isFinite(seconds) ||
    seconds < 0
  ) {
    return "00:00";
  }

  const mins =
    Math.floor(seconds / 60);

  const secs =
    Math.floor(seconds % 60);

  return (
    String(mins).padStart(2, "0") +
    ":" +
    String(secs).padStart(2, "0")
  );
}


/* =========================================
   LIVE CLOCK
========================================= */

function updateClock() {

  const now = new Date();

  const hours =
    String(now.getHours())
      .padStart(2, "0");

  const minutes =
    String(now.getMinutes())
      .padStart(2, "0");

  const seconds =
    String(now.getSeconds())
      .padStart(2, "0");

  clock.textContent =
    `${hours}:${minutes}:${seconds}`;
}


updateClock();

setInterval(
  updateClock,
  1000
);


/* =========================================
   PLAY BUTTON
========================================= */

function updatePlayButton() {

  if (isPlaying) {

    playIcon.textContent = "Ⅱ";

    playBtn.setAttribute(
      "aria-label",
      "Pause"
    );

  } else {

    playIcon.textContent = "▶";

    playBtn.setAttribute(
      "aria-label",
      "Play"
    );

  }
}


/* =========================================
   PLAYLIST
========================================= */

function renderPlaylist() {

  playlistEl.innerHTML = "";

  songs.forEach(
    (song, index) => {

      const li =
        document.createElement("li");


      if (
        index === currentIndex
      ) {

        li.classList.add("active");

      }


      li.innerHTML = `

        <span class="num">
          ${index + 1}.
        </span>

        <span>
          ${song.title}
        </span>

        <span
          class="duration"
          data-duration="${index}"
        >
          --:--
        </span>

      `;


      li.addEventListener(
        "click",
        () => {

          loadSong(
            index,
            true
          );

        }
      );


      playlistEl.appendChild(li);

    }
  );
}


/* =========================================
   UPDATE ACTIVE SONG
========================================= */

function updateActivePlaylist() {

  [
    ...playlistEl.children
  ].forEach(
    (item, index) => {

      item.classList.toggle(
        "active",
        index === currentIndex
      );

    }
  );

}


/* =========================================
   LOAD SONG
========================================= */

function loadSong(
  index,
  autoplay = false
) {

  if (!songs.length) {
    return;
  }


  currentIndex =
    (index + songs.length) %
    songs.length;


  const song =
    songs[currentIndex];


  /* AUDIO */

  audio.src = song.src;

  audio.load();


  /* INFORMATION */

  trackTitle.textContent =
    song.title;

  trackArtist.textContent =
    song.artist;


  /* COVER */

  cover.style.display =
    "block";

  cover.src =
    song.cover;


  cover.nextElementSibling.style.display =
    "none";


  cover.onerror = () => {

    cover.style.display =
      "none";

    cover.nextElementSibling.style.display =
      "grid";

  };


  /* RESET */

  currentTimeEl.textContent =
    "00:00";

  durationEl.textContent =
    "00:00";

  seek.value = 0;


  updateActivePlaylist();


  if (autoplay) {

    playAudio();

  } else {

    isPlaying = false;

    updatePlayButton();

  }

}


/* =========================================
   PLAY AUDIO
========================================= */

async function playAudio() {

  try {

    await audio.play();

    isPlaying = true;

    audioNote.style.display =
      "none";

  }

  catch (error) {

    isPlaying = false;

    audioNote.style.display =
      "block";

    audioNote.textContent =
      "Add your MP3 files to assets/audio/ or choose a song from the playlist.";

  }


  updatePlayButton();
}


/* =========================================
   PAUSE AUDIO
========================================= */

function pauseAudio() {

  audio.pause();

  isPlaying = false;

  updatePlayButton();
}


/* =========================================
   PLAY / PAUSE
========================================= */

playBtn.addEventListener(
  "click",
  () => {

    if (audio.paused) {

      playAudio();

    } else {

      pauseAudio();

    }

  }
);


/* =========================================
   PREVIOUS
========================================= */

prevBtn.addEventListener(
  "click",
  () => {

    loadSong(
      currentIndex - 1,
      true
    );

  }
);


/* =========================================
   NEXT
========================================= */

nextBtn.addEventListener(
  "click",
  () => {

    loadSong(
      currentIndex + 1,
      true
    );

  }
);


/* =========================================
   REPLAY
========================================= */

replayBtn.addEventListener(
  "click",
  () => {

    audio.currentTime = 0;

    playAudio();

  }
);


/* =========================================
   AUDIO TIME UPDATE
========================================= */

audio.addEventListener(
  "timeupdate",
  () => {

    if (
      !Number.isFinite(audio.duration) ||
      audio.duration <= 0
    ) {

      return;

    }


    const percentage =
      (
        audio.currentTime /
        audio.duration
      ) * 100;


    seek.value =
      percentage;


    currentTimeEl.textContent =
      formatTime(
        audio.currentTime
      );


    durationEl.textContent =
      formatTime(
        audio.duration
      );

  }
);


/* =========================================
   SONG LOADED
========================================= */

audio.addEventListener(
  "loadedmetadata",
  () => {

    durationEl.textContent =
      formatTime(
        audio.duration
      );


    const durationItem =
      document.querySelector(
        `[data-duration="${currentIndex}"]`
      );


    if (durationItem) {

      durationItem.textContent =
        formatTime(
          audio.duration
        );

    }

  }
);


/* =========================================
   AUTO NEXT
========================================= */

audio.addEventListener(
  "ended",
  () => {

    loadSong(
      currentIndex + 1,
      true
    );

  }
);


/* =========================================
   AUDIO ERROR
========================================= */

audio.addEventListener(
  "error",
  () => {

    isPlaying = false;

    updatePlayButton();


    audioNote.style.display =
      "block";


    audioNote.textContent =
      `Could not load "${songs[currentIndex].title}". Check the file name in assets/audio/.`;

  }
);


/* =========================================
   SEEK BAR
========================================= */

seek.addEventListener(
  "input",
  () => {

    if (
      !Number.isFinite(audio.duration) ||
      audio.duration <= 0
    ) {

      return;

    }


    audio.currentTime =
      (
        Number(seek.value) / 100
      ) * audio.duration;

  }
);


/* =========================================
   VOLUME
========================================= */

volume.addEventListener(
  "input",
  () => {

    audio.volume =
      Number(volume.value);

  }
);


/* =========================================
   LIKE BUTTON
========================================= */

likeBtn.addEventListener(
  "click",
  () => {

    liked = !liked;


    likeBtn.classList.toggle(
      "liked",
      liked
    );


    likeBtn.textContent =
      liked ? "♥" : "♡";


    likeBtn.setAttribute(
      "aria-pressed",
      String(liked)
    );

  }
);


/* =========================================
   DAY MODE
========================================= */

function setDay() {

  poster.classList.remove(
    "night"
  );


  dayBtn.classList.add(
    "active"
  );

  nightBtn.classList.remove(
    "active"
  );


  dayBtn.setAttribute(
    "aria-pressed",
    "true"
  );

  nightBtn.setAttribute(
    "aria-pressed",
    "false"
  );


  localStorage.setItem(
    "longDriveTheme",
    "day"
  );

}


/* =========================================
   NIGHT MODE
========================================= */

function setNight() {

  poster.classList.add(
    "night"
  );


  nightBtn.classList.add(
    "active"
  );

  dayBtn.classList.remove(
    "active"
  );


  nightBtn.setAttribute(
    "aria-pressed",
    "true"
  );

  dayBtn.setAttribute(
    "aria-pressed",
    "false"
  );


  localStorage.setItem(
    "longDriveTheme",
    "night"
  );

}


/* =========================================
   THEME BUTTONS
========================================= */

dayBtn.addEventListener(
  "click",
  setDay
);


nightBtn.addEventListener(
  "click",
  setNight
);


/* =========================================
   REMEMBER THEME
========================================= */

const savedTheme =
  localStorage.getItem(
    "longDriveTheme"
  );


if (savedTheme === "night") {

  setNight();

} else {

  setDay();

}


/* =========================================
   INITIAL VOLUME
========================================= */

audio.volume =
  Number(volume.value);


/* =========================================
   START
========================================= */

renderPlaylist();

loadSong(
  0,
  false
);
