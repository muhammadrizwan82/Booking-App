import express from "express"
const router = express.Router()

import { createUser, updateUser, deleteUser, getUser, getUsers } from "../controller/User.js";
import { verifyToken } from "../utils/verifyToken.js";
//Create
router.get("/checkauthentication", verifyToken, (req, res, next) => {
    res.send("hello user, you are authenticated")
});

//Create
router.post("/", createUser);
//Update
router.put("/:id", updateUser);
//Delete
router.delete("/:id", deleteUser);
//Get
router.get("/:id", getUser);
//GetAll
router.get("/", getUsers);


export default router;