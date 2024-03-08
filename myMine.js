let tds = document.querySelectorAll("td");
tds.forEach((td) => {
  td.addEventListener("click", function () {
    let parentTd = this.parentNode;
    // console.log(parentTd)

    let childrenDivs = td.querySelector("div");
    let body = childrenDivs.querySelector("img");
    let corp = childrenDivs.querySelector("div");

    if (corp.style.display != "flex") {
      socket.emit("action", corp, body);
      socket.on("action", corp, body);
    } else {
      socket.emit("action", corp, body);
      socket.on("action", corp, body);
    }
  });
});

let batmanSide = [
  document.getElementById("1"),
  document.getElementById("3"),
  document.getElementById("5"),
  document.getElementById("7"),
  document.getElementById("10"),
  document.getElementById("12"),
  document.getElementById("14"),
  document.getElementById("16"),
];

let jokerSide = [
  document.getElementById("49"),
  document.getElementById("51"),
  document.getElementById("53"),
  document.getElementById("55"),
  document.getElementById("58"),
  document.getElementById("60"),
  document.getElementById("62"),
  document.getElementById("64"),
];

function createChess(srcImg, id, where) {
  let chessPiece = document.createElement("div");
  let img = document.createElement("img");
  img.id = id;
  if (id < 10) {
    img.classList = "batman";
  } else {
    img.classList = "joker";
  }
  img.src = srcImg;
  img.draggable = false;
  let infoDiv = document.createElement("div");
  infoDiv.classList.add("corp");
  let p1 = document.createElement("p");
  p1.textContent = "attack";
  let p2 = document.createElement("p");
  p2.textContent = "skill";
  let p3 = document.createElement("p");
  p3.textContent = "move";
  let p4 = document.createElement("p");
  p4.textContent = "sleep";

  infoDiv.appendChild(p1);
  infoDiv.appendChild(p2);
  infoDiv.appendChild(p3);
  infoDiv.appendChild(p4);

  chessPiece.appendChild(img);
  chessPiece.appendChild(infoDiv);

  where.appendChild(chessPiece);
}

setInterval(() => createChess("asset/2.png", 1, batmanSide[0]), 500);
setInterval(() => createChess("asset/1.png", 2, batmanSide[1]), 1000);
setInterval(() => createChess("asset/2.png", 3, batmanSide[2]), 1500);
setInterval(() => createChess("asset/3.png", 4, batmanSide[3]), 2000);
setInterval(() => createChess("asset/4.png", 5, batmanSide[4]), 2000);
setInterval(() => createChess("asset/3.png", 6, batmanSide[5]), 1500);
setInterval(() => createChess("asset/5.png", 7, batmanSide[6]), 1000);
setInterval(() => createChess("asset/4.png", 8, batmanSide[7]), 500);

setInterval(() => createChess("asset/12.png", 11, jokerSide[0]), 500);
setInterval(() => createChess("asset/11.png", 12, jokerSide[1]), 1000);
setInterval(() => createChess("asset/12.png", 13, jokerSide[2]), 1500);
setInterval(() => createChess("asset/13.png", 14, jokerSide[3]), 2000);
setInterval(() => createChess("asset/14.png", 15, jokerSide[4]), 2000);
setInterval(() => createChess("asset/13.png", 16, jokerSide[5]), 1500);
setInterval(() => createChess("asset/14.png", 17, jokerSide[6]), 1000);
setInterval(() => createChess("asset/cat.gif", 18, jokerSide[7]), 500);
