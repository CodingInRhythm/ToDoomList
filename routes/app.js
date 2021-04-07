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
  res.json({scheme})
})


router.get("/schemes/:schemeid", async (req, res) => {
  const id = parseInt(req.params.schemeid, 10)
  const scheme = await db.Scheme.findByPk(id)
  res.json({scheme})
})

router.put("/schemes/:schemeid", async (req, res) => {
  const id = parseInt(req.params.schemeid, 10)
  const scheme = await db.Scheme.findByPk(id) 
  await scheme.update()
  res.json({scheme})
})

router.delete("/schemes/:schemeid", async (req, res) => {
  const id = parseInt(req.params.schemeid, 10)
  const scheme = await db.Scheme.findByPk(id)
  
  await scheme.destroy()
  res.status(204).end()
})

router.post("/ploys", (req, res) => {
  //destructure req to get Scheme name and Villain id
  const ploy = await db.Ploy.create()
  res.json({ploy})
})

router.get("/ploys/:ployid", (req, res) => {
  const id = parseInt(req.params.ployid, 10)
  const ploy = await db.Ploy.findByPk(id) 
  res.json({ploy})
})

router.put("/ploys/:ployid", (req, res) => {
  const id = parseInt(req.params.ployid, 10)
  const ploy = await db.Ploy.findByPk(id)
  await ploy.update()
  res.json({ploy})
})
router.delete("/ploys/:ployid", (req, res) => {
  const id = parseInt(req.params.ployid, 10)
  const ploy = await db.Ploy.findByPk(id)
  await ploy.destroy()
  res.status(204).end()
})
module.exports = router;
