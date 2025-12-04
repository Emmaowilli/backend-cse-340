const utilities = require(".")
const { body, validationResult } = require("express-validator")

/**************************************
 * REGISTRATION RULES
 **************************************/
const registrationRules = () => {
  return [
    body("firstname")
      .trim()
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters long."),

    body("lastname")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Last name must be at least 2 characters long."),

    body("email")
      .trim()
      .isEmail()
      .withMessage("A valid email is required."),

    body("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters."),
  ]
}

/**************************************
 * CHECK REGISTRATION DATA
 **************************************/
const checkRegData = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    return res.render("account/registration", {
      title: "Registration",
      nav,
      errors: errors.array(),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
    })
  }
  next()
}

/**************************************
 * LOGIN RULES
 **************************************/
const loginRules = () => {
  return [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email."),

    body("password")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Password is required."),
  ]
}

/**************************************
 * CHECK LOGIN DATA
 **************************************/
const checkLoginData = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    return res.render("account/login", {
      title: "Login",
      nav,
      errors: errors.array(),
      email: req.body.email,
    })
  }
  next()
}

/**************************************
 * UPDATE ACCOUNT RULES
 **************************************/
const updateRules = () => {
  return [
    body("firstname")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Provide a valid first name."),

    body("lastname")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Provide a valid last name."),

    body("email")
      .trim()
      .isEmail()
      .withMessage("Provide a valid email address."),
  ]
}

/**************************************
 * CHECK UPDATE DATA
 **************************************/
const checkUpdateData = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    return res.render("account/update-account", {
      title: "Edit Account",
      nav,
      errors: errors.array(),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
    })
  }
  next()
}

module.exports = {
  registrationRules,
  checkRegData,
  loginRules,
  checkLoginData,
  updateRules,
  checkUpdateData
}



