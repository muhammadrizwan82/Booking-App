import express from "express"
const router = express.Router()

router.get("/", (req, res) => {
    res.send("hello, this is auth endpoints");
});

router.get("/register", (req, res) => {
    res.send("hello, this is register endpoints");
});

router.get("/login", (req, res) => {
    res.send("hello, this is login endpoints");
});

router.get("/logout", (req, res) => {
    res.send("hello, this is logout endpoints");
});

export default router;