import { Server, Socket } from "socket.io";

export const setupWebSocket = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on("message", (msg) => {
            console.log(`Message from ${socket.id}: ${msg}`);
            io.emit("message", { sender: socket.id, text: msg });
        });

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
};
