import { sequelize } from "./config/sequelize";
import app from "./app";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server);

// namespaces
const chat = io.of("/chat");

chat.on("connection", (socket) => {
  console.log("Usuario conectado: ", socket.id);

  // rooms
  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log("Usuario ha ingresado a la sala: ", room);

    // enviar mensaje a todos los usuarios de la sala
    chat.to(room).emit("message", `${socket.id} joined room: ${room}`);
  });

  // enviar mensaje a todos los usuarios de la sala
  socket.on("message", ({ room, message }) => {
    chat.to(room).emit("message", message);
  });

  // salir de la sala
  socket.on("leaveRoom", (room) => {
    socket.leave(room);
    console.log("Usuario ha dejado la sala: ", room);

    // enviar mensaje a todos los usuarios de la sala
    chat.to(room).emit("message", "Usuario ha dejado la sala: " + room);
  });
});


const main = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database connected");

    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();