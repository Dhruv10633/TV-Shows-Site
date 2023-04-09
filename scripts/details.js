//  getting id of movie from url
const params = new URLSearchParams(window.location.search);
const detailsCont = document.querySelector(".detailContainer");
let movieId = params.get("id");

function handleAlert(text, color) {
  const alertElement = document.getElementById("alert");
  alertElement.style.backgroundColor = color;
  alertElement.innerHTML = text;
  alertElement.style.display = "block";
  setTimeout(() => {
    alertElement.style.display = "none";
  }, 1000);
}

function isMoviePresent(movieId) {
  const favMovies = JSON.parse(localStorage.getItem("movies"));
  if (favMovies) {
    for (let movie of favMovies) {
      if (movie.id === movieId) {
        return true;
      }
    }
  }
  return false;
}

function handlefavbtn(movieObj, favbtn) {
  let favArray = JSON.parse(localStorage.getItem("movies"));
  if (isMoviePresent(movieObj.id)) {
    favbtn.innerHTML = `<i class="fa fa-heart" style="font-size:23px;color:white"></i>`;
    for (let ind in favArray) {
      if (favArray[ind].id == movieObj.id) {
        favArray.splice(ind, 1);
        handleAlert("Favorites Removed successfully", "#d2122e");
        break;
      }
    }
  } else {
    favArray.push(movieObj);
    favbtn.innerHTML = `<i class="fa fa-heart" style="font-size:23px;color:red"></i>`;
    handleAlert("Favorites Added successfully", "#32CD32");
  }

  localStorage.setItem("movies", JSON.stringify(favArray));
}

let movies = JSON.parse(localStorage.getItem("movieDetails"));
for (let movie of movies) {
  if (movie.id == movieId) {
    let movieImage = document.createElement("img");
    let movieName = document.createElement("h2");
    let favbtn = document.createElement("a");
    let summary = document.createElement("div");
    movieImage.src = movie.image;
    movieName.innerHTML = movie.name;
    favbtn.classList.add("heart");
    summary.innerHTML=movie.summary;
    summary.style.color="white";
    summary.style.fontSize="1.15rem";
    summary.style.padding="30px";
    summary.style.marginBottom="40px";

    if (isMoviePresent(movie.id)) {
      favbtn.innerHTML = `<i class="fa fa-heart" style="font-size:23px;color:red"></i>`;
    } else {
      favbtn.innerHTML = `<i class="fa fa-heart" style="font-size:23px;color:white"></i>`;
    }
    detailsCont.appendChild(movieImage);
    detailsCont.appendChild(movieName);
    detailsCont.appendChild(favbtn);
    detailsCont.appendChild(summary);
    favbtn.addEventListener("click", () => {
      handlefavbtn(movie, favbtn);
    });
    break;
  }
}
