let moviesArray = JSON.parse(localStorage.getItem("movies"));
let favCont = document.querySelector(".favCont");

console.log(moviesArray);
for (let ele of moviesArray) {
  let div = document.createElement("div");
  let div1 = document.createElement("div");
  div.classList.add("favItem");
  let img = document.createElement("img");
  img.src = ele.image;
  div1.appendChild(img);
  let p = document.createElement("p");
  p.innerHTML = ele.name;
  let btn = document.createElement("a");
  btn.innerHTML = `<i class="fa fa-heart" style="font-size:23px;color:red"></i>`;
  btn.classList.add("heart");
  let a = document.createElement("a");
  a.classList.add("favdetails");
  a.innerHTML = "Details";
  a.href = `details.html?id=${ele.id}`;

  div.appendChild(div1);
  div.appendChild(p);
  div.appendChild(btn);
  div.appendChild(a);
  favCont.appendChild(div);

  btn.addEventListener("click", () => {
    for (let i in moviesArray) {
      if (moviesArray[i].id == ele.id) {
        moviesArray.splice(i, 1);
        document.getElementById("alert").style.backgroundColor = "red";
        document.getElementById("alert").innerHTML =
          "Favorites Removed successfully";
        document.getElementById("alert").style.display = "block";
        setTimeout(() => {
          document.getElementById("alert").style.display = "none";
        }, 1000);
        localStorage.setItem("movies", JSON.stringify(moviesArray));
        break;
      }
    }
    div.remove();
  });
}
