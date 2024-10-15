// Variables
let loading = document.querySelector(".loading");
let navLink = document.querySelectorAll(".nav-link");

async function getApiGame(category = "mmorpg") {
  loading.classList.replace("d-none", "d-flex");

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "a68f2a73d3msh741027d5463cecep166ee0jsna9eb29fb36ec",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  const api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
    options
  );

  const response = await api.json();

  loading.classList.replace("d-flex", "d-none");

  let display = new Ui(response);
  display.displayData();
}

async function getApiDetails(id) {
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "a68f2a73d3msh741027d5463cecep166ee0jsna9eb29fb36ec",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  const api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    options
  );
  const response = await api.json();

  console.log(response);

  let gameDetails = new Ui(response);
  gameDetails.displayDetails();
}

getApiGame();

// getApiDetails();

// UI
class Ui {
  constructor(apiData) {
    this.apiData = apiData;
  }
  cartona = ``;
  displayData() {
    for (let i = 0; i < this.apiData.length; i++) {
      this.cartona += `
        <div class="col-lg-3 col-md-6">
            <div class="card h-100" data-id=${this.apiData[i].id}>
              <img src="${this.apiData[i].thumbnail}" class="card-img-top" alt="..." />
              <div class="card-body d-flex justify-content-between p-0 mt-3">
                <p class="mb-0 text-white">${this.apiData[i].title}</p>
                <span>Free</span>
              </div>
              <div class="text-card text-center">
                <p>${this.apiData[i].short_description}</p>
              </div>
              <div
                class="card-footer d-flex justify-content-between pe-0 ps-0 pb-0"
              >
                <span class="badge">${this.apiData[i].genre}</span>
                <span class="badge">${this.apiData[i].platform}</span>
              </div>
            </div>
          </div>
      `;
    }
    document.getElementById("rowData").innerHTML = this.cartona;

    this.navSlider();
    this.getGameId();
  }

  navSlider() {
    navLink.forEach((link) => {
      link.addEventListener("click", function (e) {
        getApiGame(e.target.innerHTML);
        document.querySelector(".nav-link.active").classList.remove("active");
        e.target.classList.add("active");
      });
    });
  }
  getGameId() {
    let cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("click", function (e) {
        let gameId = card.getAttribute("data-id");
        console.log(e.target);
        getApiDetails(gameId);
      });
    });
  }
  displayDetails() {
    let gameData = this.apiData;
    let gameDetails = `
      <div class="col-lg-4">
        <img src=${this.apiData.thumbnail} class="w-100" alt="" />
      </div>
      <div class="col-lg-8">
        <h3>Title: ${this.apiData.title}</h3>
        <p>Category: <span class="badge text-bg-info">${this.apiData.genre}</span></p>
        <p>Platform: <span class="badge text-bg-info">${this.apiData.platform}</span></p>
        <p>Status: <span class="badge text-bg-info">${this.apiData.status}</span></p>
        <div class="discription small mb-3">
        ${this.apiData.description}
        </div>
        <button class="btn btn-outline-warning text-white" id="showGameBtn">
          show game
        </button>
      </div>
    `;
    let home = document.querySelector(".home");
    home.classList.replace("d-block", "d-none");
    let details = document.querySelector(".details");
    details.classList.replace("d-none", "d-block");
    document.getElementById("Details").innerHTML = gameDetails;
    let closeBtn = document.getElementById("closeBtn");
    closeBtn.addEventListener("click", function () {
      home.classList.replace("d-none", "d-block");
      details.classList.replace("d-block", "d-none");
    });
    let showGameBtn = document.getElementById("showGameBtn");
    showGameBtn.addEventListener("click", function () {
      // console.log(this.apiData);

      open(`${gameData.game_url}`);
    });
  }
}
