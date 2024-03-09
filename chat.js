// chat
socket.on("message", (data) => {
  console.log("data from socket: ", data);

  const item = document.createElement("li");
  item.classList = "curved-arrow";

  let div = document.createElement("div");
  div.classList = "chatFrame";

  let div_top = document.createElement("div");
  div_top.classList = "chatLine";

  let div_bot = document.createElement("div");

  let name = document.createElement("p");
  name.innerHTML = data.name;
  let message = document.createElement("p");
  message.innerHTML = data.message;
  let date = document.createElement("p");
  date.innerHTML = data.date;

  div_top.appendChild(name);
  div_top.appendChild(date);

  div_bot.appendChild(message);

  div.appendChild(div_top);
  div.appendChild(div_bot);

  // item.textContent = div;
  item.appendChild(div);

  messages.appendChild(item);
});
function moveChat() {
  let roomChat = document.getElementById("roomChat");

  if (roomChat.style.right != "2%") {
    roomChat.style.right = "2%";
    roomChat.style.left = "auto";
    roomChat.style.top = "2%";
  } else {
    roomChat.style.right = "-100%";
    roomChat.style.left = "auto";
    roomChat.style.top = "2%";
  }
}

var draggable = document.getElementById("messages");
var divMove = document.getElementById("roomChat");

var posX = 0,
  posY = 0,
  mouseX = 0,
  mouseY = 0;

draggable.addEventListener("mousedown", mouseDown, false);
window.addEventListener("mouseup", mouseUp, false);

function mouseDown(e) {
  e.preventDefault();
  posX = e.clientX - divMove.offsetLeft;
  posY = e.clientY - divMove.offsetTop;
  window.addEventListener("mousemove", moveElement, false);
}

function mouseUp() {
  window.removeEventListener("mousemove", moveElement, false);
}

function moveElement(e) {
  mouseX = e.clientX - posX;
  mouseY = e.clientY - posY;
  divMove.style.left = mouseX + "px";
  divMove.style.top = mouseY + "px";
}
