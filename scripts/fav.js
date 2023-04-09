let moviesArray = JSON.parse(localStorage.getItem("movies"));
let favContainer = document.querySelector(".favCont");

function handleAlert(text, color) {
  const alertElement = document.getElementById("alert");
  alertElement.style.backgroundColor = color;
  alertElement.innerHTML = text;
  alertElement.style.display = "block";
  setTimeout(() => {
    alertElement.style.display = "none";
  }, 1000);
}

function getFavmovies() {
  for (let movie of moviesArray) {
    let div = document.createElement("div");
    let imageContainer = document.createElement("div");
    let movieImage = document.createElement("img");
    let movieName = document.createElement("p");
    let favbtn = document.createElement("a");
    let detailbtn = document.createElement("a");

    div.classList.add("favItem");
    imageContainer.appendChild(movieImage);
    movieImage.src = movie.image;
    movieName.innerHTML = movie.name;
    favbtn.innerHTML = `<i class="fa fa-heart" style="font-size:23px;color:red"></i>`;
    favbtn.classList.add("heart");
    detailbtn.classList.add("favdetails");
    detailbtn.innerHTML = "Details";
    detailbtn.href = `details.html?id=${movie.id}`;

    div.appendChild(imageContainer);
    div.appendChild(movieName);
    div.appendChild(favbtn);
    div.appendChild(detailbtn);
    favContainer.appendChild(div);

    favbtn.addEventListener("click", () => {
      for (let ind in moviesArray) {
        if (moviesArray[ind].id == movie.id) {
          moviesArray.splice(ind, 1);
          handleAlert("Favorites Removed successfully", "#d2122e");
          localStorage.setItem("movies", JSON.stringify(moviesArray));
          break;
        }
      }
      div.remove();
    });
  }
}
getFavmovies();
