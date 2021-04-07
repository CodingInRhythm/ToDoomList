const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("app", { title: "To Doom List" });
});

module.exports = router;
