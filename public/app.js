const $form = document.querySelector("#form");
const $message = document.querySelector("#message");
const $messages = document.querySelector("#messages");
let roomSelected = "";

const socket = io("/chat");

// enviar un mensaje a la sala room
$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = $message.value;
  if (message.trim() === "") {
    alert("Escribe un mensaje");
    return;
  }

  if (roomSelected === "") {
    alert("Selecciona una sala");
    return;
  }

  socket.emit("message", {
    room: roomSelected,
    message,
  });
  // $message.value = "";
  $form.reset();
});

// escuchar los mensajes de la sala room1
socket.on("message", (message) => {
  $messages.innerHTML += `<li>${message}</li>`;
});

const room = (room) => {
  roomSelected = room;

  $messages.innerHTML = "";

  // unirse a la sala 
  socket.emit("joinRoom", roomSelected);
};

// Salir de la sala
const leaveRoom = () => {
  socket.emit("leaveRoom", roomSelected);
  roomSelected = "";
  alert("Has abandonado la sala");

  // Limpiar mensajes
  $messages.innerHTML = "";
};