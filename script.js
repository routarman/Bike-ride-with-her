/* =========================================
   LONG DRIVE WITH HER
   CLEAN COMPLETE JS
========================================= */


/* =========================================
   1. LIVE INDIAN TIME
========================================= */

const timeElement = document.getElementById("time");

function updateClock() {

    if (!timeElement) return;

    const now = new Date();

    const time = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    }).format(now);

    timeElement.textContent = time;
}

updateClock();

setInterval(updateClock, 1000);


/* =========================================
   2. DAY / NIGHT
========================================= */

const dayBtn = document.getElementById("dayBtn");
const nightBtn = document.getElementById("nightBtn");
const backgroundImage =
    document.getElementById("backgroundImage");

function setDay() {

    document.body.classList.remove("night");

    if (dayBtn) {
        dayBtn.classList.add("active");
    }

    if (nightBtn) {
        nightBtn.classList.remove("active");
    }

    if (backgroundImage) {

        if (window.innerWidth <= 700) {

            backgroundImage.src =
                "assets/bike-day-mobile.png";

        } else {

            backgroundImage.src =
                "assets/bike-day-desktop.png";

        }
    }
}


function setNight() {

    document.body.classList.add("night");

    if (nightBtn) {
        nightBtn.classList.add("active");
    }

    if (dayBtn) {
        dayBtn.classList.remove("active");
    }

    if (backgroundImage) {

        if (window.innerWidth <= 700) {

            backgroundImage.src =
                "assets/bike-night-mobile.png";

        } else {

            backgroundImage.src =
                "assets/bike-night-desktop.png";

        }
    }
}


if (dayBtn) {
    dayBtn.addEventListener("click", setDay);
}

if (nightBtn) {
    nightBtn.addEventListener("click", setNight);
}


/* =========================================
   3. LOVE QUOTES
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
    document.getElementById("quote");

const quoteRefresh =
    document.getElementById("quoteRefresh");

let lastQuote = -1;


if (quoteRefresh) {

    quoteRefresh.addEventListener("click", function () {

        let random;

        do {

            random =
                Math.floor(
                    Math.random() * quotes.length
                );

        } while (random === lastQuote);

        lastQuote = random;

        if (quoteElement) {

            quoteElement.style.opacity = "0";

            setTimeout(function () {

                quoteElement.textContent =
                    `"${quotes[random]}"`;

                quoteElement.style.opacity = "1";

            }, 250);
        }

    });
}


/* =========================================
   4. YOUTUBE PLAYLIST
========================================= */

const PLAYLIST_ID =
    "PL9bw4S5ePsEGpT9PdWJYN8joMa2eWAxJf";


let youtubePlayer = null;


/* =========================================
   PLAYER ELEMENTS
========================================= */

const playBtn =
    document.getElementById("playBtn");

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

const songTitle =
    document.getElementById("songTitle");

const artistName =
    document.getElementById("artistName");


/* =========================================
   5. YOUTUBE API
========================================= */

function onYouTubeIframeAPIReady() {

    console.log("YouTube API loaded");

    youtubePlayer = new YT.Player(
        "youtube-player",
        {

            width: "200",

            height: "200",

            playerVars: {

                listType: "playlist",

                list: PLAYLIST_ID,

                controls: 1,

                playsinline: 1,

                rel: 0

            },

            events: {

                onReady: function () {

                    console.log(
                        "YouTube player ready"
                    );

                    updateSongInfo();

                    updateProgress();

                },

                onStateChange:
                    handlePlayerState,

                onError:
                    handlePlayerError

            }

        }
    );
}


/* =========================================
   6. PLAY / PAUSE
========================================= */

if (playBtn) {

    playBtn.addEventListener(
        "click",
        function () {

            if (!youtubePlayer) {

                console.log(
                    "Player is not ready"
                );

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
}


/* =========================================
   7. NEXT
========================================= */

if (nextBtn) {

    nextBtn.addEventListener(
        "click",
        function () {

            if (!youtubePlayer) return;

            youtubePlayer.nextVideo();

        }
    );
}


/* =========================================
   8. PREVIOUS
========================================= */

if (previousBtn) {

    previousBtn.addEventListener(
        "click",
        function () {

            if (!youtubePlayer) return;

            youtubePlayer.previousVideo();

        }
    );
}


/* =========================================
   9. PLAYER STATE
========================================= */

function handlePlayerState(event) {

    if (!playBtn) return;


    if (
        event.data ===
        YT.PlayerState.PLAYING
    ) {

        playBtn.textContent = "Ⅱ";

        updateSongInfo();

    } else {

        playBtn.textContent = "▶";

    }
}


/* =========================================
   10. YOUTUBE ERROR
========================================= */

function handlePlayerError(event) {

    console.log(
        "YouTube player error:",
        event.data
    );

}


/* =========================================
   11. SONG INFORMATION
========================================= */

function updateSongInfo() {

    if (!youtubePlayer) return;


    const data =
        youtubePlayer.getVideoData();


    if (!data) return;


    if (songTitle && data.title) {

        songTitle.textContent =
            data.title;

    }


    if (artistName && data.author) {

        artistName.textContent =
            data.author;

    }
}


/* =========================================
   12. PROGRESS BAR
========================================= */

function updateProgress() {

    if (youtubePlayer) {

        const total =
            youtubePlayer.getDuration();

        const current =
            youtubePlayer.getCurrentTime();


        if (total > 0) {

            if (progress) {

                progress.value =
                    (current / total) * 100;

            }


            if (currentTime) {

                currentTime.textContent =
                    formatTime(current);

            }


            if (duration) {

                duration.textContent =
                    formatTime(total);

            }

        }
    }


    setTimeout(
        updateProgress,
        500
    );
}


/* =========================================
   13. SEEK
========================================= */

if (progress) {

    progress.addEventListener(
        "input",
        function () {

            if (!youtubePlayer) return;


            const total =
                youtubePlayer.getDuration();


            if (!total) return;


            const newTime =
                (progress.value / 100) * total;


            youtubePlayer.seekTo(
                newTime,
                true
            );

        }
    );
}


/* =========================================
   14. TIME FORMAT
========================================= */

function formatTime(seconds) {

    if (
        !seconds ||
        isNaN(seconds)
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(seconds / 60);


    const secondsLeft =
        Math.floor(seconds % 60);


    return (
        minutes +
        ":" +
        String(secondsLeft).padStart(2, "0")
    );
}


/* =========================================
   15. KEYBOARD
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.code === "Space"
        ) {

            event.preventDefault();

            if (playBtn) {
                playBtn.click();
            }

        }


        if (
            event.code === "ArrowRight"
        ) {

            if (nextBtn) {
                nextBtn.click();
            }

        }


        if (
            event.code === "ArrowLeft"
        ) {

            if (previousBtn) {
                previousBtn.click();
            }

        }

    }
);