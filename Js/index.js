const BASE_URL = "http://localhost:3000/movies";
// const buttonElem = document.querySelector(".submit-btn");
// const movieTitleElem = document.querySelector("#movie-title");
// const movieRatingElem = document.querySelector("#movie-rating");
// const movieContent = document.querySelector("#content");
// const myCard = document.querySelector("#myCard");
// const noItemsElem = document.querySelector(".no-items");
// const ratingValue = document.querySelector("#rating");
// const addToListBtn = document.querySelector(".addToList");

class MovieCard {
  constructor(data, poster) {
    this.id = data?.id;
    this.img = data?.image || poster;
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
        movieData = data;
        document.querySelector("#myCard").remove();
        this.displayMovieData(movieData);
      });
  }
  displayMovieData(movieData) {
    let html = ``;
    movieData.forEach((movie) => {
      console.log(movie.id);
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
              <button class="addToList" type="button">Add To List</button>
          </div>
        </div>
      `;
    });
    document.querySelector("#content").insertAdjacentHTML("beforeend", html);
  }
  render() {
    // remove #myCard from the DOM
    document.querySelector("#myCard").remove();
    let html = `
    <div id="myCard" class="d-flex justify-content-evenly m-5 p-5 w-100" data-movie="${this.id}">
      <div class="d-flex justify-content-center">
        <img
          id="movie-image"
          src="http://image.tmdb.org/t/p/w500/${this.img}"
        />
      </div>
      <div class="d-flex flex-column justify-content-center align-items-center m-5 p-5 w-50">
        <h1 id="movie-title">${this.title}</h1>
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
    document.querySelector("#content").insertAdjacentHTML("beforeend", html);
    let element = document.querySelector(`[data-movie="${this.id}"]`);
    return element;
  }
  addButtonEventListener() {
    let element = document.querySelector(".addToList");
    this.button = element;
    this.button.addEventListener("click", this.handleButtonClick.bind(this));
  }
  handleButtonClick() {
    // TODO: add button listener
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
  const newCard = new MovieCard();
  newCard.pageLoadRender();
});

// (function () {
//   let currentIndex = 0;
//   let movieData = [];

//   fetch(BASE_URL)
//     .then((response) => response.json())
//     .then((data) => {
//       movieData = data;
//       displayMovie(currentIndex);
//     });

//   function displayMovie(currentIndex) {
//     if (!movieData || !movieData.length) {
//       console.error("No movie data found");
//       return;
//     }

//     if (!currentIndex || currentIndex < 0 || currentIndex >= movieData.length) {
//       console.error("Invalid currentIndex value");
//       return;
//     }

//     const movie = movieData[currentIndex];
//     let movieCard = new MovieCard(movie, null);
//     return movieCard;
//   }
// })();

function testPost(e) {
  e.preventDefault();
  const movieTitle = movieTitleElem.value;
  const imagePhotoUrl =
    "https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" +
    movieTitle;
  fetch(imagePhotoUrl)
    .then((res) => res.json(res))
    .then((data) => {
      let movie = new MovieCard(data.results[0], data.results[0].poster_path);
    })
    .catch((err) => console.log(err));
}

buttonElem.addEventListener("click", testPost);
