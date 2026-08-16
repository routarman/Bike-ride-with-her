/* =========================================================
   LONG DRIVE WITH HER
   SCRIPT.JS
   ========================================================= */


/* =========================================================
   SONG PLAYLIST
   ========================================================= */

const songs = [
    {
        name: "Safarnama",
        artist: "Lucky Ali",
        cover: "assets/song1.jpg",
        audio: "audio/song1.mp3"
    },

    {
        name: "Song 2",
        artist: "Artist",
        cover: "assets/song2.jpg",
        audio: "audio/song2.mp3"
    },

    {
        name: "Song 3",
        artist: "Artist",
        cover: "assets/song3.jpg",
        audio: "audio/song3.mp3"
    }
];


/* =========================================================
   ELEMENTS
   ========================================================= */

const audioPlayer =
    document.getElementById("audioPlayer");

const playBtn =
    document.getElementById("playBtn");

const previousBtn =
    document.getElementById("previousBtn");

const nextBtn =
    document.getElementById("nextBtn");

const progressBar =
    document.getElementById("progressBar");

const progress =
    document.getElementById("progress");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");

const songName =
    document.getElementById("songName");

const artistName =
    document.getElementById("artistName");

const songCover =
    document.getElementById("songCover");

const favoriteBtn =
    document.getElementById("favoriteBtn");

const clockTime =
    document.getElementById("clockTime");

const dayBtn =
    document.getElementById("dayBtn");

const nightBtn =
    document.getElementById("nightBtn");


/* =========================================================
   CURRENT SONG
   ========================================================= */

let currentSongIndex = 0;


/* =========================================================
   LOAD SONG
   ========================================================= */

function loadSong(index) {

    const song = songs[index];

    songName.textContent = song.name;

    artistName.textContent = song.artist;

    songCover.src = song.cover;

    audioPlayer.src = song.audio;

    audioPlayer.load();

    progress.style.width = "0%";

    currentTime.textContent = "00:00";

    duration.textContent = "00:00";

    playBtn.textContent = "▶";
}


/* =========================================================
   PLAY SONG
   ========================================================= */

function playSong() {

    audioPlayer.play()
        .then(() => {

            playBtn.textContent = "Ⅱ";

        })
        .catch(() => {

            console.log(
                "Audio could not be played."
            );

        });
}


/* =========================================================
   PAUSE SONG
   ========================================================= */

function pauseSong() {

    audioPlayer.pause();

    playBtn.textContent = "▶";
}


/* =========================================================
   PLAY / PAUSE
   ========================================================= */

playBtn.addEventListener(
    "click",
    function () {

        if (audioPlayer.paused) {

            playSong();

        } else {

            pauseSong();

        }

    }
);


/* =========================================================
   NEXT SONG
   ========================================================= */

nextBtn.addEventListener(
    "click",
    function () {

        currentSongIndex++;

        if (
            currentSongIndex >= songs.length
        ) {
            currentSongIndex = 0;
        }

        loadSong(currentSongIndex);

        playSong();

    }
);


/* =========================================================
   PREVIOUS SONG
   ========================================================= */

previousBtn.addEventListener(
    "click",
    function () {

        currentSongIndex--;

        if (
            currentSongIndex < 0
        ) {
            currentSongIndex =
                songs.length - 1;
        }

        loadSong(currentSongIndex);

        playSong();

    }
);


/* =========================================================
   AUDIO TIME UPDATE
   ========================================================= */

audioPlayer.addEventListener(
    "timeupdate",
    function () {

        if (!audioPlayer.duration) {
            return;
        }

        const percentage =
            (
                audioPlayer.currentTime /
                audioPlayer.duration
            ) * 100;

        progress.style.width =
            percentage + "%";


        currentTime.textContent =
            formatTime(
                audioPlayer.currentTime
            );

    }
);


/* =========================================================
   AUDIO METADATA
   ========================================================= */

audioPlayer.addEventListener(
    "loadedmetadata",
    function () {

        duration.textContent =
            formatTime(
                audioPlayer.duration
            );

    }
);


/* =========================================================
   AUDIO ENDED
   ========================================================= */

audioPlayer.addEventListener(
    "ended",
    function () {

        currentSongIndex++;

        if (
            currentSongIndex >= songs.length
        ) {
            currentSongIndex = 0;
        }

        loadSong(currentSongIndex);

        playSong();

    }
);


/* =========================================================
   PROGRESS BAR CLICK
   ========================================================= */

progressBar.addEventListener(
    "click",
    function (event) {

        if (!audioPlayer.duration) {
            return;
        }

        const rect =
            progressBar.getBoundingClientRect();

        const clickPosition =
            event.clientX - rect.left;

        const percentage =
            clickPosition / rect.width;

        audioPlayer.currentTime =
            percentage *
            audioPlayer.duration;

    }
);


/* =========================================================
   FORMAT TIME
   ========================================================= */

function formatTime(seconds) {

    if (
        isNaN(seconds) ||
        !isFinite(seconds)
    ) {
        return "00:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return (
        String(minutes).padStart(2, "0")
        +
        ":"
        +
        String(
            remainingSeconds
        ).padStart(2, "0")
    );
}


/* =========================================================
   FAVORITE BUTTON
   ========================================================= */

favoriteBtn.addEventListener(
    "click",
    function () {

        favoriteBtn.classList.toggle(
            "active"
        );

        if (
            favoriteBtn.classList.contains(
                "active"
            )
        ) {

            favoriteBtn.textContent = "♥";

        } else {

            favoriteBtn.textContent = "♡";

        }

    }
);


/* =========================================================
   DAY MODE
   ========================================================= */

dayBtn.addEventListener(
    "click",
    function () {

        document.body.classList.remove(
            "night"
        );

        dayBtn.classList.add(
            "active"
        );

        nightBtn.classList.remove(
            "active"
        );

    }
);


/* =========================================================
   NIGHT MODE
   ========================================================= */

nightBtn.addEventListener(
    "click",
    function () {

        document.body.classList.add(
            "night"
        );

        nightBtn.classList.add(
            "active"
        );

        dayBtn.classList.remove(
            "active"
        );

    }
);


/* =========================================================
   CLOCK
   ========================================================= */

function updateClock() {

    const now = new Date();

    const hours =
        String(
            now.getHours()
        ).padStart(2, "0");

    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");

    const seconds =
        String(
            now.getSeconds()
        ).padStart(2, "0");


    clockTime.textContent =
        `${hours}:${minutes}:${seconds}`;

}


/* =========================================================
   START CLOCK
   ========================================================= */

updateClock();

setInterval(
    updateClock,
    1000
);


/* =========================================================
   LOAD FIRST SONG
   ========================================================= */

loadSong(currentSongIndex);
