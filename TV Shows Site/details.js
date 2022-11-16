const params = new URLSearchParams(window.location.search);

const body = document.querySelector("body");
const detailsCont = document.querySelector(".detailscont");
let id = params.get("id");

let movies = JSON.parse(localStorage.getItem("movieDetails"));

for (let m of movies) {
  console.log(m, id);
  if (m.id == id) {
    let img = document.createElement("img");
    img.src = m.image;
    let h2 = document.createElement("h2");
    h2.innerHTML = m.name;
    let btn = document.createElement("a");
    let favArray = JSON.parse(localStorage.getItem("movies"));
    let flag = false;
    for (let ele of favArray) {
      if (ele.id == m.id) {
        flag = true;
        break;
      }
    }
    if (flag) {
      btn.innerHTML = `<i class="fa fa-heart" style="font-size:23px;color:red"></i>`;
    } else {
      btn.innerHTML = `<i class="fa fa-heart" style="font-size:23px;color:white"></i>`;
    }

    btn.classList.add("heart");
    btn.addEventListener("click", () => {
      let flag = false;
      for (let ele of favArray) {
        if (ele.id == id) {
          flag = true;
        }
      }
      if (flag) {
        btn.innerHTML = `<i class="fa fa-heart" style="font-size:23px;color:white"></i>`;
        for (let ind in favArray) {
          if (favArray[ind].id == m.id) {
            favArray.splice(ind, 1);
            document.getElementById("alert").style.backgroundColor = "red";
            document.getElementById("alert").innerHTML =
              "Favorites Removed successfully";
            document.getElementById("alert").style.display = "block";
            setTimeout(() => {
              document.getElementById("alert").style.display = "none";
            }, 1000);
            break;
          }
        }
      } else {
        favArray.push(m);
        btn.innerHTML = `<i class="fa fa-heart" style="font-size:23px;color:red"></i>`;
        document.getElementById("alert").style.backgroundColor = "green";
        document.getElementById("alert").innerHTML =
          "Favorites Added successfully";
        document.getElementById("alert").style.display = "block";
        setTimeout(() => {
          document.getElementById("alert").style.display = "none";
        }, 1000);
      }
      localStorage.setItem("movies", JSON.stringify(favArray));
    });

    detailsCont.appendChild(img);
    detailsCont.appendChild(h2);
    detailsCont.appendChild(btn);
    break;
  }
}
