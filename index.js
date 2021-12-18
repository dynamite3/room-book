import express, { request, response } from"express";
import {MongoClient,ObjectId} from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

import { router as roomRouter} from "./routes/room.js";
import { router as userRouter} from "./routes/user.js";


const app=express();
dotenv.config();

const PORT=process.env.PORT;
const MONGO_URL=process.env.MONGO_URL

app.use(cors())
app.use(express.json());

app.listen(PORT,()=>console.log("server started"))

app.get("/",(request,response)=>{
    response.send("Hello from Express JS")
})

export async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    return client;
}

app.use("/rooms", roomRouter)
app.use("/users", userRouter)