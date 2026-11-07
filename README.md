# NASA APOD Explorer 🌌

A responsive web application that allows users to explore NASA's **Astronomy Picture of the Day (APOD)**. Users can view the latest astronomy picture, search pictures by date, read detailed explanations, and revisit previously searched dates.

**Technologies:** HTML5, CSS3, JavaScript, NASA APOD API, localStorage.

---

## 1. NASA API Configuration

This project uses NASA's Astronomy Picture of the Day API.

### API Key

1. Visit https://api.nasa.gov/
2. Generate your free NASA API key.
3. Open `script.js`.
4. Add your API key:

```javascript
const API_KEY = "YOUR_NASA_API_KEY";
```

**Security Note:** Never upload your actual API key to a public GitHub repository. API keys included in frontend JavaScript are visible to website visitors. Regenerate any key that has been exposed.

### Primary API Endpoint

The original API endpoint specified in the assignment is:

```text
https://api.nasa.gov/planetary/apod
```

The API uses the following parameters:

| Parameter | Description |
|---|---|
| `api_key` | Your NASA API key |
| `date` | Selected date in YYYY-MM-DD format |

Example API request:

```text
https://api.nasa.gov/planetary/apod?date=2023-03-30&api_key=YOUR_NASA_API_KEY
```

### NASA API Migration and Fallback

NASA migrated its APOD service on September 10, 2026. The legacy endpoint is scheduled for retirement on December 1, 2026.

The original assignment endpoint is retained as the **primary API endpoint**.

However, the legacy endpoint may return incorrect image data, such as the default NASA logo instead of the actual astronomy picture.

To handle this issue, the project uses the following replacement endpoint as a fallback:

```text
https://science.nasa.gov/wp-json/wp/v2/apod-basic/
```

**API request flow:**

1. First, request data from the original NASA APOD endpoint.
2. Validate the returned date, title, and image URL.
3. If the response contains incorrect or unavailable APOD data, try the fallback endpoint.
4. Match the requested date with the returned APOD record.
5. Display the correct image, title, and explanation.
6. If both requests fail, display an appropriate error message.

The fallback endpoint may return a different response structure, so its fields must be checked before displaying the content.

---

## 2. Project Features

- Displays NASA's current Astronomy Picture of the Day.
- Allows users to search astronomy pictures by date.
- Displays the selected picture or video.
- Shows the picture title, date, and detailed explanation.
- Displays image copyright information when available.
- Supports image and video media types.
- Maintains search history using browser localStorage.
- Allows users to revisit previously searched dates.
- Prevents duplicate dates in search history.
- Provides an option to clear search history.
- Displays loading and error messages.
- Supports dates from June 16, 1995, to the current date.

---

## 3. Project Structure

