/* =========================================
   LONG DRIVE WITH HER
========================================= */


/* =========================================
   LIVE INDIAN TIME
========================================= */

const timeElement =
    document.getElementById("time");


function updateTime() {

    const now = new Date();


    const indianTime =
        new Intl.DateTimeFormat(
            "en-IN",
            {
                timeZone: "Asia/Kolkata",

                hour: "2-digit",

                minute: "2-digit",

                second: "2-digit",

                hour12: false
            }
        ).format(now);


    timeElement.textContent =
        indianTime;

}


updateTime();

setInterval(
    updateTime,
    1000
);


/* =========================================
   DAY / NIGHT
========================================= */

const dayBtn =
    document.getElementById("dayBtn");

const nightBtn =
    document.getElementById("nightBtn");

const backgroundImage =
    document.getElementById(
        "backgroundImage"
    );


let currentMode = "day";


dayBtn.addEventListener(
    "click",
    function () {

        currentMode = "day";

        document.body.classList.remove(
            "night"
        );

        dayBtn.classList.add(
            "active"
        );

        nightBtn.classList.remove(
            "active"
        );


        backgroundImage.style.opacity = "0";


        setTimeout(function () {

            if (
                window.innerWidth <= 700
            ) {

                backgroundImage.src =
                    "assets/bike-day-mobile.png";

            } else {

                backgroundImage.src =
                    "assets/bike-day-desktop.png";

            }


            backgroundImage.onload =
                function () {

                    backgroundImage.style.opacity =
                        "1";

                };

        }, 400);

    }
);


nightBtn.addEventListener(
    "click",
    function () {

        currentMode = "night";

        document.body.classList.add(
            "night"
        );

        nightBtn.classList.add(
            "active"
        );

        dayBtn.classList.remove(
            "active"
        );


        backgroundImage.style.opacity = "0";


        setTimeout(function () {

            if (
                window.innerWidth <= 700
            ) {

                backgroundImage.src =
                    "assets/bike-night-mobile.png";

            } else {

                backgroundImage.src =
                    "assets/bike-night-desktop.png";

            }


            backgroundImage.onload =
                function () {

                    backgroundImage.style.opacity =
                        "1";

                };

        }, 400);

    }
);


/* =========================================
   HINDI QUOTES
========================================= */

const quotes = [

    "कुछ रास्ते मंज़िल के लिए नहीं, किसी के साथ चलने के लिए होते हैं।",

    "तेरे साथ चलूँ तो हर रास्ता थोड़ा खूबसूरत लगता है।",

    "मंज़िल से ज़्यादा खूबसूरत वो सफ़र है, जिसमें तुम साथ हो।",

    "कभी-कभी खो जाना भी अच्छा है, अगर साथ तुम हो।",

    "लंबी सड़कें, शांत रातें और तुम्हारा साथ — बस इतना ही काफी है।",

    "कुछ सफ़र तस्वीरों में नहीं, दिल में रह जाते हैं।",

    "तेरे साथ बिताया हर रास्ता मेरी पसंदीदा कहानी है।",

    "सफ़र कितना लंबा है, इससे फर्क नहीं पड़ता; साथ कौन है, यही मायने रखता है।",

    "पहाड़ खूबसूरत हैं, लेकिन तुम्हारे साथ देखे जाएँ तो और भी।",

    "बारिश हो या धूप, रास्ता वही अच्छा है जिस पर तुम साथ चलो।"

];


const quote =
    document.getElementById(
        "quote"
    );

const quoteRefresh =
    document.getElementById(
        "quoteRefresh"
    );


let lastQuote = -1;


quoteRefresh.addEventListener(
    "click",
    function () {

        let random;


        do {

            random =
                Math.floor(
                    Math.random() *
                    quotes.length
                );

        } while (
            random === lastQuote
        );


        lastQuote = random;


        quote.style.opacity = "0";


        setTimeout(
            function () {

                quote.textContent =
                    `"${quotes[random]}"`;

                quote.style.opacity =
                    "1";

            },
            250
        );

    }
);


/* =========================================
   YOUTUBE MUSIC PLAYER
========================================= */


/*
    PUT YOUR YOUTUBE VIDEO IDs HERE.

    Example YouTube URL:

    https://www.youtube.com/watch?v=ABC123XYZ

    Video ID:

    ABC123XYZ
*/


const songs = [

    {
        title: "Long Drive",
        artist: "Artist Name",
        videoId: "VIDEO_ID_1"
    },

    {
        title: "Mountain Roads",
        artist: "Artist Name",
        videoId: "VIDEO_ID_2"
    },

    {
        title: "Safar",
        artist: "Artist Name",
        videoId: "VIDEO_ID_3"
    }

];


let currentSong = 0;

let youtubePlayer = null;


/* =========================================
   ELEMENTS
========================================= */

const playBtn =
    document.getElementById(
        "playBtn"
    );

const previousBtn =
    document.getElementById(
        "previousBtn"
    );

const nextBtn =
    document.getElementById(
        "nextBtn"
    );

