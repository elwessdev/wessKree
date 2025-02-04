import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.mjs";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.mjs"
import propertyRoutes from "./routes/property.mjs"
import userRoutes from "./routes/user.mjs"

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

// Testing Endpoint
app.get("/",(req,res)=>{
    res.status(200).send("Server work");
})

// Routes
app.use("/auth", authRoutes);
app.use("/property", propertyRoutes);
app.use("/user", userRoutes);