```text
NASA-APOD-Explorer/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

### File Description

| File | Description |
|---|---|
| `index.html` | Defines the structure of the application. |
| `style.css` | Handles styling, layout, and responsiveness. |
| `script.js` | Handles API integration, date search, image display, and search history. |
| `README.md` | Provides project documentation and setup instructions. |

---

## 4. How the Application Works

### Step 1: Initial Page Load

When the application opens, JavaScript calculates the current date using NASA's Eastern Time zone and fetches the corresponding Astronomy Picture of the Day.

### Step 2: Fetch NASA Data

The application sends a request to the NASA API using the selected date and API key.

### Step 3: Display Astronomy Picture

The API response is used to display:

- Astronomy picture or video
- Picture title
- Selected date
- Detailed explanation
- Image copyright information, when available

### Step 4: Search by Date

Users can select a date from the date input and submit the form to retrieve the corresponding astronomy picture.

### Step 5: Save Search History

After a successful search, the selected date is stored in browser localStorage.

### Step 6: View Previous Searches

Previously searched dates appear in the search-history section. Clicking a date loads that astronomy picture again.

### Step 7: Clear Search History

Users can clear their saved search history using the clear-history button.

---

## 5. JavaScript Functions

| Function | Purpose |
|---|---|
| `getNasaCurrentDate()` | Gets the current date according to NASA's timezone. |
| `getSavedSearches()` | Retrieves saved dates from localStorage. |
| `saveSearch(date)` | Saves a searched date in localStorage. |
| `addSearchToHistory()` | Displays previously searched dates. |
| `formatDate(date)` | Formats dates for display. |
| `showLoading()` | Displays a loading message while fetching data. |
| `showError()` | Displays API or application errors. |
| `displayImageOfTheDay(data)` | Displays the astronomy image, video, and details. |
| `fetchImageForDate(date)` | Fetches APOD data from NASA's primary API and fallback. |
| `getCurrentImageOfTheDay()` | Loads the current day's astronomy picture. |
| `getImageOfTheDay(date)` | Loads an astronomy picture for the selected date. |

---

## 6. HTML Element IDs

The JavaScript interacts with the following HTML elements:

| Element ID | Purpose |
|---|---|
| `search-form` | Date search form |
| `search-input` | Date input field |
| `search-button` | Search button |
| `current-image-container` | Main astronomy picture display |
| `search-history` | Previous search list |
| `history-count` | Displays the number of saved searches |
| `empty-history` | Empty history message |
| `clear-history` | Clears saved search history |

---

## 7. LocalStorage

The application uses browser localStorage to maintain search history.

Storage key:

```javascript
const STORAGE_KEY = "nasaApodSearches";
```

Example stored data:

```json
[
  "2023-03-30",
  "2022-08-12",
  "2021-05-20"
]
```

This allows users to revisit previously searched dates even after refreshing the page.

---

## 8. Technologies Used

- **HTML5** – Application structure
- **CSS3** – Styling and responsive design
- **JavaScript (ES6+)** – Application functionality
- **NASA APOD API** – Astronomy pictures and explanations
- **Fetch API** – HTTP requests
- **localStorage** – Search history management
- **Git and GitHub** – Version control
- **GitHub Pages** – Deployment

---

## 9. How to Run the Project Locally

1. Clone or download the project repository.
2. Open the project folder in Visual Studio Code.
3. Add your NASA API key to `script.js`.
4. Ensure that `index.html`, `style.css`, and `script.js` are in the same folder.
5. Run the project using the Live Server extension or a local server.

Alternatively, run:

```bash
python -m http.server 8000
```

Open the following URL in your browser:

```text
http://localhost:8000
```

---

## 10. Deployment Using GitHub Pages

1. Create a GitHub repository.
2. Upload the project files to the repository.
3. Open the repository's **Settings**.
4. Navigate to **Pages**.
5. Select **Deploy from a branch**.
6. Select the `main` branch.
7. Select the `/(root)` folder.
8. Click **Save**.
9. Wait for GitHub Pages to publish the application.

Your project will be accessible through the GitHub Pages URL.

**Security Note:** A public GitHub Pages website exposes its JavaScript and any API key included in it. For production use, consider a backend proxy to protect the API key.

---

## 11. Troubleshooting

### Error 403 – Forbidden

Possible reasons:
- Invalid API key.
- API usage limit exceeded.
- Incorrect API key configuration.

**Solution:** Verify your NASA API key and check the API response.

### Error 404 – Not Found

Check that the date is passed as a query parameter.

Correct:

```text
/planetary/apod?date=2023-03-30
```

Incorrect:

```text
/planetary/apod230330
```

### Error 500 – Internal Server Error

This indicates a server-side issue. Check the NASA response and try again later. If necessary, use the fallback endpoint.

### NASA Logo Appears Instead of Astronomy Picture

This can happen when the legacy endpoint returns NASA's default website image instead of the actual APOD image.

The application checks the returned image URL and attempts the fallback endpoint rather than displaying the incorrect logo.

### Same Explanation for Different Dates

Check the Network tab in browser Developer Tools to verify that the correct date is sent in each API request. If NASA returns identical explanations for different dates, investigate the API response rather than changing the date-selection code.

---

## 12. Assignment Requirements

This project covers the following assignment requirements:

- Fetch and display NASA's current Astronomy Picture of the Day.
- Search for an astronomy picture using a selected date.
- Display the selected picture and its explanation.
- Save searched dates in localStorage.
- Display search history in an unordered list.
- Allow users to click previous dates to retrieve their pictures.
- Use a separate CSS file for styling.
- Deploy the application using GitHub Pages.

---

## 13. Acknowledgements

- [NASA](https://www.nasa.gov/) – Astronomy pictures and related information.
- [NASA API Portal](https://api.nasa.gov/) – API documentation and API key registration.
- [NASA Astronomy Picture of the Day](https://apod.nasa.gov/apod/astropix.html) – Astronomy Picture of the Day program.

---

# 🤝 Support

If you encounter any issues or have suggestions for improving the project, feel free to open an issue in the GitHub repository.

---

# 👨‍💻 Author

**Isha**

GitHub: https://github.com/Isha0016

---

# ⭐ Project

If you find this project helpful, feel free to explore the repository, share your feedback, or contribute to its improvement.

---

**Developed as a NASA Astronomy Picture of the Day Explorer project.**
