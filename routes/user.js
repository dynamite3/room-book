import express, { response } from "express"
import { createConnection } from "../index.js";

const router=express.Router();

router.get("/",async(request,response)=>{
    response.send("Protected content")
})



export{router}