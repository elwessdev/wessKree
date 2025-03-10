import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
// import { rateLimit } from 'express-rate-limit'

import connectDB from "./config/db.mjs";
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


// // Rate Limiting
// const limiter = rateLimit({
// 	windowMs: 15 * 60 * 1000, // 15 minutes
// 	limit: 100, // 15 request per windowMS (15 minutes)
//     message: "Too many requests from this IP, please try again after 15 minutes",
// 	standardHeaders: 'draft-8',
// 	legacyHeaders: false
// });
// app.use(limiter);

// Socket
const server = http.createServer(app);
export const io = new Server(server);

export const users = new Map();
export const chatSessions = new Map();

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    // Register user
    socket.on("registerUser", (userId) => {
        users.set(userId, { socketId: socket.id, activeChats: [] });
        console.log(`User registered: ${userId}`);
    });
    
    // Join chat
    socket.on("joinChat", ({ chatId, userId }) => {
        socket.join(chatId);
        const user = users.get(userId);
        if (user) {
            user.activeChats.push(chatId);
        }
        chatSessions.set(chatId, chatSessions.get(chatId) || []);
        chatSessions.get(chatId).push(userId);
        // console.log(`${userId} joined chat ${chatId}`);
    });
    // Leave chat
    socket.on("leaveChat", ({ chatId, userId }) => {
        socket.leave(chatId); 
        const user = users.get(userId);
        if (user) {
            user.activeChats = user.activeChats.filter(id => id !== chatId);
        }
        // console.log(`${userId} left chat ${chatId}`);
    });

    // Disconnect user
    socket.on("disconnect", () => {
        users.forEach((userData, userId) => {
            if (userData.socketId === socket.id) {
                users.delete(userId);
                console.log(`User disconnected: ${userId}`);
            }
        });
    });
});

// Connect to Database and Start Server
// let serverGlobal;
const startServer = async () => {
    try {
        await connectDB();
        console.log("Database Connected ✅");
        app.listen((process.env.PORT || 3000), () => {
            console.log(`Server running on port ${process.env.PORT || 3000}`);
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


// export { app, serverGlobal, startServer };