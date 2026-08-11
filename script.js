/* =========================================
   LONG DRIVE WITH HER
   JAVASCRIPT
========================================= */


/* =========================================
   LIVE INDIAN TIME
========================================= */

const timeElement =
    document.getElementById("time");


function updateIndianTime() {

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


updateIndianTime();


setInterval(
    updateIndianTime,
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


function setDay() {

    if (currentMode === "day") {
        return;
    }


    currentMode = "day";


    backgroundImage.style.opacity = "0";


    setTimeout(function () {

        if (window.innerWidth <= 700) {

            backgroundImage.src =
                "assets/bike-day-mobile.png";

        } else {

            backgroundImage.src =
                "assets/bike-day-desktop.png";

        }


        backgroundImage.onload =
            function () {

                backgroundImage.style.opacity = "1";

            };


    }, 400);


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


function setNight() {

    if (currentMode === "night") {
        return;
    }


    currentMode = "night";


    backgroundImage.style.opacity = "0";


    setTimeout(function () {

        if (window.innerWidth <= 700) {

            backgroundImage.src =
                "assets/bike-night-mobile.png";

        } else {

            backgroundImage.src =
                "assets/bike-night-desktop.png";

        }


        backgroundImage.onload =
            function () {

                backgroundImage.style.opacity = "1";

            };


    }, 400);


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


dayBtn.addEventListener(
    "click",
    setDay
);


nightBtn.addEventListener(
    "click",
    setNight
);


/* =========================================
   HANDLE WINDOW RESIZE
========================================= */

window.addEventListener(
    "resize",
    function () {

        if (currentMode === "day") {

            if (window.innerWidth <= 700) {

                backgroundImage.src =
                    "assets/bike-day-mobile.png";

            } else {

                backgroundImage.src =
                    "assets/bike-day-desktop.png";

            }

        } else {

            if (window.innerWidth <= 700) {

                backgroundImage.src =
                    "assets/bike-night-mobile.png";

            } else {

                backgroundImage.src =
                    "assets/bike-night-desktop.png";

            }

        }

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

    "जहाँ रास्ते खत्म होते हैं, वहीं से हमारी यादें शुरू होती हैं।",

    "कुछ सफ़र तस्वीरों में नहीं, दिल में रह जाते हैं।",

    "तेरे साथ बिताया हुआ हर रास्ता, मेरी पसंदीदा कहानी है।",

    "सफ़र कितना लंबा है, इससे फर्क नहीं पड़ता; साथ कौन है, यही मायने रखता है।",

    "पहाड़ खूबसूरत हैं, लेकिन तुम्हारे साथ देखे जाएँ तो और भी।",

    "बारिश हो या धूप, रास्ता वही अच्छा है जिस पर तुम साथ चलो।",

    "काश हर शाम किसी पहाड़ी सड़क पर और तुम मेरे पीछे होती।"

];


const quoteElement =
    document.getElementById("quote");

const quoteRefresh =
    document.getElementById(
        "quoteRefresh"
    );


let previousQuote = -1;


function changeQuote() {

    let randomIndex;


    do {

        randomIndex =
            Math.floor(
                Math.random() *
                quotes.length
            );

    }

    while (
        randomIndex === previousQuote
    );


    previousQuote =
        randomIndex;


    quoteElement.style.opacity = "0";

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
        300
    );

}


quoteRefresh.addEventListener(
    "click",
    changeQuote
);


/* =========================================
   MUSIC PLAYER
========================================= */

const audio =
    document.getElementById("audio");

const playBtn =
    document.getElementById("playBtn");

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

const currentTimeElement =
    document.getElementById(
        "currentTime"
    );

const durationElement =
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


/*
    ADD YOUR SONGS HERE.

    Put MP3 files inside:

    assets/music/

*/


const songs = [

    {
        title: "Long Drive",
        artist: "Cinesutrachitra",
        file: "assets/music/song.mp3"
    }

    /*
    Add more songs like this:

    ,
    {
        title: "Another Song",
        artist: "Artist Name",
        file: "assets/music/song2.mp3"
    }

    */

];


let currentSong = 0;


/* =========================================
   LOAD SONG
========================================= */

function loadSong(index) {

    if (!songs.length) {
        return;
    }


    const song =
        songs[index];


    songTitle.textContent =
        song.title;


    artistName.textContent =
        song.artist;


    audio.src =
        song.file;


    progress.value = 0;


    currentTimeElement.textContent =
        "0:00";


    durationElement.textContent =
        "0:00";

}


loadSong(currentSong);


/* =========================================
   PLAY / PAUSE
========================================= */

function togglePlay() {

    if (!audio.src) {
        return;
    }


    if (audio.paused) {

        audio.play()

            .then(function () {

                playBtn.textContent =
                    "Ⅱ";

            })

            .catch(function () {

                console.log(
                    "Browser blocked audio."
                );

            });

    } else {

        audio.pause();

        playBtn.textContent =
            "▶";

    }

}


playBtn.addEventListener(
    "click",
    togglePlay
);


/* =========================================
   AUDIO PLAY
========================================= */

audio.addEventListener(
    "play",
    function () {

        playBtn.textContent =
            "Ⅱ";

    }
);


/* =========================================
   AUDIO PAUSE
========================================= */

audio.addEventListener(
    "pause",
    function () {

        playBtn.textContent =
            "▶";

    }
);


/* =========================================
   AUDIO METADATA
========================================= */

audio.addEventListener(
    "loadedmetadata",
    function () {

        durationElement.textContent =
            formatTime(
                audio.duration
            );

    }
);


/* =========================================
   UPDATE PROGRESS
========================================= */

audio.addEventListener(
    "timeupdate",
    function () {

        if (!audio.duration) {
            return;
        }


        const percentage =
            (
                audio.currentTime /
                audio.duration
            ) * 100;


        progress.value =
            percentage;


        currentTimeElement.textContent =
            formatTime(
                audio.currentTime
            );

    }
);


/* =========================================
   SEEK
========================================= */

progress.addEventListener(
    "input",
    function () {

        if (!audio.duration) {
            return;
        }


        audio.currentTime =
            (
                progress.value / 100
            ) *
            audio.duration;

    }
);


/* =========================================
   NEXT SONG
========================================= */

function nextSong() {

    if (!songs.length) {
        return;
    }


    currentSong++;

    if (
        currentSong >=
        songs.length
    ) {

        currentSong = 0;

    }


    loadSong(currentSong);

    audio.play()

        .catch(function () {

            console.log(
                "Press play to start music."
            );

        });

}


nextBtn.addEventListener(
    "click",
    nextSong
);


/* =========================================
   PREVIOUS SONG
========================================= */

function previousSong() {

    if (!songs.length) {
        return;
    }


    currentSong--;

    if (currentSong < 0) {

        currentSong =
            songs.length - 1;

    }


    loadSong(currentSong);

    audio.play()

        .catch(function () {

            console.log(
                "Press play to start music."
            );

        });

}


previousBtn.addEventListener(
    "click",
    previousSong
);


/* =========================================
   AUTO NEXT
========================================= */

audio.addEventListener(
    "ended",
    nextSong
);


/* =========================================
   TIME FORMAT
========================================= */

function formatTime(seconds) {

    if (
        isNaN(seconds) ||
        !isFinite(seconds)
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    const remainingSeconds =
        Math.floor(
            seconds % 60
        );


    return (
        minutes +
        ":" +
        String(
            remainingSeconds
        ).padStart(2, "0")
    );

}


/* =========================================
   MOUSE PARALLAX
========================================= */

const background =
    document.querySelector(
        ".background"
    );


if (window.innerWidth > 700) {

    document.addEventListener(
        "mousemove",
        function (event) {

            const x =
                (
                    event.clientX /
                    window.innerWidth -
                    0.5
                ) * 8;


            const y =
                (
                    event.clientY /
                    window.innerHeight -
                    0.5
                ) * 5;


            backgroundImage.style.transform =
                `scale(1.05) translate(${x}px, ${y}px)`;

        }
    );

}


/* =========================================
   SLOW BACKGROUND MOVEMENT
========================================= */

let direction = 1;


setInterval(
    function () {

        if (
            !backgroundImage
        ) {
            return;
        }


        if (
            !backgroundImage.matches(":hover")
        ) {

            backgroundImage.style.transform =
                direction === 1
                    ? "scale(1.055)"
                    : "scale(1.04)";


            direction *= -1;

        }

    },
    8000
);