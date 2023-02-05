const BASE_URL = "http://localhost:3000/movies";
const buttonElem = document.querySelector(".submit-btn");
const movieTitleElem = document.querySelector("#movie-title");
const movieRatingElem = document.querySelector("#movie-rating");
const movieContent = document.querySelector("#content");

class HeaderCard {
  constructor(data) {
    this.data = data;
    this.id = data.id;
    this.title = data.title;
    this.overview = data.overview;
    this.image = data.poster_path;
    this.button = null;
    this.renderCard();
    this.addEventListener();
  }
  renderCard() {
    // Attach this created card to the page
    document.querySelector("#myCard").remove();
    let html = `
      <div id="myCard" class="remove d-flex justify-content-evenly m-5 p-5 w-100" data-movie="${this.id}">
               <div class="d-flex justify-content-center">
                  <img
                   id="movie-image"
                   src="http://image.tmdb.org/t/p/w500/${this.image}"
                 />
                </div>
              <div id="myCardHeader" class="d-flex flex-column justify-content-center align-items-center m-5 p-5 w-50">
                <h1 id="movie-title">${this.title}</h1>
                   <h4>Ratings</h4>
                <div class="d-flex justify-content-center flex-row m-4">
                     <span  class="fa fa-star checked"></span>
                   <span class="fa fa-star checked"></span>
                     <span  class="fa fa-star"></span>
                   <span  class="fa fa-star"></span>
                   <span  class="fa fa-star"></span>
                   </div>
                  <p id="movie-overview">${this.overview}</p>
                  <button class="addToList" type="button">Add Movie To List</button>
                 </div>
               </div>
      `;
    document.querySelector("#content").insertAdjacentHTML("afterend", html);
  }
  addEventListener() {
    let element = document.querySelector(".addToList");
    this.button = element;
    this.button.addEventListener("click", this.addMovieDb.bind(this));
  }
  addMovieDb() {
    const newMovieObj = {
      id: this.id,
      title: this.title,
      overview: this.overview,
      image: `http://image.tmdb.org/t/p/w500${this.image}`,
    };
    fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovieObj),
    })
      .then((response) => console.log(response))
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
}

class MovieList {
  constructor(data) {
    this.data = data;
    this.id = data.id;
    this.title = data.title;
    this.overview = data.overview;
    this.image = data.image;
    this.button = null;
    this.renderCards();
    this.addEventListeners();
  }
  renderCards() {
    let html = `
    <div id="myCard" class="remove d-flex justify-content-evenly m-5 p-5 w-100" data-movie="${this.id}">
             <div class="d-flex justify-content-center">
                <img
                 id="movie-image"
                 src="${this.image}"
               />
              </div>
            <div id="myCardHeader" class="d-flex flex-column justify-content-center align-items-center m-5 p-5 w-50">
              <h1 id="movie-title">${this.title}</h1>
                 <h4>Ratings</h4>
              <div class="d-flex justify-content-center flex-row m-4">
                   <span  class="fa fa-star checked"></span>
                 <span class="fa fa-star checked"></span>
                   <span  class="fa fa-star"></span>
                 <span  class="fa fa-star"></span>
                 <span  class="fa fa-star"></span>
                 </div>
                <p id="movie-overview">${this.overview}</p>
                <button class="removeFromList" type="button">Remove Form List</button>
               </div>
             </div>
    `;
    document
      .querySelector("#list-of-movies")
      .insertAdjacentHTML("afterend", html);
  }
  addEventListeners() {
    let element = document.querySelector(".removeFromList");
    this.button = element;
    this.button.addEventListener("click", this.removeMovie.bind(this));
  }
  removeMovie() {
    fetch(`${BASE_URL}/${this.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json(response))
      .then((data) => console.log("Success"))
      .catch((err) => console.log("OOPS error occured"));
  }
}

(function () {
  fetch(BASE_URL)
    .then((response) => response.json(response))
    .then((data) => {
      data.forEach((movie) => {
        const newList = new MovieList(movie);
      });
    });
})();

function testPost(e) {
  e.preventDefault();
  const movieTitle = movieTitleElem.value;
  console.log(movieTitle);
  const imagePhotoUrl =
    "https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" +
    movieTitle;
  fetch(imagePhotoUrl)
    .then((res) => res.json(res))
    .then((data) => {
      const returnedData = data.results[0];
      let headerCard = new HeaderCard(returnedData);
    })
    .catch((err) => console.log(err));
}
buttonElem.addEventListener("click", testPost);