const progress =
    document.getElementById(
        "progress"
    );

const currentTime =
    document.getElementById(
        "currentTime"
    );

const duration =
    document.getElementById(
        "duration"
    );

const songTitle =
    document.getElementById(
        "songTitle"
    );

const artistName =
    document.getElementById(
        "artistName"
    );


/* =========================================
   YOUTUBE API
========================================= */

function onYouTubeIframeAPIReady() {

    youtubePlayer =
        new YT.Player(
            "youtube-player",
            {

                width: "200",

                height: "200",

                videoId:
                    songs[
                        currentSong
                    ].videoId,

                playerVars: {

                    controls: 1,

                    playsinline: 1,

                    rel: 0

                },

                events: {

                    onReady:
                        onPlayerReady,

                    onStateChange:
                        onPlayerStateChange

                }

            }
        );

}


/* =========================================
   PLAYER READY
========================================= */

function onPlayerReady() {

    updateSongInfo();

    updateDuration();

}


/* =========================================
   STATE CHANGE
========================================= */

function onPlayerStateChange(
    event
) {

    if (
        event.data ===
        YT.PlayerState.PLAYING
    ) {

        playBtn.textContent = "Ⅱ";

    }


    else if (
        event.data ===
        YT.PlayerState.PAUSED
    ) {

        playBtn.textContent = "▶";

    }


    else if (
        event.data ===
        YT.PlayerState.ENDED
    ) {

        nextSong();

    }

}


/* =========================================
   PLAY / PAUSE
========================================= */

playBtn.addEventListener(
    "click",
    function () {

        if (!youtubePlayer) {
            return;
        }


        const state =
            youtubePlayer.getPlayerState();


        if (
            state ===
            YT.PlayerState.PLAYING
        ) {

            youtubePlayer.pauseVideo();

        } else {

            youtubePlayer.playVideo();

        }

    }
);


/* =========================================
   NEXT
========================================= */

nextBtn.addEventListener(
    "click",
    nextSong
);


function nextSong() {

    currentSong++;

    if (
        currentSong >=
        songs.length
    ) {

        currentSong = 0;

    }


    loadSong(
        currentSong
    );

}


/* =========================================
   PREVIOUS
========================================= */

previousBtn.addEventListener(
    "click",
    previousSong
);


function previousSong() {

    currentSong--;

    if (
        currentSong < 0
    ) {

        currentSong =
            songs.length - 1;

    }


    loadSong(
        currentSong
    );

}


/* =========================================
   LOAD SONG
========================================= */

function loadSong(index) {

    if (!youtubePlayer) {
        return;
    }


    const song =
        songs[index];


    songTitle.textContent =
        song.title;


    artistName.textContent =
        song.artist;


    progress.value = 0;


    currentTime.textContent =
        "0:00";


    duration.textContent =
        "0:00";


    youtubePlayer.loadVideoById(
        song.videoId
    );

}


/* =========================================
   SONG INFO
========================================= */

const songs = [

    {
        title: "Song 1",
        artist: "YouTube",
        videoId: "H8r_WqDjWaM"
    },

    {
        title: "Song 2",
        artist: "YouTube",
        videoId: "PcThvRYtpgQ"
    },

    {
        title: "Song 3",
        artist: "YouTube",
        videoId: "HhWum37Mg8o"
    }

];


/* =========================================
   PROGRESS UPDATE
========================================= */

setInterval(
    function () {

        if (!youtubePlayer) {
            return;
        }


        const total =
            youtubePlayer.getDuration();


        const current =
            youtubePlayer.getCurrentTime();


        if (!total) {
            return;
        }


        progress.value =
            (
                current /
                total
            ) * 100;


        currentTime.textContent =
            formatTime(current);


        duration.textContent =
            formatTime(total);

    },
    500
);


/* =========================================
   SEEK
========================================= */

progress.addEventListener(
    "input",
    function () {

        if (!youtubePlayer) {
            return;
        }


        const total =
            youtubePlayer.getDuration();


        if (!total) {
            return;
        }


        const newTime =
            (
                progress.value /
                100
            ) * total;


        youtubePlayer.seekTo(
            newTime,
            true
        );

    }
);


/* =========================================
   FORMAT TIME
========================================= */

function formatTime(seconds) {

    if (
        !seconds ||
        isNaN(seconds)
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    const secondsLeft =
        Math.floor(
            seconds % 60
        );


    return (
        minutes +
        ":" +
        String(
            secondsLeft
        ).padStart(2, "0")
    );

}


/* =========================================
   MOUSE PARALLAX
========================================= */

if (
    window.innerWidth > 700
) {

    document.addEventListener(
        "mousemove",
        function (event) {

            const x =
                (
                    event.clientX /
                    window.innerWidth -
                    0.5
                ) * 5;


            const y =
                (
                    event.clientY /
                    window.innerHeight -
                    0.5
                ) * 3;


            backgroundImage.style.transform =
                `scale(1.045) translate(${x}px, ${y}px)`;

        }
    );

}