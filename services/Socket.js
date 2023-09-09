import { Server as SocketServer } from "socket.io";

class Socket {
    static init(server) {
        this.io = new SocketServer(server, {
            cors: "*",
        });
        this.io.on("connection", this.handleConnect);
    }

    static handleConnect = (client) => {
        client.on("doors-change", (data) => {
            const { openDoors } = data;
            this.io.emit("doors-change", {
                openDoors,
            });
        });
    }

}

export default Socket;
