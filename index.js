// const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?category=shooter';
let cont = document.querySelector(".cont");
let roww = document.querySelector("#roww");
let details = document.querySelector(".details");
let navlinks = document.querySelectorAll(".navlink");
let allgames = [];
let gameid = {};
let myui;
let dataa;

///////////////////////
navlinks.forEach(function (e) {
  e.addEventListener("click", function (event) {
    event.preventDefault();
    let game = event.target.getAttribute("data-game");
    console.log(game);
    intializeui(game);
  });
});

//initialze ui instance after fetching games(importantttt)
async function intializeui(game) {
  dataa = new Dataa();
  await dataa.getgames(game);

  myui = new Ui();
  myui.display();
}
/////////////////////////
class Dataa {
  async getgames(game) {
   
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "c1e3691e70msh2cb8ca037d425a1p11be4ajsn406af4096213",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
  
    let url = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${game}`,
      options
    );
   
    let data = await url.json();

    allgames = data;
  
    console.log(allgames);
  }
  async getgameid(id) {
  
    const options2 = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "c1e3691e70msh2cb8ca037d425a1p11be4ajsn406af4096213",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
 
    const url = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
      options2
    );

    let data = await url.json();

    gameid = data;

    $("#loader").removeClass("d-flex");
    $("#loader").addClass("d-none");
    doo(gameid);
    console.log(gameid);
  }
}

/////////////////////////////////
function doo(gameid) {
  cont.classList.replace("d-flex", "d-none");

  myui.displayDetails(gameid);
}
//////////////////////////////////
function undoo() {
  details.classList.replace("d-flex", "d-none");

  cont.classList.replace("d-none", "d-flex");
}
//////////////////////////////
class Ui {
  display() {
    let box = "";
    for (var i = 0; i < allgames.length; i++) {
      box += `    <div class="card col-lg-3 p-3"  onclick="dataa.getgameid(${allgames[i].id})" 
         >
        <img src="${allgames[i].thumbnail}
    " class="card-img-top w-100" alt="..." />
        <div class="card-body">
          <div class="d-flex justify-content-between mb-1">
            <h5 class="card-title text-white">${allgames[i].title}</h5>
            <button class="btn badge">
              <span class="text-white">Free</span>
            </button>
          </div>
          <p class="card-text">${allgames[i].short_description}</p>
        </div>
    
        <div class="card-footer d-flex justify-content-between">
          <div class="text-white"><span>${allgames[i].genre}</span></div>
          <div class="text-white"><span>${allgames[i].platform}</span></div>
        </div>
      </div>
    </div>
        `;
    }

    roww.innerHTML = box;
  }
  displayDetails(gameid) {
    let box = `  <div class="container position-relative">
                    <i
                      class="fa-solid fa-x fa-lg position-absolute top-0 end-0 p-3"
                      style="color: #898a8756"
                    onclick="undoo()"></i>
                    <div class="row">
                      <h2 class="text-white">Details Game</h2>
    
                      <div class="col-lg-4">
                        <img src="${gameid.thumbnail}"  alt="" />
                      </div>
                      <div class="col-lg-8">
                        <h3 class="text-white">Title:${gameid.title}</h3>
                        <p class="text-white">
                          Category:<span class="badge bg-info">  ${gameid.genre}</span>
                        </p>
                        <p class="text-white">
                          Platform:<span class="badge bg-info">${gameid.platform}</span>
                        </p>
                        <p class="text-white">
                          Status:<span class="badge bg-info">${gameid.status}</span>
                        </p>
                        <p class="text-white">
                       ${gameid.description}
                        </p>
                        <button class="btn badge">Show Game</button>
                      </div>
                    </div>
                  </div> `;
    details.innerHTML = box;
  }
}
$(document).ready(function(){
  $("#loading").removeClass("d-flex");
  $("#loading").addClass("d-none");
})

