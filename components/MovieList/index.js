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

export { MovieList };
