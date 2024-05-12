import express from "express"

import { createHotel, updateHotel, deleteHotel, getHotel, getHotels } from "../controller/hotel.js";

const router = express.Router()


//Create
router.post("/", createHotel);
//Update
router.put("/:id", updateHotel);
//Delete
router.delete("/:id", deleteHotel);
//Get
router.get("/:id", getHotel);
//GetAll
router.get("/", getHotels);


export default router;