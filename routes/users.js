const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { loginUser, logoutUser } = require("../auth/auth.js");
const { csrfProtection, asyncHandler } = require('../utils/utils');



const db = require('../db/models')

const { Villain } = db;


const userValidators = [
  check('firstName')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a value for First Name')
  .isLength({ max: 50 })
  .withMessage('First Name must not be more than 50 characters long'),
check('userName')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a value for userName')
  .isLength({ max: 50 })
  .withMessage('userName must not be more than 50 characters long')
  .custom((value) => {
    return Villain.findOne({ where: { userName: value } })
      .then((user) => {
        if (user) {
          return Promise.reject('The provided userName is already in use by another Villain');
        }
      });
  }),
check('email')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a value for Email Address')
  .isLength({ max: 255 })
  .withMessage('Email Address must not be more than 255 characters long')
  .isEmail()
  .withMessage('Email Address is not a valid email')
  .custom((value) => {
    return Villain.findOne({ where: { email: value } })
      .then((user) => {
        if (user) {
          return Promise.reject('The provided Email Address is already in use by another Villain');
        }
      });
  }),
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
  .withMessage('Confirm Password must not be more than 50 characters long')
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Confirm Password does not match Password');
    }
    return true;
  })
];


//TODO: Set up the GET routes:
router.get("/login", csrfProtection, asyncHandler(async (req, res) => {
    let user = Villain.build();
    res.render('login', {pageTitle: "Login", csrfToken: req.csrfToken()})
}))

router.post('/logout', (req, res) => {
  logoutUser(req, res);
  res.redirect('/');
})

const loginValidators = [
  check('userName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for username'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password'),
];

router.post("/login", csrfProtection, loginValidators, asyncHandler(async (req, res) => {
  const { userName, password } = req.body;

  let errors = [];
  const validatorErrors = validationResult(req);
  // console.log('Heloooooo')
  // console.log( await Villain.findByPk(1))
  if(validatorErrors.isEmpty()) {
    const user = await Villain.findOne( { where: { userName } });

    if (user !== null) {
      const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());

      if (passwordMatch) {
        loginUser(req, res, user);
        return res.redirect('/app')
      }
    }
    errors.push('Login failed for the provided username and password')
  } else {
    errors = validatorErrors.array().map((error) => error.msg);
  }
  res.render('login', {
    pageTitle: "", //? Brian needs to explain this.
    userName,
    errors,
    csrfToken: req.csrfToken()
  })
}))

router.get("/sign-up", csrfProtection, asyncHandler(async (req, res) => {
  let user = Villain.build();

  res.render('sign-up', {pageTitle: "Sign Up", user, csrfToken: req.csrfToken()});
}))

router.post("/sign-up", csrfProtection, userValidators, asyncHandler(async (req, res) => {
  const { title, firstName, lastName, userName, email, password, confirmPassword } = req.body;

  const user = Villain.build({
    title,
    firstName,
    lastName,
    userName,
    email
  });

  const validatorErrors = validationResult(req);

  if(validatorErrors.isEmpty()){
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashedPassword = hashedPassword;
    await user.save();
    loginUser(req, res, user);
    res.redirect("/app");
  } else {
    const errors = validatorErrors.array().map((error) => error.msg)
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
