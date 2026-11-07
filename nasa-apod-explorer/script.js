// 1. NASA API CONFIGURATION
// Insert your newly regenerated NASA API key here.
const API_KEY = "Your_NASA_API_Key";
const API_URL =
"https://science.nasa.gov/wp-json/wp/v2/apod-basic/";
const STORAGE_KEY = "nasaApodSearches";

// 2. GET HTML ELEMENTS
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const imageContainer = document.getElementById("current-image-container");
const searchHistory = document.getElementById("search-history");
const historyCount = document.getElementById("history-count");
const emptyHistory = document.getElementById("empty-history");
const clearHistoryButton = document.getElementById("clear-history");
const searchButton = document.getElementById("search-button");

// 3. GET CURRENT DATE ACCORDING TO NASA'S TIMEZONE
function getNasaCurrentDate() {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).formatToParts(new Date());

    const values = Object.fromEntries(
        parts.map(part => [part.type, part.value])
    );

    return `${values.year}-${values.month}-${values.day}`;
}

const currentDate = getNasaCurrentDate();

searchInput.max = currentDate;
searchInput.min = "1995-06-16";
searchInput.value = currentDate;


// 4. GET SAVED SEARCHES FROM LOCAL STORAGE
function getSavedSearches() {
    try {
        const saved = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || "[]"
        );

        return Array.isArray(saved)
            ? saved.filter(date => typeof date === "string")
            : [];

    } catch (error) {
        console.error("Local storage error:", error);
        return [];
    }
}


// 5. SAVE SEARCH DATE IN LOCAL STORAGE
function saveSearch(date) {
    const searches = getSavedSearches()
        .filter(savedDate => savedDate !== date);

    searches.unshift(date);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(searches)
    );
}


// 6. DISPLAY SEARCH HISTORY
function addSearchToHistory() {
    const searches = getSavedSearches();

    searchHistory.replaceChildren();

    historyCount.textContent = searches.length;

    emptyHistory.hidden = searches.length > 0;

    clearHistoryButton.style.display =
        searches.length ? "block" : "none";

    searches.forEach(date => {
        const item = document.createElement("li");

        const button = document.createElement("button");

        button.type = "button";
        button.className = "history-item";
        button.dataset.date = date;

        const dateText = document.createElement("span");
        dateText.textContent = formatDate(date);

        const arrow = document.createElement("span");
        arrow.textContent = "→";

        button.append(dateText, arrow);
        item.appendChild(button);

        searchHistory.appendChild(item);
    });
}


// 7. FORMAT DATE
function formatDate(date) {
    return new Date(date + "T12:00:00").toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );
}


// 8. SHOW LOADING MESSAGE
function showLoading(message = "Connecting to the universe...") {
    imageContainer.replaceChildren();

    const state = document.createElement("div");
    state.className = "loading-state";

    const loader = document.createElement("span");
    loader.className = "loader";

    const text = document.createElement("p");
    text.textContent = message;

    state.append(loader, text);

    imageContainer.appendChild(state);
}


// 9. SHOW ERROR MESSAGE
function showError(message) {
    imageContainer.replaceChildren();

    const state = document.createElement("div");
    state.className = "error-state";

    const heading = document.createElement("strong");
    heading.textContent = "Unable to load this space image";

    const detail = document.createElement("p");
    detail.textContent = message;

    state.append(heading, detail);

    imageContainer.appendChild(state);
}


