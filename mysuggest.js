const API_KEY = 'e2064c3'; // Replace with your OMDB API key
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&`;

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const movieList = document.getElementById('movie-list');
const favoriteList = document.getElementById('favorite-list');

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

searchBtn.addEventListener('click', searchMovies);
document.addEventListener('DOMContentLoaded', displayFavorites);

function searchMovies() {
    const query = searchInput.value;
    if (query) {
        fetch(`${BASE_URL}s=${query}`)
            .then(response => response.json())
            .then(data => {
                if (data.Search) {
                    displayMovies(data.Search);
                } else {
                    movieList.innerHTML = '<p>No movies found.</p>';
                }
            });
    }
}

function displayMovies(movies) {
    movieList.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <button class="favorite-btn" onclick="addToFavorites('${movie.imdbID}', '${movie.Title}')">Add to Favorites</button>
        `;
        movieList.appendChild(movieCard);
    });
}

function addToFavorites(id, title) {
    if (!favorites.some(fav => fav.id === id)) {
        favorites.push({ id, title });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        displayFavorites();
    }
}

function displayFavorites() {
    favoriteList.innerHTML = '';
    favorites.forEach(fav => {
        const favItem = document.createElement('li');
        favItem.classList.add('favorite-item');
        favItem.innerHTML = `
            ${fav.title}
            <button class="remove-btn" onclick="removeFromFavorites('${fav.id}')">Remove</button>
        `;
        favoriteList.appendChild(favItem);
    });
}

function removeFromFavorites(id) {
    favorites = favorites.filter(fav => fav.id !== id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
}
