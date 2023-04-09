const movieSearchElement = document.querySelector("input");
const moviesContainer = document.querySelector("ul");

if (!localStorage.getItem("movies")) {
  localStorage.setItem("movies", "[]");
}
//  Checking if Movie already exists in favMovies
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

//shows a msg when adding shows to fav or removing them
function handleAlert(text, color) {
  const alertElement = document.getElementById("alert");
  alertElement.style.backgroundColor = color;
  alertElement.innerHTML = text;
  alertElement.style.display = "block";
  setTimeout(() => {
    alertElement.style.display = "none";
  }, 1000);
}

function handleFavMovies(movieObj, addToFavBtn) {
  let moviearray = JSON.parse(localStorage.getItem("movies"));
  let flag = false;

  for (let ind in moviearray) {
    if (moviearray[ind].id == movieObj.id) {
      moviearray.splice(ind, 1);
      flag = true;
      addToFavBtn.innerHTML = "Add to my Favorites ❤️";
      addToFavBtn.style.backgroundColor = "rgb(53, 184, 53)";
      handleAlert("Favorites Removed successfully", "#d2122e");
      break;
    }
  }
  if (!flag) {
    moviearray.push({
      id: movieObj.id,
      name: movieObj.name,
      image: movieObj.image,
    });

    addToFavBtn.innerHTML = "Remove from my Favorites ✖️";
    addToFavBtn.style.backgroundColor = " #ED2939";
    handleAlert("Favorites added successfully", "#32CD32");
  }

  localStorage.setItem("movies", JSON.stringify(moviearray));
}

// Showing  movies Search Result
function displayMovies(movies) {
  for (let movie of movies) {
    // creating movie item  and setting attributes
    let id = movie.show.id;
    let movieItem = document.createElement("li");
    let movieImage = document.createElement("img");
    let movieName = document.createElement("h4");
    let div = document.createElement("div");
    let detailBtn = document.createElement("a");
    let addToFavBtn = document.createElement("a");
    movieImage.src = movie.show.image.original;
    movieName.innerHTML = movie.show.name;
    detailBtn.href = `details.html?id=${id}`;
    detailBtn.className = "detail";
    addToFavBtn.className = "addtofav";
    detailBtn.innerHTML = "Details💪";
    console.log(movie.show);

    // if Movie present in favMovies Style and content of aadtoFavMovies will Change
    if (isMoviePresent(id)) {
      addToFavBtn.style.backgroundColor = " #ED2939";
      addToFavBtn.innerHTML = "Remove from my Favorites ✖️";
    } else {
      addToFavBtn.style.backgroundColor = "rgb(53, 184, 53)";
      addToFavBtn.innerHTML = "Add to my Favorites ❤️";
    }

    div.appendChild(movieName);
    div.appendChild(detailBtn);
    div.appendChild(addToFavBtn);
    movieItem.appendChild(movieImage);
    movieItem.appendChild(div);
    moviesContainer.appendChild(movieItem);

    // storing current movies results in localStorage for details page
    let moviesDetails = JSON.parse(localStorage.getItem("movieDetails"));
    moviesDetails.push({
      id: movie.show.id,
      name: movie.show.name,
      image: movie.show.image.original,
      summary: movie.show.summary
    });
    localStorage.setItem("movieDetails", JSON.stringify(moviesDetails));

    addToFavBtn.addEventListener("click", () => {
      handleFavMovies(
        {
          id: id,
          name: movie.show.name,
          image: movie.show.image.original,
        },
        addToFavBtn
      );
    });
  }
}

function searchMovies() {
  let movieTitle = movieSearchElement.value;
  moviesContainer.innerHTML = "";
  if (!movieTitle) {
    return;
  }
  document.querySelector(".ldio-q6ev66kdnbk").style.display = "block";  //loader

  localStorage.setItem("movieDetails", localStorage.getItem("movies"));

  fetch(`https://api.tvmaze.com/search/shows?q=:${movieTitle}`)
    .then((movieResult) => {
      movieResult
        .json()
        .then((pmovieResult) => {
          displayMovies(pmovieResult);
          document.querySelector(".ldio-q6ev66kdnbk").style.display = "none";
        })
        .catch((err) => {
          console.log(err);
          document.querySelector(".ldio-q6ev66kdnbk").style.display = "none";
        });
    })
    .catch((err) => {
      console.log(err);
      document.querySelector(".ldio-q6ev66kdnbk").style.display = "none";
    });
}

movieSearchElement.addEventListener("input", searchMovies);