// 10. DISPLAY NASA IMAGE OR VIDEO
function displayImageOfTheDay(data) {

    imageContainer.replaceChildren();

    // HANDLE IMAGE
    if (data.media_type === "image") {

        const image = document.createElement("img");

        image.className = "apod-image";
        image.alt = data.alt || data.title || "NASA Astronomy Picture";
        image.loading = "eager";

        // IMPORTANT: hdurl is the actual image.
        // data.url is the NASA article page, not the image.
        if (!data.hdurl) {
            showError("NASA did not provide an image URL.");
            return;
        }

        image.src = data.hdurl;

        image.onerror = function () {
            image.remove();
            showError("NASA image could not be loaded. Please try again.");
        };

        imageContainer.appendChild(image);

    }

    // HANDLE VIDEO OR EMBEDDED MEDIA
    else if (
        data.media_type === "video" ||
        data.media_type === "iframe"
    ) {

        const video = document.createElement("iframe");

        video.className = "apod-video";
        video.title = data.title || "NASA Astronomy Media";
        video.loading = "lazy";
        video.allowFullscreen = true;

        if (data.basic_html_url) {
            video.src = data.basic_html_url;
        } else {
            showError("NASA media source is unavailable.");
            return;
        }

        imageContainer.appendChild(video);

    }

    else {

        showError(
            "Unsupported NASA media type: " + data.media_type
        );

        return;
    }


    // DISPLAY IMAGE DETAILS
    const content = document.createElement("div");

    content.className = "apod-content";

    const date = document.createElement("p");

    date.className = "apod-date";
    date.textContent = formatDate(data.date);

    const title = document.createElement("h3");

    title.textContent = data.title || "NASA Picture of the Day";

    const explanation = document.createElement("p");

    explanation.className = "explanation";

    explanation.textContent =
        data.explanation || "No explanation available.";

    content.append(date, title, explanation);


    // IMAGE COPYRIGHT
    if (data.copyright || data.credit) {

        const credit = document.createElement("p");

        credit.className = "apod-credit";

        credit.textContent =
            "Image credit: " + (data.copyright || data.credit);

        content.appendChild(credit);
    }


    // ORIGINAL NASA ARTICLE LINK
    if (data.permalink || data.url) {

        const link = document.createElement("a");

        link.className = "apod-link";

        link.href = data.permalink || data.url;

        link.target = "_blank";

        link.rel = "noopener noreferrer";

        link.textContent = "View original media ↗";

        content.appendChild(link);
    }

    imageContainer.appendChild(content);
}


// 11. FETCH DATA FROM NASA API
async function fetchImageForDate(date) {

    let url;

    if (date) {
        // Convert YYYY-MM-DD into YYMMDD.
        // Example: 2023-03-30 becomes 230330.
        const nasaDate = date.replaceAll("-", "").slice(2);

        url = new URL(`${API_URL}${nasaDate}`);
    } else {
        // Fetch the latest NASA records.
        url = new URL(API_URL);
    }

    url.searchParams.set("api_key", API_KEY);

    const response = await fetch(url);

    const responseText = await response.text();

    if (!response.ok) {
        throw new Error(
            `NASA API Error: ${response.status}`
        );
    }

    let data;

    try {
        data = JSON.parse(responseText);
    } catch (error) {
        throw new Error("Invalid NASA API response.");
    }

    // Handle an array response.
    if (Array.isArray(data)) {

        if (date) {
            data = data.find(item => item.date === date);
        } else {
            data.sort((a, b) =>
                b.date.localeCompare(a.date)
            );

            data = data[0];
        }
    }

    if (!data) {
        throw new Error(
            `No NASA picture found for ${date}.`
        );
    }

    console.log("Selected NASA APOD:", data);

    return data;
}


// 12. GET CURRENT IMAGE OF THE DAY
async function getCurrentImageOfTheDay() {

    showLoading("Loading today's picture of the day...");

    try {
        // No date parameter: NASA returns latest published APOD.
        const data = await fetchImageForDate();

        displayImageOfTheDay(data);

    } catch (error) {

        console.error(error);
        showError(error.message);
    }
}


// 13. GET IMAGE OF SELECTED DATE
async function getImageOfTheDay(date) {

    if (!date) return;

    if (date < "1995-06-16" || date > currentDate) {
        showError("Please select a valid date.");
        return;
    }

    searchButton.disabled = true;

    searchButton.querySelector(
        "span:first-child"
    ).textContent = "Loading...";

    showLoading(
        `Finding NASA's picture for ${formatDate(date)}...`
    );

    try {

        const data = await fetchImageForDate(date);

        displayImageOfTheDay(data);

        // Save selected date.
        saveSearch(date);

        // Update search history.
        addSearchToHistory();

    } catch (error) {

        console.error(error);
        showError(error.message);

    } finally {

        searchButton.disabled = false;

        searchButton.querySelector(
            "span:first-child"
        ).textContent = "Explore date";
    }
}


// 14. FORM SUBMIT EVENT
searchForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const selectedDate = searchInput.value;

    getImageOfTheDay(selectedDate);
});


// 15. CLICK SEARCH HISTORY ITEM
searchHistory.addEventListener("click", function (event) {

    const button = event.target.closest(
        "button[data-date]"
    );

    if (!button) return;

    const date = button.dataset.date;

    searchInput.value = date;

    getImageOfTheDay(date);
});


// 16. CLEAR SEARCH HISTORY
clearHistoryButton.addEventListener("click", function () {

    localStorage.removeItem(STORAGE_KEY);

    addSearchToHistory();
});


// 17. INITIALIZE APPLICATION
addSearchToHistory();

getCurrentImageOfTheDay();