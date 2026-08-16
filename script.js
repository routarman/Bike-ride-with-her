/* =========================================================
   LONG DRIVE WITH HER
   MUSIC PLAYER + DAY/NIGHT + CLOCK
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const page = document.querySelector(".page");

const clock = document.getElementById("clock");

const dayBtn = document.getElementById("dayBtn");
const nightBtn = document.getElementById("nightBtn");

const audioPlayer = document.getElementById("audioPlayer");

const playBtn = document.getElementById("playBtn");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

const progressBar = document.getElementById("progressBar");

const currentTimeElement =
    document.getElementById("currentTime");

const durationElement =
    document.getElementById("duration");

const songTitle =
    document.getElementById("songTitle");

const songArtist =
    document.getElementById("songArtist");

const songCover =
    document.getElementById("songCover");

const favoriteBtn =
    document.getElementById("favoriteBtn");

const playlistItems =
    document.getElementById("playlistItems");

const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");


/* =========================================================
   PLAYLIST
   ========================================================= */

/*
   IMPORTANT:

   Put your MP3 files inside:

   assets/music/

   Example:

   assets/
   ├── bike-day-desktop.png
   ├── bike-day-mobile.png
   ├── bike-night-desktop.png
   ├── bike-night-mobile.png
   ├── song1.jpg
   ├── song2.jpg
   └── music/
       ├── song1.mp3
       └── song2.mp3
*/

const songs = [

    {
        title: "Safarnama",
        artist: "Lucky Ali",
        cover: "assets/song1.jpg",
        file: "assets/music/song1.mp3"
    },

    {
        title: "Song 2",
        artist: "Your Artist",
        cover: "assets/song2.jpg",
        file: "assets/music/song2.mp3"
    },

    {
        title: "Song 3",
        artist: "Your Artist",
        cover: "assets/song3.jpg",
        file: "assets/music/song3.mp3"
    }

];


/* =========================================================
   PLAYER STATE
   ========================================================= */

let currentSongIndex = 0;

let isPlaying = false;

let isFavorite = false;


/* =========================================================
   CLOCK
   ========================================================= */

function updateClock() {

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    clock.textContent =
        `${hours}:${minutes}:${seconds}`;
}


/* Update clock immediately */

updateClock();


/* Update every second */

setInterval(updateClock, 1000);


/* =========================================================
   LOAD SONG
   ========================================================= */

function loadSong(index) {

    if (songs.length === 0) {
        return;
    }

    currentSongIndex = index;

    const song = songs[currentSongIndex];

    songTitle.textContent = song.title;

    songArtist.textContent = song.artist;

    songCover.src = song.cover;

    audioPlayer.src = song.file;

    audioPlayer.load();

    progressBar.value = 0;

    currentTimeElement.textContent = "00:00";

    durationElement.textContent = "00:00";

    updatePlaylist();

}


/* =========================================================
   PLAY SONG
   ========================================================= */

function playSong() {

    audioPlayer.play()
        .then(() => {

            isPlaying = true;

            playBtn.textContent = "Ⅱ";

        })
        .catch(error => {

            console.log(
                "Audio could not be played:",
                error
            );

        });

}


/* =========================================================
   PAUSE SONG
   ========================================================= */

function pauseSong() {

    audioPlayer.pause();

    isPlaying = false;

    playBtn.textContent = "▶";

}


/* =========================================================
   PLAY / PAUSE BUTTON
   ========================================================= */

playBtn.addEventListener(
    "click",
    () => {

        if (isPlaying) {

            pauseSong();

        } else {

            playSong();

        }

    }
);


/* =========================================================
   NEXT SONG
   ========================================================= */

function nextSong() {

    currentSongIndex++;

    if (currentSongIndex >= songs.length) {

        currentSongIndex = 0;

    }

    loadSong(currentSongIndex);

    playSong();

}


/* =========================================================
   PREVIOUS SONG
   ========================================================= */

function previousSong() {

    currentSongIndex--;

    if (currentSongIndex < 0) {

        currentSongIndex = songs.length - 1;

    }

    loadSong(currentSongIndex);

    playSong();

}


/* Buttons */

nextBtn.addEventListener(
    "click",
    nextSong
);

previousBtn.addEventListener(
    "click",
    previousSong
);


/* =========================================================
   AUTO NEXT SONG
   ========================================================= */

audioPlayer.addEventListener(
    "ended",
    () => {

        nextSong();

    }
);


