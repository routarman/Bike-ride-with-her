/* =========================================
   LONG DRIVE WITH HER
   COMPLETE JAVASCRIPT
========================================= */


/* =========================================
   LIVE INDIAN TIME
========================================= */

function updateIndianClock() {

    const clock =
        document.getElementById("time");


    if (!clock) {

        return;

    }


    const now = new Date();


    const parts =
        new Intl.DateTimeFormat(
            "en-IN",
            {
                timeZone:
                    "Asia/Kolkata",

                hour:
                    "2-digit",

                minute:
                    "2-digit",

                second:
                    "2-digit",

                hour12:
                    false
            }
        ).formatToParts(now);


    let hours = "00";

    let minutes = "00";

    let seconds = "00";


    parts.forEach(
        function (part) {

            if (
                part.type === "hour"
            ) {

                hours =
                    part.value;

            }


            if (
                part.type === "minute"
            ) {

                minutes =
                    part.value;

            }


            if (
                part.type === "second"
            ) {

                seconds =
                    part.value;

            }

        }
    );


    clock.textContent =
        `${hours}:${minutes}:${seconds}`;

}


updateIndianClock();


setInterval(
    updateIndianClock,
    1000
);


/* =========================================
   DAY / NIGHT
========================================= */

const dayBtn =
    document.getElementById(
        "dayBtn"
    );

const nightBtn =
    document.getElementById(
        "nightBtn"
    );

const backgroundImage =
    document.getElementById(
        "backgroundImage"
    );


let currentMode =
    "day";


function setBackground(
    mode
) {

    if (!backgroundImage) {

        return;

    }


    backgroundImage.style.opacity =
        "0";


    setTimeout(
        function () {


            if (
                mode === "day"
            ) {


                if (
                    window.innerWidth <= 700
                ) {

                    backgroundImage.src =
                        "assets/bike-day-mobile.png";

                } else {

                    backgroundImage.src =
                        "assets/bike-day-desktop.png";

                }


            } else {


                if (
                    window.innerWidth <= 700
                ) {

                    backgroundImage.src =
                        "assets/bike-night-mobile.png";

                } else {

                    backgroundImage.src =
                        "assets/bike-night-desktop.png";

                }

            }


            backgroundImage.onload =
                function () {

                    backgroundImage.style.opacity =
                        "1";

                };


        },
        350
    );

}


/* DAY */

dayBtn.addEventListener(
    "click",
    function () {

        currentMode =
            "day";


        document.body.classList.remove(
            "night"
        );


        dayBtn.classList.add(
            "active"
        );


        nightBtn.classList.remove(
            "active"
        );


        setBackground(
            "day"
        );

    }
);


/* NIGHT */

