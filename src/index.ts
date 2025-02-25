import { sequelize } from "./config/sequelize";
import app from "./app";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server);

interface User {
  id: string;
  joinedAt: Date;
}

// Login with namespace
const connectedUsers: { [key: string]: User } = {};

// namespaces
const chat = io.of("/chat");

const handleError = (error: any, socket: any) => {
  console.error("Socket error:", error);
  socket.emit("error", { message: "An error occurred", details: error.message });
};

chat.on("connection", (socket) => {
 
  socket.on("join", () => {
     connectedUsers[socket.id] = {
       id: socket.id,
       joinedAt: new Date(),
    };
     console.log(`Usuario ${connectedUsers[socket.id]} conectado`);
    chat.emit("users", Object.values(connectedUsers));
  });

  console.log("Usuario conectado: ", socket.id);
  socket.on("error", (error) => handleError(error, socket));

  // rooms
  socket.on("joinRoom", (room) => {
    try {
      socket.join(room);
      console.log("Usuario ha ingresado a la sala: ", room);
      chat.to(room).emit("message", `${socket.id} joined room: ${room}`);
    } catch (error) {
      handleError(error, socket);
    }
  });

  // enviar mensaje a todos los usuarios de la sala
  socket.on("message", ({ room, message }) => {
    try {
      chat.to(room).emit("message", `Usuario ${socket.id} dice: ${message}`);
    } catch (error) {
      handleError(error, socket);
    }
  });

  // salir de la sala
  socket.on("leaveRoom", (room) => {
    try {
      socket.leave(room);
      console.log("Usuario ha dejado la sala: ", room);
      chat.to(room).emit("message", `Usuario ${socket.id} ha dejado la sala: ${room}`);
    } catch (error) {
      handleError(error, socket);
    }
  });

  socket.on("disconnect", () => {
    delete connectedUsers[socket.id];
    console.log(`Usuario ${socket.id} desconectado`);

    chat.emit("users", Object.values(connectedUsers));
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