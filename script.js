/* =====================================================
   LONG DRIVE WITH HER
   Local Music Player
   No API / No Backend
===================================================== */


/* =====================================================
   SONGS
===================================================== */

const songs = [

    {
        title: "Safarnama",
        artist: "Lucky Ali",
        cover: "assets/safranama.jpg",
        audio: "assets/safranama.mp3"
    },

    {
        title: "Song 2",
        artist: "My Playlist",
        cover: "assets/song2.jpg",
        audio: "assets/song2.mp3"
    },

    {
        title: "Song 3",
        artist: "My Playlist",
        cover: "assets/song3.jpg",
        audio: "assets/song3.mp3"
    }

];


/* =====================================================
   ELEMENTS
===================================================== */

const audio = document.getElementById("audio");

const playBtn = document.getElementById("playBtn");

const previousBtn =
    document.getElementById("previousBtn");

const nextBtn =
    document.getElementById("nextBtn");

const progress =
    document.getElementById("progress");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");

const cover =
    document.getElementById("cover");

const songTitle =
    document.getElementById("songTitle");

const artist =
    document.getElementById("artist");

const playlist =
    document.getElementById("playlist");

const heartBtn =
    document.getElementById("heartBtn");

const dayBtn =
    document.getElementById("dayBtn");

const nightBtn =
    document.getElementById("nightBtn");

const hero =
    document.querySelector(".hero");

const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");

const timeElement =
    document.getElementById("time");


/* =====================================================
   CURRENT SONG
===================================================== */

let currentSong = 0;


/* =====================================================
   LOAD SONG
===================================================== */

function loadSong(index) {

    currentSong = index;

    const song = songs[currentSong];

    songTitle.textContent = song.title;

    artist.textContent = song.artist;

    cover.src = song.cover;

    audio.src = song.audio;

    audio.load();

    updatePlaylist();

    playBtn.textContent = "▶";

    progress.value = 0;

    currentTime.textContent = "00:00";

    duration.textContent = "00:00";
}


/* =====================================================
   PLAY
===================================================== */

function playSong() {

    audio.play()
        .then(() => {

            playBtn.textContent = "Ⅱ";

        })
        .catch((error) => {

            console.log(
                "Audio could not play:",
                error
            );

        });
}


/* =====================================================
   PAUSE
===================================================== */

function pauseSong() {

    audio.pause();

    playBtn.textContent = "▶";
}


/* =====================================================
   PLAY / PAUSE
===================================================== */

playBtn.addEventListener("click", () => {

    if (audio.paused) {

        playSong();

    } else {

        pauseSong();

    }

});


/* =====================================================
   NEXT
===================================================== */

function nextSong() {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();
}

nextBtn.addEventListener(
    "click",
    nextSong
);


/* =====================================================
   PREVIOUS
===================================================== */

function previousSong() {

    currentSong--;

    if (currentSong < 0) {

        currentSong = songs.length - 1;

    }

    loadSong(currentSong);

    playSong();
}

previousBtn.addEventListener(
    "click",
    previousSong
);


/* =====================================================
   AUDIO TIME UPDATE
===================================================== */

audio.addEventListener(
    "timeupdate",
    () => {

        if (!audio.duration) {
            return;
        }

        const percent =
            (audio.currentTime /
                audio.duration) * 100;

        progress.value = percent;

        currentTime.textContent =
            formatTime(audio.currentTime);

    }
);


/* =====================================================
   AUDIO LOADED
===================================================== */

audio.addEventListener(
    "loadedmetadata",
    () => {

        if (audio.duration) {

            duration.textContent =
                formatTime(audio.duration);

        }

    }
);


/* =====================================================
   PROGRESS BAR
===================================================== */

progress.addEventListener(
    "input",
    () => {

        if (!audio.duration) {
            return;
        }

        const time =
            (progress.value / 100)
            * audio.duration;

        audio.currentTime = time;

    }
);


/* =====================================================
   SONG ENDED
===================================================== */

audio.addEventListener(
    "ended",
    () => {

        nextSong();

    }
);


/* =====================================================
   FORMAT TIME
===================================================== */

function formatTime(seconds) {

    if (!seconds || isNaN(seconds)) {

        return "00:00";

    }

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return (
        String(minutes).padStart(2, "0")
        + ":" +
        String(remainingSeconds).padStart(2, "0")
    );
}


/* =====================================================
   PLAYLIST
===================================================== */

function updatePlaylist() {

    playlist.innerHTML = "";

    songs.forEach((song, index) => {

        const item =
            document.createElement("div");

        item.className =
            "playlist-item";

        if (index === currentSong) {

            item.classList.add("active");

        }

        item.innerHTML = `
            <span class="playlist-number">
                ${index + 1}.
            </span>

            <span class="playlist-name">
                ${song.title}
            </span>
        `;

        item.addEventListener(
            "click",
            () => {

                loadSong(index);

                playSong();

            }
        );

        playlist.appendChild(item);

    });

}


/* =====================================================
   HEART
===================================================== */

heartBtn.addEventListener(
    "click",
    () => {

        heartBtn.classList.toggle("liked");

        if (
            heartBtn.classList.contains("liked")
        ) {

            heartBtn.textContent = "♥";

        } else {

            heartBtn.textContent = "♡";

        }

    }
);


/* =====================================================
   DAY MODE
===================================================== */

dayBtn.addEventListener(
    "click",
    () => {

        hero.classList.remove("night");

        dayBtn.classList.add("active");

        nightBtn.classList.remove("active");

    }
);


/* =====================================================
   NIGHT MODE
===================================================== */

nightBtn.addEventListener(
    "click",
    () => {

        hero.classList.add("night");

        nightBtn.classList.add("active");

        dayBtn.classList.remove("active");

    }
);


/* =====================================================
   CLOCK
===================================================== */

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

    timeElement.textContent =
        `${hours}:${minutes}:${seconds}`;
}

updateClock();

setInterval(
    updateClock,
    1000
);


/* =====================================================
   SEARCH
===================================================== */

searchBtn.addEventListener(
    "click",
    () => {

        const query =
            searchInput.value
                .trim()
                .toLowerCase();

        if (!query) {
            return;
        }

        const found =
            songs.findIndex(
                song =>
                    song.title
                        .toLowerCase()
                        .includes(query)
            );

        if (found !== -1) {

            loadSong(found);

            playSong();

        } else {

            alert(
                "This song isn't in your playlist yet."
            );

        }

    }
);


/* ENTER KEY SEARCH */

searchInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            searchBtn.click();

        }

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

loadSong(0);
