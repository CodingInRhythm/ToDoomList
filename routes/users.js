const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//TODO: Set up the GET routes:
router.get("/login", (req, res) => {

    res.render('login', {title: "Login"})
})

// router.get('')
module.exports = router;
