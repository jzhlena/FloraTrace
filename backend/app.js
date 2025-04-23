import express from "express";
import dotenv from "dotenv";

import { connect_db } from './config/db.js';

import flower_routes from "./routes/flower.router.js"

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/api/flowers", flower_routes);

app.get("/", (req, res) => {
    res.send("Server is ready")
})

app.listen(port, () => {
    connect_db();
    console.log("Server started at http://localhost:" + port);
});