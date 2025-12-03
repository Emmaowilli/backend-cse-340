// controllers/accountController.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const accountModel = require("../models/account-model");
const invModel = require("../models/inventory-model");
const utilities = require("../utilities");

const accountController = {};

/**************************************
 * Load Navigation
 **************************************/
async function loadNav() {
  const classData = await invModel.getClassifications();
  return utilities.getNav(classData);
}

/**************************************
 * LOGIN VIEW
 **************************************/
accountController.buildLogin = async (req, res) => {
  const nav = await loadNav();
  res.render("account/login", {
    title: "Login",
    nav,
    message: null,
    errors: null,
    email: ""
  });
};

/**************************************
 * REGISTER VIEW
 **************************************/
accountController.buildRegister = async (req, res) => {
  const nav = await loadNav();
  res.render("account/registration", {
    title: "Register",
    nav,
    message: null,
    errors: null,
    firstname: "",
    lastname: "",
    email: ""
  });
};

/**************************************
 * REGISTER ACCOUNT
 **************************************/
accountController.registerAccount = async (req, res) => {
  try {
    const nav = await loadNav();
    const { firstname, lastname, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const regResult = await accountModel.registerAccount(
      firstname,
      lastname,
      email,
      hashedPassword
    );

    if (!regResult) {
      return res.status(500).render("account/registration", {
        title: "Register",
        nav,
        message: "Registration failed. Try again.",
        errors: null,
        firstname,
        lastname,
        email
      });
    }

    return res.redirect("/account/login");
  } catch (error) {
    console.error("Register Error:", error);
  }
};

/**************************************
 * LOGIN ACCOUNT
 **************************************/
accountController.loginAccount = async (req, res) => {
  try {
    const nav = await loadNav();
    const { email, password } = req.body;

    const accountData = await accountModel.getAccountByEmail(email);

    if (!accountData) {
      return res.status(400).render("account/login", {
        title: "Login",
        nav,
        message: "Invalid email or password.",
        errors: null,
        email
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      accountData.account_password
    );

    if (!validPassword) {
      return res.status(400).render("account/login", {
        title: "Login",
        nav,
        message: "Incorrect password.",
        errors: null,
        email
      });
    }

    // Store user in session
    req.session.accountData = {
      account_id: accountData.account_id,
      account_firstname: accountData.account_firstname,
      account_lastname: accountData.account_lastname,
      account_email: accountData.account_email,
      account_type: accountData.account_type
    };

    // Issue JWT
    const token = jwt.sign(req.session.accountData, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });

    res.redirect("/account/manage");
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send("Login failed.");
  }
};

/**************************************
 * ACCOUNT MANAGEMENT PAGE
 **************************************/
accountController.buildAccountManagement = async (req, res) => {
  const nav = await loadNav();
  const account = req.session.accountData || null;

  res.render("account/account-management", {
    title: "Account Management",
    nav,
    message: null,
    errors: null,
    account
  });
};

/**************************************
 * EDIT ACCOUNT VIEW
 **************************************/
accountController.buildUpdateAccount = async (req, res) => {
  const nav = await loadNav();
  const account = req.session.accountData;

  if (!account) {
    return res.redirect("/account/login");
  }

  res.render("account/update-account", {
    title: "Update Account",
    nav,
    account,
    errors: null,
    message: null
  });
};

/**************************************
 * UPDATE ACCOUNT PROCESS
 **************************************/
accountController.updateAccount = async (req, res) => {
  const nav = await loadNav();
  const { account_id, firstname, lastname, email } = req.body;

  const updateResult = await accountModel.updateAccount(
    account_id,
    firstname,
    lastname,
    email
  );

  if (!updateResult) {
    return res.status(500).render("account/update-account", {
      title: "Update Account",
      nav,
      account: req.session.accountData,
      message: "Error updating account.",
      errors: null
    });
  }

  // Update session details
  req.session.accountData.account_firstname = firstname;
  req.session.accountData.account_lastname = lastname;
  req.session.accountData.account_email = email;

  res.redirect("/account/manage");
};

/**************************************
 * LOGOUT
 **************************************/
accountController.logout = (req, res) => {
  res.clearCookie("jwt");
  req.session.destroy(() => {
    return res.redirect("/");
  });
};

module.exports = accountController;