/* =========================================================
   AUDIO TIME UPDATE
   ========================================================= */

audioPlayer.addEventListener(
    "timeupdate",
    () => {

        if (!audioPlayer.duration) {
            return;
        }

        const percentage =
            (audioPlayer.currentTime /
            audioPlayer.duration) * 100;

        progressBar.value = percentage;

        currentTimeElement.textContent =
            formatTime(audioPlayer.currentTime);

    }
);


/* =========================================================
   AUDIO LOADED
   ========================================================= */

audioPlayer.addEventListener(
    "loadedmetadata",
    () => {

        durationElement.textContent =
            formatTime(audioPlayer.duration);

    }
);


/* =========================================================
   PROGRESS BAR
   ========================================================= */

progressBar.addEventListener(
    "input",
    () => {

        if (!audioPlayer.duration) {
            return;
        }

        const newTime =
            (progressBar.value / 100) *
            audioPlayer.duration;

        audioPlayer.currentTime = newTime;

    }
);


/* =========================================================
   FORMAT TIME
   ========================================================= */

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


/* =========================================================
   PLAYLIST
   ========================================================= */

function updatePlaylist() {

    playlistItems.innerHTML = "";

    songs.forEach(
        (song, index) => {

            const item =
                document.createElement("div");

            item.className =
                "playlist-item";

            if (index === currentSongIndex) {

                item.classList.add("active");

            }


            const number =
                document.createElement("div");

            number.className =
                "playlist-number";

            number.textContent =
                `${index + 1}.`;


            const name =
                document.createElement("div");

            name.className =
                "playlist-name";

            name.textContent =
                song.title;


            item.appendChild(number);

            item.appendChild(name);


            item.addEventListener(
                "click",
                () => {

                    loadSong(index);

                    playSong();

                }
            );


            playlistItems.appendChild(item);

        }
    );

}


/* =========================================================
   SEARCH
   ========================================================= */

function searchSongs() {

    const query =
        searchInput.value
            .trim()
            .toLowerCase();


    if (!query) {

        updatePlaylist();

        return;

    }


    playlistItems.innerHTML = "";


    const results =
        songs.filter(
            song =>
                song.title
                    .toLowerCase()
                    .includes(query)
                ||
                song.artist
                    .toLowerCase()
                    .includes(query)
        );


    if (results.length === 0) {

        const noResult =
            document.createElement("div");

        noResult.className =
            "playlist-item";

        noResult.textContent =
            "No songs found";

        playlistItems.appendChild(
            noResult
        );

        return;

    }


    results.forEach(
        song => {

            const originalIndex =
                songs.indexOf(song);


            const item =
                document.createElement("div");

            item.className =
                "playlist-item";


            const name =
                document.createElement("div");

            name.className =
                "playlist-name";

            name.textContent =
                `${song.title} — ${song.artist}`;


            item.appendChild(name);


            item.addEventListener(
                "click",
                () => {

                    loadSong(originalIndex);

                    playSong();

                }
            );


            playlistItems.appendChild(item);

        }
    );

}


/* Search button */

searchBtn.addEventListener(
    "click",
    searchSongs
);


/* Search using Enter */

searchInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            searchSongs();

        }

    }
);


/* =========================================================
   FAVORITE
   ========================================================= */

favoriteBtn.addEventListener(
    "click",
    () => {

        isFavorite = !isFavorite;

        if (isFavorite) {

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
    () => {

        document.body.classList.remove(
            "night"
        );

        dayBtn.classList.add("active");

        nightBtn.classList.remove("active");

    }
);


/* =========================================================
   NIGHT MODE
   ========================================================= */

nightBtn.addEventListener(
    "click",
    () => {

        document.body.classList.add(
            "night"
        );

        nightBtn.classList.add("active");

        dayBtn.classList.remove("active");

    }
);


/* =========================================================
   KEYBOARD CONTROLS
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
           Space = play/pause
        */

        if (
            event.code === "Space"
            &&
            event.target.tagName !== "INPUT"
        ) {

            event.preventDefault();

            if (isPlaying) {

                pauseSong();

            } else {

                playSong();

            }

        }


        /*
           Arrow Right = next
        */

        if (event.code === "ArrowRight") {

            nextSong();

        }


        /*
           Arrow Left = previous
        */

        if (event.code === "ArrowLeft") {

            previousSong();

        }

    }
);


/* =========================================================
   START
   ========================================================= */

loadSong(0);