nightBtn.addEventListener(
    "click",
    function () {

        currentMode =
            "night";


        document.body.classList.add(
            "night"
        );


        nightBtn.classList.add(
            "active"
        );


        dayBtn.classList.remove(
            "active"
        );


        setBackground(
            "night"
        );

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

    "बारिश हो या धूप, रास्ता वही अच्छा है जिस पर तुम साथ चलो।",

    "कुछ रास्ते याद बन जाते हैं, जब उन पर तुम साथ होती हो।",

    "जहाँ रास्ता खत्म हो जाए, वहाँ भी तुम्हारा साथ काफी है।"

];


const quoteElement =
    document.getElementById(
        "quote"
    );


const quoteRefresh =
    document.getElementById(
        "quoteRefresh"
    );


let lastQuote =
    -1;


quoteRefresh.addEventListener(
    "click",
    function () {


        let randomIndex;


        do {

            randomIndex =
                Math.floor(
                    Math.random() *
                    quotes.length
                );


        } while (
            randomIndex ===
            lastQuote
        );


        lastQuote =
            randomIndex;


        quoteElement.style.opacity =
            "0";


        quoteElement.style.transform =
            "translateY(8px)";


        setTimeout(
            function () {


                quoteElement.textContent =
                    `"${quotes[randomIndex]}"`;


                quoteElement.style.opacity =
                    "1";


                quoteElement.style.transform =
                    "translateY(0)";


            },
            250
        );

    }
);


/* =========================================
   YOUTUBE PLAYLIST
========================================= */


/*
    YOUR THREE YOUTUBE VIDEOS

    1:
    H8r_WqDjWaM

    2:
    PcThvRYtpgQ

    3:
    HhWum37Mg8o
*/


const songs = [

    {
        title:
            "Song 1",

        artist:
            "YouTube",

        videoId:
            "H8r_WqDjWaM"

    },


    {
        title:
            "Song 2",

        artist:
            "YouTube",

        videoId:
            "PcThvRYtpgQ"

    },


    {
        title:
            "Taare Ginn",

        artist:
            "Mohit Chauhan & Shreya Ghoshal",

        videoId:
            "HhWum37Mg8o"

    }

];


let currentSong =
    0;


let youtubePlayer =
    null;


/* =========================================
   PLAYER ELEMENTS
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
   YOUTUBE API READY
========================================= */

function onYouTubeIframeAPIReady() {


    youtubePlayer =
        new YT.Player(
            "youtube-player",
            {


                width:
                    "200",


                height:
                    "200",


                videoId:
                    songs[
                        currentSong
                    ].videoId,


                playerVars:
                    {

                        /*
                            Keep YouTube controls
                            available.
                        */

                        controls:
                            1,


                        playsinline:
                            1,


                        rel:
                            0,


                        modestbranding:
                            1

                    },


                events:
                    {

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


    updateSongInformation();


    updateDuration();


}


/* =========================================
   PLAYER STATE
========================================= */

function onPlayerStateChange(
    event
) {


    if (
        event.data ===
        YT.PlayerState.PLAYING
    ) {


        playBtn.textContent =
            "Ⅱ";


    }


    else if (
        event.data ===
        YT.PlayerState.PAUSED
    ) {


        playBtn.textContent =
            "▶";


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


        if (
            !youtubePlayer
        ) {

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
   NEXT SONG
========================================= */

nextBtn.addEventListener(
    "click",
    nextSong
);


function nextSong() {


    if (
        !youtubePlayer
    ) {

        return;

    }


    currentSong++;


    if (
        currentSong >=
        songs.length
    ) {

        currentSong =
            0;

    }


    loadSong(
        currentSong
    );

}


/* =========================================
   PREVIOUS SONG
========================================= */

previousBtn.addEventListener(
    "click",
    previousSong
);


function previousSong() {


    if (
        !youtubePlayer
    ) {

        return;

    }


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

function loadSong(
    index
) {


    if (
        !youtubePlayer
    ) {

        return;

    }


    const song =
        songs[index];


    songTitle.textContent =
        song.title;


    artistName.textContent =
        song.artist;


    progress.value =
        0;


    currentTime.textContent =
        "0:00";


    duration.textContent =
        "0:00";


    youtubePlayer.loadVideoById(
        song.videoId
    );

}


/* =========================================
   SONG INFORMATION
========================================= */

function updateSongInformation() {


    const song =
        songs[currentSong];


    songTitle.textContent =
        song.title;


    artistName.textContent =
        song.artist;

}


/* =========================================
   UPDATE PROGRESS
========================================= */

setInterval(
    function () {


        if (
            !youtubePlayer
        ) {

            return;

        }


        const total =
            youtubePlayer.getDuration();


        const current =
            youtubePlayer.getCurrentTime();


        if (
            !total
        ) {

            return;

        }


        const percentage =
            (
                current /
                total
            ) * 100;


        progress.value =
            percentage;


        currentTime.textContent =
            formatTime(
                current
            );


        duration.textContent =
            formatTime(
                total
            );


    },
    500
);


/* =========================================
   SEEK
========================================= */

progress.addEventListener(
    "input",
    function () {


        if (
            !youtubePlayer
        ) {

            return;

        }


        const total =
            youtubePlayer.getDuration();


        if (
            !total
        ) {

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
   UPDATE DURATION
========================================= */

function updateDuration() {


    if (
        !youtubePlayer
    ) {

        return;

    }


    const total =
        youtubePlayer.getDuration();


    if (
        total
    ) {

        duration.textContent =
            formatTime(
                total
            );

    }

}


/* =========================================
   FORMAT TIME
========================================= */

function formatTime(
    seconds
) {


    if (
        !seconds ||
        isNaN(seconds)
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(
            seconds /
            60
        );


    const remainingSeconds =
        Math.floor(
            seconds %
            60
        );


    return (
        minutes +
        ":" +
        String(
            remainingSeconds
        ).padStart(
            2,
            "0"
        )
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


            if (
                !backgroundImage
            ) {

                return;

            }


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


/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener(
    "keydown",
    function (event) {


        /* SPACE = PLAY / PAUSE */

        if (
            event.code ===
            "Space"
        ) {


            event.preventDefault();


            playBtn.click();

        }


        /* RIGHT = NEXT */

        if (
            event.code ===
            "ArrowRight"
        ) {


            nextBtn.click();

        }


        /* LEFT = PREVIOUS */

        if (
            event.code ===
            "ArrowLeft"
        ) {


            previousBtn.click();

        }

    }
);
