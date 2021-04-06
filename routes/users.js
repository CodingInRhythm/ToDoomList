const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const { csrfProtection, asyncHandler } = require('../utils/utils');



const db = require('../db/models')

const { Villain } = db;

const userValidators = [
  check('title')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a value for Title')
  .isLength({ max: 50 })
  .withMessage('Title must not be more than 50 characters long'),
  check('firstName')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a value for First Name')
  .isLength({ max: 50 })
  .withMessage('First Name must not be more than 50 characters long'),
check('lastName')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a value for Last Name')
  .isLength({ max: 50 })
  .withMessage('Last Name must not be more than 50 characters long'),
check('username')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a value for Username')
  .isLength({ max: 50 })
  .withMessage('Username must not be more than 50 characters long'),
check('emailAddress')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a value for Email Address')
  .isLength({ max: 255 })
  .withMessage('Email Address must not be more than 255 characters long')
  .isEmail()
  .withMessage('Email Address is not a valid email'),
check('password')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a value for Password')
  .isLength({ max: 50 })
  .withMessage('Password must not be more than 50 characters long')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
  .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
check('confirmPassword')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a value for Confirm Password')
  .isLength({ max: 50 })
  .withMessage('Confirm Password must not be more than 50 characters long'),

];


//TODO: Set up the GET routes:
router.get("/login", csrfProtection, asyncHandler(async (req, res) => {
    let user = Villain.build();
    res.render('login', {pageTitle: "Login", csrfToken: req.csrfToken()})
}))

router.post("/login", csrfProtection, asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  res.redirect("/")
}))

router.get("/sign-up", csrfProtection, asyncHandler(async (req, res) => {
  let user = Villain.build();

  res.render('sign-up', {pageTitle: "Sign Up", user, csrfToken: req.csrfToken()});
}))

router.post("/sign-up", csrfProtection, userValidators, asyncHandler(async (req, res) => {
  const { title, firstName, lastName, username, email, password, confirmPassword } = req.body;

  const user = Villain.build({
    title, firstName, lastName, username, email,
  });

  const validatorErrors = validationResult(req);

  if(validatorErrors.isEmpty()){
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashedPassword = hashedPassword;
    await user.save();
    res.redirect("/app");
  } else {
    const errors = validatorError.array().map((error) => error.msg)
    res.render('sign-up', {
      pageTitle: "Sign Up",
      user,
      errors,
      csrfToken: req.csrfToken()
    })
  }

}))

// router.get('')
module.exports = router;
