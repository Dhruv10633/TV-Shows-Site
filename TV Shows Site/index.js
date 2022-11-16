const input = document.querySelector("input");
const cont = document.querySelector("ul");
const detailPage = document.getElementsByClassName("detailPage");
function fun() {
  let data = input.value;
  cont.innerHTML = "";
  if(!localStorage.getItem("movies")){
    localStorage.setItem("movies","[]");
  }
  localStorage.setItem("movieDetails", localStorage.getItem("movies"));

  fetch(`https://api.tvmaze.com/search/shows?q=:${data}`)
    .then((mdata) => {
      mdata
        .json()
        .then((fdata) => {
          for (let ele of fdata) {
            let id = ele.show.id;

            let list = document.createElement("li");
            let img = document.createElement("img");
            img.src = ele.show.image.original;
            list.appendChild(img);
            let div = document.createElement("div");
            let h4 = document.createElement("h4");
            h4.innerHTML = ele.show.name;
            let detail = document.createElement("a");
            detail.href = `details.html?id=${id}`;

            detail.className = "detail";
            let addtofav = document.createElement("a");
            addtofav.className = "addtofav";
            detail.innerHTML = "Details💪";
            let flag = false;
            if (localStorage.getItem("movies")) {
              for (let eles of JSON.parse(localStorage.getItem("movies"))) {
                if (eles.id === id) {
                  addtofav.style.backgroundColor = " rgb(225, 72, 72)";
                  addtofav.innerHTML = "Remove from my Favorites ✖️";
                  flag = true;
                  break;
                }
              }
            }
            if (!flag) {
              addtofav.style.backgroundColor = "rgb(53, 184, 53)";
              addtofav.innerHTML = "Add to my Favorites ❤️";
            }
            div.appendChild(h4);
            div.appendChild(detail);
            div.appendChild(addtofav);
            list.appendChild(img);
            list.appendChild(div);
            cont.appendChild(list);
            let moviesDetails = JSON.parse(
              localStorage.getItem("movieDetails")
            );
            moviesDetails.push({
              id: ele.show.id,
              name: ele.show.name,
              image: ele.show.image.original,
            });
            localStorage.setItem("movieDetails", JSON.stringify(moviesDetails));

            if (!localStorage.getItem("movies")) {
              localStorage.setItem("movies", "[]");
            }
            addtofav.addEventListener(
              "click",
              () => {
                let moviearray = JSON.parse(localStorage.getItem("movies"));
                let flag = false;
                for (let ind in moviearray) {
                  if (moviearray[ind].id === id) {
                    moviearray.splice(ind, 1);
                    flag = true;
                    addtofav.innerHTML = "Add to my Favorites ❤️";
                    addtofav.style.backgroundColor = "rgb(53, 184, 53)";
                    document.getElementById("alert").style.backgroundColor =
                      "red";
                    document.getElementById("alert").innerHTML =
                      "Favorites Removed successfully";
                    document.getElementById("alert").style.display = "block";
                    setTimeout(() => {
                      document.getElementById("alert").style.display = "none";
                    }, 1000);
                    break;
                  }
                }
                if (!flag) {
                  moviearray.push({
                    id: id,
                    name: ele.show.name,
                    image: ele.show.image.original,
                  });

                  addtofav.innerHTML = "Remove from my Favorites ✖️";
                  addtofav.style.backgroundColor = " rgb(225, 72, 72)";
                  document.getElementById("alert").style.backgroundColor =
                    "green";
                  document.getElementById("alert").innerHTML =
                    "Favorites added successfully";
                  document.getElementById("alert").style.display = "block";
                  setTimeout(() => {
                    document.getElementById("alert").style.display = "none";
                  }, 1000);
                }

                localStorage.setItem("movies", JSON.stringify(moviearray));
              },
              false
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}
input.addEventListener("input", fun);
