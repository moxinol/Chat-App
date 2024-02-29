import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDB from "./DB/connectToMongoDB.js";

const app = express();
//midleware to parse body
app.use(bodyParser.json());
//Get port from dotenv file or use 5000 if not present in dotenv file
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
//to parse the incomming requests with JSON payloads (from req.body)
app.use(express.json({ extended: true }));

app.get("/", (req, res) =>{
    //Root route  http://localhost:PORT/ or http://localhost:5000/
    res.send("hello world");
});


app.listen(PORT, () => {
connectToMongoDB()
console.log(`SERVER RUNNING ON PORT ${PORT}`)
});