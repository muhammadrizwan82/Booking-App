import express from "express"
import { register, login } from '../controller/auth.js'


const router = express.Router()

router.get("/", (req, res) => {
    res.send("hello, this is auth endpoints");
});

router.post("/register", register);

router.post("/login", login);

router.get("/logout", (req, res) => {
    res.send("hello, this is logout endpoints");
});

export default router;