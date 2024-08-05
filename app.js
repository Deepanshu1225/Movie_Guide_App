let searchForm = document.querySelector("form");
let movieContainer = document.querySelector(".movie-container");
let inputBox = document.querySelector(".inputBox");

// Function to fetch movie details using OMDB API 
let getMovieInfo = async (movie) => {
  try {
    let myApiKey = "f250d00d";
    let url = `https://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;
  
    let response = await fetch(url);

    if (!response.ok) {
      throw new Error("Unable to fetch movie data");
    }
    let data = await response.json();
    
    showMovieData(data);
  } catch (error) {
    showErrorMessage("No Movie Found!!!");
  }
}

// Function to show movie data on screen
let showMovieData = (data) => {
  movieContainer.innerHTML = "";
  movieContainer.classList.remove('noBackground');

  // Use destructing array to assignment to extract properties from data object
  let { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;
  let movieElement = document.createElement('div');
  movieElement.classList.add('movie-info');
  movieElement.innerHTML = `<h2>${Title}</h2> 
                            <p><strong>Rating: &#11088 </strong> ${imdbRating}</p>`;
  let movieGenreElement = document.createElement('div');
  movieGenreElement.classList.add('movie-genre');

  Genre.split(",").forEach(element => {
    let p = document.createElement('p');
    p.innerText = element;
    movieGenreElement.appendChild(p);
  });

  movieElement.appendChild(movieGenreElement);

  movieElement.innerHTML += `<p><strong>Released Date:</strong> ${Released}</p>
  <p><strong>Duration:</strong> ${Runtime}</p>
  <p><strong>Cast:</strong> ${Actors}</p>
  <p><strong>Plot:</strong> ${Plot}</p>`;
  
  // Creating a div for a movie poster
  let moviePosterElement = document.createElement("div");
  moviePosterElement.classList.add('movie-poster');
  moviePosterElement.innerHTML = `<img src="${Poster}"/>`;

  movieContainer.appendChild(moviePosterElement);
  movieContainer.appendChild(movieElement);
}

// Function to display error message
let showErrorMessage = (message) => {
  movieContainer.innerHTML = `<h2>${message} </h2>`;
  movieContainer.classList.add('noBackground');
}

// Adding event listener to search form
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let movieName = inputBox.value.trim();
  if (movieName !== '') {
    showErrorMessage("Fetching Movie Information...");
    getMovieInfo(movieName);
  } else {
    showErrorMessage("Enter movie name to get movie information.");
  }
});
