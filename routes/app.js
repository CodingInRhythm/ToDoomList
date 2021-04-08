const express = require("express");
const db = require('../db/models')
const router = express.Router();
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const { csrfProtection, asyncHandler } = require('../utils/utils');
const { requireAuth } = require("../auth/auth.js")



/* GET home page. */

router.get("/", requireAuth, asyncHandler ( async (req, res, next) => {
  const { userId } = req.session.auth
  const user = await db.Villain.findByPk( userId )
  res.render("app", { user });
}));

router.get("/")

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
//Not sure how dueAt is going to be updated
router.put("/ploys/:ployid", async (req, res) => {
  const {name, schemeId, completed} = req.body
  const id = parseInt(req.params.ployid, 10)
  const ploy = await db.Ploy.findByPk(id)
  await ploy.update({
    name,
    schemeId,
    completed
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

router.get("/search/:string", async (req, res) => {
  //destructure regEx to search for task
  const string = req.params.string //not called this
  const ploys = await db.Ploy.findAll({
    where: {
      name: {
      [Op.substring]: string,
      }
    },
  });
  res.json({ ploys });
});

module.exports = router;
