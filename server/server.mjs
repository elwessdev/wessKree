import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.mjs";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/auth.mjs"
import propertyRoutes from "./routes/property.mjs"
import userRoutes from "./routes/user.mjs"
import requestRoutes from "./routes/request.mjs"
import notificationRoutes from "./routes/notification.mjs"

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://wesskree.vercel.app', 'https://dev-wesskree.vercel.app'],
    credentials: true,
}));
app.use(cookieParser());

// Socket
const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'https://wesskree.vercel.app', 'https://dev-wesskree.vercel.app'],
        credentials: true,
        methods: ["GET", "POST"],
    },
});
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // socket.on("registerUser", (userId) => {
    //     socket.userId = userId;
    //     console.log(`User registered: ${userId}`);
    // });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

// Connect to Database and Start Server
const startServer = async () => {
    try {
        await connectDB();
        console.log("Database Connected ✅");
        server.listen(process.env.PORT, () => {
            console.log(`Server running on http://localhost:${process.env.PORT}`);
        });
    } catch (error) {
        console.error("Error in DB Connection:", error);
    }
};
startServer();

// Testing Endpoint
app.get("/", (req, res) => {
    res.send("<h1>Server is running!</h1>");
});

// Routes
app.use("/auth", authRoutes);
app.use("/property", propertyRoutes);
app.use("/user", userRoutes);
app.use("/request", requestRoutes);
app.use("/notification", notificationRoutes);
