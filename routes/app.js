const express = require("express");
const { db } = require("../config");
const router = express.Router();

/* GET home page. */
// router.get("/", function (req, res, next) {
//   const schemes = fetch("/schemes")
//   //todo: add tasks
//   res.render("app", { tasks, schemes });
// });
router.post("/schemes", (req, res) => {
  //destructure req to get Scheme name and Villain id
  const scheme = await db.Scheme.create()
  res.json(scheme)
})


router.get("/schemes/:schemeid", async (req, res) => {
  const id = req.params.id
  const scheme = await db.Scheme.findByPk(id)
  res.json()
})

router.put("/schemes/:schemeid", (req, res) => {
  
})

router.delete("/schemes/:schemeid", (req, res) => {

})

router.post("/ploys", (req, res) => {
  res.json("/", {})
})

router.get("/ploys/:ployid", (req, res) => {
  await 
  res.json()
})

router.put("/ploys/:ployid", (req, res) => {
  res.render("app", {})
})
router.delete("/ploys/:ployid", (req, res) => {
  res.json()
})
module.exports = router;
