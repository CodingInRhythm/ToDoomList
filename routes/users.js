const express = require('express');
const router = express.Router();

const db = require('../db/models')
const csrf = require('csurf')
// const { Villains } = db;

const csrfProtection = csrf({ cookie: true });

//TODO: Set up the GET routes:
router.get("/login", csrfProtection, (req, res) => {
    //let user = Villains.create();
    res.render('login', {pageTitle: "Login", csrfToken: req.csrfToken()})
})

router.post("/login", csrfProtection, (req, res) => {
  const { username, password } = req.body();
  res.redirect("/")
})

router.get("/sign-up", csrfProtection, (req, res) => {
  res.render('sign-up', {pageTitle: "Sign Up", csrfToken: req.csrfToken()});
})

router.post("/sign-up", csrfProtection, (req, res) => {
  const { title, firstName, lastName, username, email, password, confirmPassword } = req.body();
  res.redirect("/");
})

// router.get('')
module.exports = router;
