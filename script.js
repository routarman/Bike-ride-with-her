/* =========================================================
   LONG DRIVE WITH HER
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       BACKEND
       ===================================================== */

    const API_URL = "http://127.0.0.1:5000";


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const timeElement =
        document.getElementById("time") ||
        document.getElementById("live-time");

    const quoteElement =
        document.getElementById("quote") ||
        document.getElementById("love-quote");

    const refreshQuoteButton =
        document.getElementById("refreshQuote") ||
        document.getElementById("refresh-quote");

    const dayNightButton =
        document.getElementById("dayNightToggle") ||
        document.getElementById("themeToggle");

    const playButton =
        document.getElementById("playBtn") ||
        document.getElementById("play");

    const previousButton =
        document.getElementById("prevBtn") ||
        document.getElementById("previousBtn");

    const nextButton =
        document.getElementById("nextBtn") ||
        document.getElementById("next");

    const songTitle =
        document.getElementById("songTitle") ||
        document.getElementById("song-title");

    const songArtist =
        document.getElementById("songArtist") ||
        document.getElementById("song-artist");

    const searchInput =
        document.getElementById("musicSearch") ||
        document.getElementById("searchInput");

    const searchButton =
        document.getElementById("searchBtn") ||
        document.getElementById("searchButton");

    const searchResults =
        document.getElementById("searchResults");


    /* =====================================================
       INDIAN TIME
       ===================================================== */

    function updateIndianTime() {

        if (!timeElement) return;

        const now = new Date();

        const indianTime = new Intl.DateTimeFormat("en-IN", {
            timeZone: "Asia/Kolkata",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        }).format(now);

        timeElement.textContent = indianTime;
    }

    updateIndianTime();

    setInterval(updateIndianTime, 1000);


    /* =====================================================
       DAY / NIGHT MODE
       ===================================================== */

    let nightMode = false;

    function updateTheme() {

        document.body.classList.toggle("night-mode", nightMode);

        if (nightMode) {

            if (dayNightButton) {
                dayNightButton.textContent = "☀️ Day";
            }

        } else {

            if (dayNightButton) {
                dayNightButton.textContent = "🌙 Night";
            }
        }
    }

    if (dayNightButton) {

        dayNightButton.addEventListener("click", () => {

            nightMode = !nightMode;

            updateTheme();
        });
    }


    /* =====================================================
       LOVE QUOTES
       ===================================================== */

    const loveQuotes = [

        "कुछ सफ़र मंज़िल से ज़्यादा खूबसूरत होते हैं।",

        "तुम साथ हो तो हर रास्ता घर जैसा लगता है।",

        "कुछ लोग ज़िंदगी में रास्ते नहीं, यादें बनकर आते हैं।",

        "तेरे साथ बिताया हर पल थोड़ा और खूबसूरत लगता है।",

        "मोहब्बत दूरी नहीं देखती, बस दिल देखती है।",

        "जहाँ तुम हो, वहीं मेरा सुकून है।",

        "कुछ रिश्ते शब्दों से नहीं, एहसासों से लिखे जाते हैं।",

        "तेरी याद भी किसी खूबसूरत सफ़र से कम नहीं।",

        "साथ अगर तुम्हारा हो, तो रास्ते कभी लंबे नहीं लगते।",

        "तुम मिले तो लगा जैसे सफ़र को मंज़िल मिल गई।",

        "दिल को रास्ते नहीं चाहिए, बस तुम्हारा साथ चाहिए।",

        "कभी-कभी एक इंसान ही पूरी दुनिया जैसा लगता है।",

        "तुम्हारे साथ खामोशी भी एक खूबसूरत गीत लगती है।",

        "कुछ सफ़र तस्वीरों में नहीं, दिल में बस जाते हैं।",

        "तुम हो तो हर मौसम थोड़ा बेहतर लगता है।",

        "मेरी पसंदीदा जगह कोई जगह नहीं, तुम्हारे पास होना है।",

        "रास्ते बदल सकते हैं, लेकिन कुछ लोग दिल में नहीं बदलते।",

        "तुम्हारे साथ बिताया हुआ वक्त हमेशा थोड़ा कम लगता है।",

        "इश्क़ शायद यही है—दूरी में भी किसी का पास होना।",

        "एक लंबा सफ़र और तुम... इससे बेहतर क्या चाहिए?"
    ];


    function showRandomQuote() {

        if (!quoteElement) return;

        const randomIndex =
            Math.floor(Math.random() * loveQuotes.length);

        quoteElement.textContent =
            loveQuotes[randomIndex];
    }

    showRandomQuote();

    if (refreshQuoteButton) {

        refreshQuoteButton.addEventListener(
            "click",
            showRandomQuote
        );
    }


    /* =====================================================
       SONG LIST
       ===================================================== */

    const songs = [

        {
            title: "Song 1",
            artist: "YouTube Music",
            id: "H8r_WqDjWaM"
        },

        {
            title: "Song 2",
            artist: "YouTube Music",
            id: "PcThvRYtpgQ"
        },

        {
            title: "Song 3",
            artist: "YouTube Music",
            id: "HhWum37Mg8o"
        }
    ];


    let currentSong = 0;
    let isPlaying = false;


    /* =====================================================
       UPDATE SONG INFORMATION
       ===================================================== */

    function updateSongInfo() {

        const song = songs[currentSong];

        if (!song) return;

        if (songTitle) {
            songTitle.textContent = song.title;
        }

        if (songArtist) {
            songArtist.textContent = song.artist;
        }
    }

    updateSongInfo();


    /* =====================================================
       PLAY / PAUSE UI
       ===================================================== */

    function updatePlayButton() {

        if (!playButton) return;

        if (isPlaying) {
            playButton.textContent = "⏸";
        } else {
            playButton.textContent = "▶";
        }
    }


    /* =====================================================
       PLAY BUTTON
       ===================================================== */

    if (playButton) {

        playButton.addEventListener("click", () => {

            isPlaying = !isPlaying;

            updatePlayButton();

            const song = songs[currentSong];

            console.log(
                isPlaying
                    ? `Playing: ${song.title}`
                    : `Paused: ${song.title}`
            );

        });
    }


    /* =====================================================
       NEXT SONG
       ===================================================== */

    function nextSong() {

        currentSong++;

        if (currentSong >= songs.length) {
            currentSong = 0;
        }

        updateSongInfo();

        isPlaying = true;

        updatePlayButton();

        console.log(
            "Next song:",
            songs[currentSong]
        );
    }

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            nextSong
        );
    }


    /* =====================================================
       PREVIOUS SONG
       ===================================================== */

    function previousSong() {

        currentSong--;

        if (currentSong < 0) {
            currentSong = songs.length - 1;
        }

        updateSongInfo();

        isPlaying = true;

        updatePlayButton();

        console.log(
            "Previous song:",
            songs[currentSong]
        );
    }

    if (previousButton) {

        previousButton.addEventListener(
            "click",
            previousSong
        );
    }


    /* =====================================================
       YOUTUBE MUSIC BACKEND SEARCH
       ===================================================== */

    async function searchMusic(query) {

        if (!query || query.trim() === "") {
            return;
        }

        console.log(
            "Searching YouTube Music:",
            query
        );

        try {

            const response = await fetch(
                `${API_URL}/api/search?q=${encodeURIComponent(query)}`
            );

            if (!response.ok) {

                throw new Error(
                    `Server returned ${response.status}`
                );
            }

            const data = await response.json();

            console.log(
                "YouTube Music results:",
                data
            );

            displaySearchResults(data);

            return data;

        } catch (error) {

            console.error(
                "Backend connection failed:",
                error
            );

            if (searchResults) {

                searchResults.innerHTML = `
                    <p>
                        ❌ Could not connect to music server.
                    </p>
                    <p>
                        Make sure Flask is running on
                        <b>127.0.0.1:5000</b>.
                    </p>
                `;
            }
        }
    }


    /* =====================================================
       DISPLAY SEARCH RESULTS
       ===================================================== */

    function displaySearchResults(data) {

        if (!searchResults) return;

        searchResults.innerHTML = "";

        /*
         * Supports different response formats.
         */

        let results = [];

        if (Array.isArray(data)) {
            results = data;
        }

        else if (Array.isArray(data.results)) {
            results = data.results;
        }

        else if (Array.isArray(data.items)) {
            results = data.items;
        }

        else {

            searchResults.innerHTML = `
                <p>No songs found.</p>
            `;

            return;
        }


        if (results.length === 0) {

            searchResults.innerHTML = `
                <p>No songs found.</p>
            `;

            return;
        }


        results.forEach((item, index) => {

            const result = document.createElement("div");

            result.className = "music-result";


            const title =
                item.title ||
                item.name ||
                "Unknown song";

            const artist =
                item.artist ||
                item.author ||
                item.artists ||
                "Unknown artist";


            result.innerHTML = `
                <div>
                    <strong>${escapeHTML(title)}</strong>
                    <small>${escapeHTML(
                        typeof artist === "string"
                            ? artist
                            : JSON.stringify(artist)
                    )}</small>
                </div>

                <button type="button">
                    ▶
                </button>
            `;


            const button =
                result.querySelector("button");


            button.addEventListener(
                "click",
                () => {

                    console.log(
                        "Selected:",
                        item
                    );

                    if (songTitle) {
                        songTitle.textContent =
                            title;
                    }

                    if (songArtist) {
                        songArtist.textContent =
                            typeof artist === "string"
                                ? artist
                                : "YouTube Music";
                    }

                    isPlaying = true;

                    updatePlayButton();
                }
            );


            searchResults.appendChild(result);
        });
    }


    /* =====================================================
       SEARCH BUTTON
       ===================================================== */

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            () => {

                if (!searchInput) return;

                searchMusic(
                    searchInput.value
                );
            }
        );
    }


    /* =====================================================
       SEARCH WITH ENTER
       ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Enter") {

                    searchMusic(
                        searchInput.value
                    );
                }
            }
        );
    }


    /* =====================================================
       ESCAPE HTML
       ===================================================== */

    function escapeHTML(value) {

        const div =
            document.createElement("div");

        div.textContent =
            String(value);

        return div.innerHTML;
    }


    /* =====================================================
       CHECK BACKEND
       ===================================================== */

    async function checkBackend() {

        try {

            const response =
                await fetch(API_URL);

            if (response.ok) {

                console.log(
                    "✅ Long Drive With Her backend connected."
                );

            } else {

                console.warn(
                    "⚠️ Backend responded with:",
                    response.status
                );
            }

        } catch (error) {

            console.warn(
                "⚠️ Backend is not reachable.",
                "Start: python server.py"
            );
        }
    }

    checkBackend();


    /* =====================================================
       INITIALIZE
       ===================================================== */

    updateTheme();
    updateSongInfo();
    updatePlayButton();

    console.log(
        "❤️ Long Drive With Her loaded."
    );

});