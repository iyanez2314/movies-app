import { BASE_URL } from "../../utils/config.js";

class HeaderCard {
  constructor(data) {
    this.data = data;
    this.id = data.id;
    this.title = data.title;
    this.overview = data.overview;
    this.image = data.poster_path;
    this.button = null;
    this.renderCard();
    this.addButtonListener();
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
  addButtonListener() {
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

export { HeaderCard };
