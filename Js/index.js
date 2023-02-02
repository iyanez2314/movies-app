const BASE_URL = "http://localhost:3000/movies";
const buttonElem = document.querySelector(".submit-btn");
const movieTitleElem = document.querySelector("#movie-title");
const movieRatingElem = document.querySelector("#movie-rating");
const movieContent = document.querySelector("#content");
// console.log(document.querySelector("#list-of-movies"));
// const elementCreated = document.createElement("p");
// elementCreated.textContent = "someting";
// document.querySelector("#list-of-movies").appendChild(elementCreated);
class MovieCard {
  constructor(data) {
    this.data = data;
    this.id = data?.id;
    this.img = data?.poster_path;
    this.title = data?.title;
    this.vote_average = data?.vote_average;
    this.overview = data?.overview;
    this.button = null; // button for the addToList
    this.element = this.render();
    this.addButtonEventListener();
  }
  async pageLoadRender() {
    let movieData = [];
    await fetch(BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json(response))
      .then((data) => {
        movieData.push(...data);
        console.log(movieData);
        movieData.map((movie) => {
          let newMovieCard = new MovieCard(movie);
          console.log(newMovieCard.element);
          document
            .querySelector("#list-of-movies")
            .append(newMovieCard.element);
        });
      });
  }
  displayMovieData(movie) {
    let html = ``;
    html += `
        <div id="myCard" class="d-flex justify-content-evenly m-5 p-5 w-100" data-movie="${movie.id}">
          <div class="d-flex justify-content-center">
            <img
              id="movie-image"
              src="${movie.image}"
            />
          </div>
          <div class="d-flex flex-column justify-content-center align-items-center m-5 p-5 w-50">
            <h1 id="movie-title">${movie.title}</h1>
            <p id="movie-average">Vote Average ${movie.vote_average}</p>
            <h4>Ratings</h4>
            <div class="d-flex justify-content-center flex-row m-4">
              <span  class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span  class="fa fa-star"></span>
              <span  class="fa fa-star"></span>
              <span  class="fa fa-star"></span>
            </div>
            <p id="movie-overview">${movie.overview}</p>
              <button class="addToList" type="button">Edit content</button>
          </div>
        </div>
      `;

    document
      .querySelector("#list-of-movies")
      .insertAdjacentHTML("afterend", html);
  }
  render() {
    // remove #myCard from the DOM

    document.querySelector("#myCard").remove();
    let html = `
      <div  id="myCard" class="d-flex justify-content-evenly m-5 p-5 w-100" data-movie="${
        this.id
      }">
        <div class="d-flex justify-content-center">
          <img
            id="movie-image"
            src="http://image.tmdb.org/t/p/w500/${this.img}"
          />
        </div>
        <div class="d-flex flex-column justify-content-center align-items-center m-5 p-5 w-50">
          <h1 id="movie-title">${
            this.title === "undefined" ? "Search up a movie!" : this.title
          }</h1>
          <p id="movie-average">Vote Average ${this.vote_average}</p>
          <h4>Ratings</h4>
          <div class="d-flex justify-content-center flex-row m-4">
            <span  class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span  class="fa fa-star"></span>
            <span  class="fa fa-star"></span>
            <span  class="fa fa-star"></span>
          </div>
          <p id="movie-overview">${this.overview}</p>
            <button class="addToList" type="button">Add To List</button>
        </div>
      </div>
      `;
    document.querySelector("#content").insertAdjacentHTML("afterend", html);
    let element = document.querySelector(`[data-movie="${this.id}"]`);
    return element;
  }
  addButtonEventListener() {
    let element = document.querySelector(".addToList");
    this.button = element;
    this.button.addEventListener("click", this.handleButtonClick.bind(this));
  }
  handleButtonClick() {
    const addedMovie = {
      id: `${this.id}`,
      title: `${this.title}`,
      vote_average: `${this.vote_average}`,
      overview: `${this.overview}`,
      image: `http://image.tmdb.org/t/p/w500${this.img}`,
    };
    console.log(addedMovie);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addedMovie),
    };

    fetch("http://localhost:3000/movies", options)
      .then((res) => res.json(res))
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  delete() {
    this.button.removeEventListener("click", this.handleButtonClick);
    this.element.remove();
  }
}

window.addEventListener("load", () => {
  fetch(BASE_URL)
    .then((response) => response.json(response))
    .then((movies) => {
      movies.forEach((movie) => {
        const newCard = new MovieCard(movie);
        newCard.displayMovieData(movie);
      });
    });
});

function testPost(e) {
  e.preventDefault();
  const movieTitle = movieTitleElem.value;
  const imagePhotoUrl =
    "https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" +
    movieTitle;
  fetch(imagePhotoUrl)
    .then((res) => res.json(res))
    .then((data) => {
      let movie = new MovieCard(data.results[0]);
    })
    .catch((err) => console.log(err));
}

function displayMovies(movies) {}

buttonElem.addEventListener("click", testPost);
