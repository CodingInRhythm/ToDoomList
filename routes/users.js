const express = require('express');
const router = express.Router();

//TODO: Set up the GET routes:
router.get("/login", (req, res) => {

    res.render('login', {title: "Login"})
})

router.post("/login", (req, res) => {
  res.redirect("/")
})

router.get("/sign-up", (req, res) => {
  res.render('sign-up', {title: "Sign Up"});
})

router.post("/sign-up", (req, res) => {
  res.redirect("/");
})

// router.get('')
module.exports = router;
