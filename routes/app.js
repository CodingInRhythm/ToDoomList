const express = require("express");
const db = require('../db/models')
const router = express.Router();



/* GET home page. */
router.get("/", function (req, res, next) {
  
  res.render("app");
});

//works
router.post("/schemes", async (req, res) => {
   const { name, villainId } = req.body;
  const scheme = await db.Scheme.create({
    name,
    villainId
  })
  res.json({scheme})
})

//works
router.get("/schemes/:schemeid", async (req, res) => {
  const id = parseInt(req.params.schemeid, 10)
  const scheme = await db.Scheme.findByPk(id)
  res.json({scheme})
})

//works
router.put("/schemes/:schemeid", async (req, res) => {
  const { name, villainId } = req.body;
  const id = parseInt(req.params.schemeid, 10)
  const scheme = await db.Scheme.findByPk(id) 
  await scheme.update({
    name,
    villainId
  })
  res.json({scheme})
})

//cannot delete a scheme without deleting its ploys.  How to include ploys?
router.delete("/schemes/:schemeid", async (req, res) => {
  const id = parseInt(req.params.schemeid, 10)
  const scheme = await db.Scheme.findByPk(id)
  
  await scheme.destroy()
  res.status(204).end()
})

//works
router.post("/ploys", async (req, res) => {
  const {name, schemeId} = req.body
  const ploy = await db.Ploy.create({
    name,
    schemeId
  })
  res.json({ploy})
})

//works
router.get("/ploys/:ployid", async (req, res) => {
  const id = parseInt(req.params.ployid, 10)
  const ploy = await db.Ploy.findByPk(id) 
  res.json({ploy})
})

//works
router.put("/ploys/:ployid", async (req, res) => {
  const {name, schemeId} = req.body
  const id = parseInt(req.params.ployid, 10)
  const ploy = await db.Ploy.findByPk(id)
  await ploy.update({
    name,
    schemeId
  })
  res.json({ploy})
})

//works
router.delete("/ploys/:ployid", async (req, res) => {
  const id = parseInt(req.params.ployid, 10)
  const ploy = await db.Ploy.findByPk(id)
  await ploy.destroy()
  res.status(204).end()
})
module.exports = router;
