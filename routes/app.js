const express = require("express");
const db = require('../db/models')
const router = express.Router();

const db = require('../db/models')

/* GET home page. */
// router.get("/", function (req, res, next) {
//   const schemes = fetch("/schemes")
//   //todo: add tasks
//   res.render("app", { tasks, schemes });
// });
router.post("/schemes", async (req, res) => {
  //destructure req to get Scheme name and Villain id
  const scheme = await db.Scheme.create()
  res.json(scheme)
})


router.get("/schemes/:schemeid", async (req, res) => {
  const id = req.params.id
  const scheme = await db.Scheme.findByPk(id)
  res.json()
})

router.put("/schemes/:schemeid", async (req, res) => {
  const id = req.params.id
  const scheme = await  
})

router.delete("/schemes/:schemeid", async (req, res) => {
  await db.Scheme.destroy()
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
