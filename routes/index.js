const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('../utils/utils');
const { requireAuth } = require("../auth/auth.js")


/* GET home page. */
router.get('/', csrfProtection, function(req, res, next) {
  res.render('index', { title: 'To Doom List', csrfToken: req.csrfToken() });
});

module.exports = router;
