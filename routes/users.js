const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { loginUser, logoutUser } = require("../auth/auth.js");
const { csrfProtection, asyncHandler } = require('../utils/utils');




const db = require('../db/models');
const { Sequelize } = require('../db/models');
const Op = Sequelize.Op

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

const makeSignUpErrorsObj = (errs) => {
  const errsObj = {};

  errs.forEach(err => {

    if (err === 'Please provide a value for First Name') {
      errsObj.firstNameE1 = err
    } else if (err === 'First Name must not be more than 50 characters long') {
      errsObj.firstNameE2 = err


    } else if (err === 'Please provide a value for userName') {
      errsObj.userNameE1 = err
    } else if (err === 'userName must not be more than 50 characters long') {
      errsObj.userNameE2 = err
    } else if (err === 'The provided userName is already in use by another Villain') {
      errsObj.userNameE3 = err


    } else if (err === 'Please provide a value for Email Address') {
      errsObj.emailE1 = err
    } else if (err === 'Email Address must not be more than 255 characters long') {
      errsObj.emailE2 = err
    } else if (err === 'Email Address is not a valid email') {
      errsObj.emailE3 = err
    } else if (err === 'The provided Email Address is already in use by another Villain') {
      errsObj.emailE4 = err


    } else if (err === 'Please provide a value for Password') {
      errsObj.passwordE1 = err
    } else if (err === 'Password must not be more than 50 characters long') {
      errsObj.passwordE2 = err
    } else if (err === 'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")') {
      errsObj.passwordE3 = err


    } else if (err === 'Please provide a value for Confirm Password') {
      errsObj.passwordConE1 = err
    } else if (err === 'Confirm Password must not be more than 50 characters long') {
      errsObj.passwordConE2 = err
    } else if (err === 'Confirm Password does not match Password') {
      errsObj.passwordConE3 = err
    }
  })

  return errsObj
}

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
    pageTitle: "Login", //? Brian needs to explain this.
    userName,
    errors,
    csrfToken: req.csrfToken()
  })
}))

router.get("/sign-up", csrfProtection, asyncHandler(async (req, res) => {
  let user = Villain.build();

  res.render('sign-up', { pageTitle: "Sign Up", errsObj: {}, user, csrfToken: req.csrfToken()});
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
    console.log('#########made if block#########')
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashedPassword = hashedPassword;
    await user.save();
    loginUser(req, res, user);
    res.redirect("/app/welcome");
  } else {
    const errors = validatorErrors.array().map((error) => error.msg)
    console.log('Errorz: ', errors)
    const errsObj = makeSignUpErrorsObj(errors)
    console.log('Errorzzz: ', errsObj)
    res.render('sign-up', {
      pageTitle: "Sign Up",
      user,
      errors,
      errsObj,
      csrfToken: req.csrfToken()
    })
  }
  
}))



// deleteDemoUsers = async () => {
//   // console.log(Op)
//   demoUsersArr = await Villain.findAll({
//     where: {
//       email: {
//         [Op.substring]: 'demo'
//       }
//     }
//   })
  
//   demoUsersArr.forEach(async user => {
//     await user.destroy();
//   }) 
// }

// setInterval(deleteDemoUsers, 1000 * 60)

module.exports = router;
