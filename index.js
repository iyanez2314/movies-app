import { HeaderCard } from "./components/HeaderCard/index.js";
import { MovieList } from "./components/MovieList/index.js";
const BASE_URL = "http://localhost:3000/movies";
const buttonElem = document.querySelector(".submit-btn");
const movieTitleElem = document.querySelector("#movie-title");
(function () {
  fetch(BASE_URL)
    .then((response) => response.json(response))
    .then((data) => {
      data.forEach((movie) => {
        new MovieList(movie);
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
      new HeaderCard(returnedData);
    })
    .catch((err) => console.log(err));
}
buttonElem.addEventListener("click", testPost);
