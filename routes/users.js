import express from "express"
const router = express.Router()

import { createUser, updateUser, deleteUser, getUser, getUsers } from "../controller/User.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

// //Verify token
// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("hello user, you are authenticated")
// });

// //VerifyUser
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("hello user, you are logged in and you can deleted your account")
// });

// //VerifyAdmin
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     console.log('2nd')
//     res.send("hello user, you are logged in and you can deleted user account")
// });

//Update
router.put("/:id", verifyUser, updateUser);
//Delete
router.delete("/:id", verifyUser, deleteUser);
//Get
router.get("/:id", verifyUser, getUser);
//GetAll
router.get("/", verifyAdmin, getUsers);


export default router;