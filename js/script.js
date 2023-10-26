const global = {
  currentPage: window.location.pathname,
};

async function displayPopularMovie() {
  const { results } = await fetchAPIData("movie/popular");
  hideSpinner();
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
        ${
          movie.poster_path
            ? `      <img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />`
            : `            <img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="Movie Title"
        />`
        }
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>
        `;
    const popularMovies = document.getElementById("popular-movies");
    popularMovies.appendChild(div);
  });
}

async function displayPopularShows() {
  const { results } = await fetchAPIData("tv/popular");
  hideSpinner();
  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
        <a href="tv-details.html?id=${show.id}">
        ${
          show.poster_path
            ? `      <img
            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
            class="card-img-top"
            alt="${show.name}"
          />`
            : `            <img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="Movie Title"
        />`
        }
        </a>
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">
            <small class="text-muted">Air Date: ${show.first_air_date}</small>
          </p>
        </div>
        `;
    const popularShow = document.getElementById("popular-shows");
    popularShow.appendChild(div);
  });
}

// MOVIE DETAILS
async function displayMovieDetails() {
  const movieId = window.location.search.split("=")[1];
  const movie = await fetchAPIData(`movie/${movieId}`);
  hideSpinner();
  //   console.log(movie);
  displayBackgroundImage("movie", movie.backdrop_path);
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="details-top">
  <div>
  ${
    movie.poster_path
      ? `      <img
      src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
      class="card-img-top"
      alt="${movie.title}"
    />`
      : `            <img
    src="images/no-image.jpg"
    class="card-img-top"
    alt="Movie Title"
  />`
  } 
  </div>
  <div>
    <h2>${movie.title}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${movie.vote_average.toFixed(1)} / 10
    </p>
    <p class="text-muted">Release Date: ${movie.release_date}</p>
    <p>${movie.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
    ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
    </ul>
    <a href="/" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
</div>
<div class="details-bottom">
  <h2>Movie Info</h2>
  <ul>
  <li><span class="text-secondary">Budget:</span> $${movie.budget.toLocaleString()}</li>
  <li><span class="text-secondary">Revenue:</span> $${movie.revenue.toLocaleString()}</li>
    <li><span class="text-secondary">Runtime:</span> ${movie.runtime}</li>
    <li><span class="text-secondary">Status:</span> ${movie.released}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">${movie.production_companies
    .map((company) => company.name)
    .join(", ")}
  </div>
</div>`;

  document.getElementById("movie-details").appendChild(div);
}

async function displayShowDetails() {
    const movieId = window.location.search.split("=")[1];
    const movie = await fetchAPIData(`movie/${movieId}`);
    hideSpinner();
    //   console.log(movie);
    displayBackgroundImage("movie", movie.backdrop_path);
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="details-top">
    <div>
    ${
      movie.poster_path
        ? `      <img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
      />`
        : `            <img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="Movie Title"
    />`
    } 
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
      ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
      </ul>
      <a href="/" target="_blank" class="btn">Visit Movie Homepage</a>
      </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
    <li><span class="text-secondary">Budget:</span> $${movie.budget.toLocaleString()}</li>
    <li><span class="text-secondary">Revenue:</span> $${movie.revenue.toLocaleString()}</li>
      <li><span class="text-secondary">Runtime:</span> ${movie.runtime}</li>
      <li><span class="text-secondary">Status:</span> ${movie.released}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${movie.production_companies
      .map((company) => company.name)
      .join(", ")}
    </div>
  </div>`;
  
    document.getElementById("movie-details").appendChild(div);
  }



function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.18";

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
}

// Fetch API

async function fetchAPIData(endpoint) {
  const API_KEY = "6d594afb77d77da6839e3bf1498d2d88";
  const API_URL = "https://api.themoviedb.org/3/";
  showSpinner();
  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}
// Init The App
function init() {
  switch (global.currentPage) {
    case "/":
    case "index.html":
      displayPopularMovie();
      break;
    case "/shows.html":
      displayPopularShows();
      console.log("Show");
      break;
    case "/movie-details.html":
      displayMovieDetails();
      console.log("Movie Details");
      break;
    case "/tv-details.html":
      console.log("TV Details");
      break;
    case "/search.html":
      console.log("Search");
      break;
  }

  highlightActiveLink();
}

// Load the app
document.addEventListener("DOMContentLoaded", init);
