// utilities/auth.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

// CRITICAL: Use environment variable with fallback (so it works locally AND on Render)
const SECRET = process.env.ACCESS_TOKEN_SECRET || "superSecretKey123!@#";

function getTokenFromCookies(req) {
  // Your cookie is named "jwt" — NOT "token" (this was the main bug!)
  return req.cookies?.jwt || null;
}

// Middleware: Check if user is logged in (used on every page)
async function checkAuth(req, res, next) {
  const token = getTokenFromCookies(req);

  if (!token) {
    res.locals.loggedin = false;
    res.locals.accountData = null;
    return next();
  }

  try {
    const payload = jwt.verify(token, SECRET);
    res.locals.loggedin = true;
    res.locals.accountData = payload; // contains account_id, firstname, type, etc.
  } catch (err) {
    console.log("Invalid/expired JWT → clearing cookie");
    res.clearCookie("jwt");
    res.locals.loggedin = false;
    res.locals.accountData = null;
  }
  next();
}

// Middleware: Protect /inv routes — only Employee or Admin
function checkEmployeeOrAdmin(req, res, next) {
  if (!res.locals.loggedin || !res.locals.accountData) {
    req.flash("error", "Please log in to access this page.");
    return res.redirect("/account/login");
  }

  const type = res.locals.accountData.account_type;
  if (type === "Employee" || type === "Admin") {
    return next();
  }

  req.flash("error", "Access denied. Employees and Admins only.");
  res.redirect("/account");
}

module.exports = {
  checkAuth,
  checkEmployeeOrAdmin,
};
