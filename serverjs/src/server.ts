import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app.ts";
import { setupWebSocket } from "./ws/socketHandler.ts";

const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


setupWebSocket(io);

httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
