/* =========================================
   LONG DRIVE WITH HER
   SIMPLE YOUTUBE PLAYER
========================================= */


/* =========================================
   SONGS
========================================= */

const songs = [
    {
        title: "Song 1",
        artist: "YouTube",
        id: "H8r_WqDjWaM"
    },
    {
        title: "Song 2",
        artist: "YouTube",
        id: "PcThvRYtpgQ"
    },
    {
        title: "Song 3",
        artist: "YouTube",
        id: "HhWum37Mg8o"
    }
];


/* =========================================
   VARIABLES
========================================= */

let currentSong = 0;
let youtubePlayer = null;
let playerReady = false;
let progressTimer = null;


/* =========================================
   ELEMENTS
========================================= */

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

const volume =
    document.getElementById("volume");

const songTitle =
    document.getElementById("songTitle");

const songArtist =
    document.getElementById("songArtist");

const playlist =
    document.getElementById("playlist");

const themeToggle =
    document.getElementById("themeToggle");


/* =========================================
   YOUTUBE API
========================================= */

function onYouTubeIframeAPIReady() {

    youtubePlayer = new YT.Player(
        "youtube-player",
        {
            height: "1",
            width: "1",

            videoId: songs[currentSong].id,

            playerVars: {
                autoplay: 0,
                controls: 0,
                rel: 0,
                modestbranding: 1
            },

            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange
            }
        }
    );
}


/* =========================================
   PLAYER READY
========================================= */

function onPlayerReady(event) {

    playerReady = true;

    event.target.setVolume(
        Number(volume.value)
    );

    updateSongInfo();

    renderPlaylist();

    updateTime();

}


/* =========================================
   PLAYER STATE
========================================= */

function onPlayerStateChange(event) {

    if (event.data === YT.PlayerState.PLAYING) {

        playBtn.textContent = "⏸";

        startProgress();

    } else {

        playBtn.textContent = "▶";

        stopProgress();
    }


    if (event.data === YT.PlayerState.ENDED) {

        nextSong();

    }

}


/* =========================================
   PLAY / PAUSE
========================================= */

function togglePlay() {

    if (!playerReady) return;


    const state =
        youtubePlayer.getPlayerState();


    if (state === YT.PlayerState.PLAYING) {

        youtubePlayer.pauseVideo();

    } else {

        youtubePlayer.playVideo();

    }

}


playBtn.addEventListener(
    "click",
    togglePlay
);


/* =========================================
   NEXT
========================================= */

function nextSong() {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong();
}


nextBtn.addEventListener(
    "click",
    nextSong
);


/* =========================================
   PREVIOUS
========================================= */

function previousSong() {

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong();
}


previousBtn.addEventListener(
    "click",
    previousSong
);


/* =========================================
   LOAD SONG
========================================= */

function loadSong() {

    if (!playerReady) return;


    youtubePlayer.loadVideoById(
        songs[currentSong].id
    );


    updateSongInfo();

    renderPlaylist();

}


/* =========================================
   SONG INFORMATION
========================================= */

function updateSongInfo() {

    const song = songs[currentSong];

    songTitle.textContent =
        song.title;

    songArtist.textContent =
        song.artist;

}


/* =========================================
   PLAYLIST
========================================= */

function renderPlaylist() {

    playlist.innerHTML = "";


    songs.forEach(
        (song, index) => {

            const item =
                document.createElement("div");

            item.className =
                "playlist-item";


            if (index === currentSong) {

                item.classList.add("active");

            }


            item.textContent =
                `${index + 1}. ${song.title}`;


            item.addEventListener(
                "click",
                () => {

                    currentSong = index;

                    loadSong();

                }
            );


            playlist.appendChild(item);

        }
    );

}


/* =========================================
   TIME
========================================= */

function updateTime() {

    if (!playerReady) return;


    const current =
        youtubePlayer.getCurrentTime() || 0;

    const total =
        youtubePlayer.getDuration() || 0;


    currentTime.textContent =
        formatTime(current);

    duration.textContent =
        formatTime(total);


    if (total > 0) {

        progress.value =
            (current / total) * 100;

    }

}


/* =========================================
   PROGRESS LOOP
========================================= */

function startProgress() {

    stopProgress();


    progressTimer =
        setInterval(
            updateTime,
            500
        );

}


function stopProgress() {

    if (progressTimer) {

        clearInterval(progressTimer);

        progressTimer = null;

    }

}


/* =========================================
   SEEK
========================================= */

progress.addEventListener(
    "input",
    () => {

        if (!playerReady) return;


        const total =
            youtubePlayer.getDuration();


        if (!total) return;


        const newTime =
            (Number(progress.value) / 100) *
            total;


        youtubePlayer.seekTo(
            newTime,
            true
        );

    }
);


/* =========================================
   VOLUME
========================================= */

volume.addEventListener(
    "input",
    () => {

        if (!playerReady) return;


        youtubePlayer.setVolume(
            Number(volume.value)
        );

    }
);


/* =========================================
   FORMAT TIME
========================================= */

function formatTime(seconds) {

    seconds =
        Math.floor(seconds || 0);


    const minutes =
        Math.floor(seconds / 60);


    const remaining =
        seconds % 60;


    return (
        String(minutes).padStart(2, "0")
        +
        ":"
        +
        String(remaining).padStart(2, "0")
    );

}


/* =========================================
   DAY / NIGHT
========================================= */

themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "night"
        );


        if (
            document.body.classList.contains("night")
        ) {

            themeToggle.textContent =
                "☀ DAY";

        } else {

            themeToggle.textContent =
                "☾ NIGHT";

        }

    }
);


/* =========================================
   SEARCH
========================================= */

const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");


searchBtn.addEventListener(
    "click",
    () => {

        const query =
            searchInput.value.trim();


        if (!query) return;


        /*
         * This old version does not have
         * YouTube Music search API.
         *
         * It simply opens YouTube search.
         */

        window.open(
            "https://www.youtube.com/results?search_query="
            +
            encodeURIComponent(query),

            "_blank"
        );

    }
);


searchInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            searchBtn.click();

        }

    }
);