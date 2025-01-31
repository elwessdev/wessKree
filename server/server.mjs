import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.mjs";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.mjs"

dotenv.config();
const app = express();

connectDB().then(_=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server http://localhost:${process.env.PORT}`);
    })
}).catch(_=>{
    console.log("Error in DB");
})

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes);