import { ObjectId } from "bson";
import express, { response } from "express"
import { createConnection } from "../index.js";

const router=express.Router();

router.get("/",async(request,response)=>{
    const client = await createConnection();
    const result = await client
        .db("hall_booking")
        .collection("rooms")
        .find({})
        .toArray()
    response.send(result);
})


router.get("/bookedrooms",async(request,response)=>{
    const client = await createConnection();
    const active="active"
    const result = await client
        .db("hall_booking")
        .collection("rooms")
        .find({"state.stat" : active })
        .toArray()
    response.send(result);
})

router.get("/transactions",async(request,response)=>{
    const client = await createConnection();
    const active="active"
    const result = await client
        .db("hall_booking")
        .collection("transaction")
        .find()
        .toArray()
    response.send(result);
})

router.post("/book/:id",async(request,response)=>{
    const e = request.body
    const {id} =request.params
    const client = await createConnection();
    const result = await client
        .db("hall_booking")
        .collection("rooms")
        .updateOne({_id:ObjectId(id)},{$set:{state:{
                                                    stat:"active",
                                                    occupiedBy: e
                                                    }
                }})

    const result1 =await client
        .db("hall_booking")
        .collection("transaction")
        .insertOne({
                    occupiedByName: e.name,
                    dateofBooking:Date(),
                    startDate:e.startTime,
                    endDate:e.endTime,
                    roomId:id
            })

    response.send(result);

})

router.post("/checkout/:id",async(request,response)=>{
    const e = request.body
    const {id} =request.params
    const client = await createConnection();
    const result = await client
        .db("hall_booking")
        .collection("rooms")
        .updateOne({_id:ObjectId(id)},{$set:{state:{
                                                    stat:"empty",
                                                    occupiedBy: ""
                                                    }
                }})

    response.send(result);

})

router.get("/book/:id",async(request,response)=>{
    const {id} =request.params
    console.log(id)
    const client = await createConnection();
    const result = await client
        .db("hall_booking")
        .collection("rooms")
        .findOne({_id:ObjectId(id)})
    response.send(result);
})

router.post("/",async(request,response)=>{
    const client = await createConnection();
    const result = await client
        .db("hall_booking")
        .collection("rooms")
        .insertOne({
            roomDetails:request.body.roomDetails,
            capacity:request.body.capacity,
            amenitites:request.body.amenitites,
            prizePerHour:request.body.prizePerHour,
            state:{
                stat:"empty",
                occupiedBy:""
                },
            createdAt:Date()
        })
    response.send(result);
})

export{router}