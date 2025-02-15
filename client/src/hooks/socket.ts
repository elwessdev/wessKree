import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = () => {
    const [socket, setSocket] = useState<any>(null);

    useEffect(() => {
        const newSocket = io("http://localhost:3000", { transports: ["websocket"] });
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("Connected to WebSocket Server:", newSocket.id);
        });

        newSocket.on("disconnect", () => {
            console.log("Disconnected from WebSocket Server");
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    return socket;
};
