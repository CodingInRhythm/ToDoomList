const express = require("express");
const db = require('../db/models')
const router = express.Router();
const { csrfProtection, asyncHandler } = require('../utils/utils');
const { requireAuth } = require("../auth/auth.js")



/* GET home page. */

router.get("/", requireAuth, asyncHandler ( async (req, res, next) => {
  const { userId } = req.session.auth
  const user = await db.Villain.findByPk( userId )
  res.render("app", { user });
}));


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
  const ploys = await db.Ploy.findAll({
    where: {
      schemeId: id
    }
  })
  res.json({scheme, ploys})
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

//works
router.delete("/schemes/:schemeid", async (req, res) => {
  const id = parseInt(req.params.schemeid, 10)
  const scheme = await db.Scheme.findByPk(id)

  await scheme.destroy()
  res.status(204).end()
})

//works
router.post("/ploys", async (req, res) => {
  const {name, schemeId, completed, dueAt} = req.body
  const ploy = await db.Ploy.create({
    name,
    schemeId,
    completed,
    dueAt
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
