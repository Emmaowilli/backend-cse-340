// utilities/auth.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

function getTokenFromCookies(req) {
  // cookie name used by this project (adjust if different)
  return req.cookies && req.cookies.token ? req.cookies.token : null;
}

// middleware that tries to decode token and set res.locals.account if valid
function checkAuth(req, res, next) {
  const token = getTokenFromCookies(req);
  if (!token) {
    // not logged in, simply continue (no account in locals)
    return next();
  }

  try {
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET);
    // payload should contain account info (account_id, account_firstname, account_type, etc.)
    res.locals.account = payload;
  } catch (err) {
    // invalid token: clear cookie and continue
    res.clearCookie("token");
    res.locals.account = null;
  }
  return next();
}

// middleware that enforces employee/admin access
function checkAdminOrEmployee(req, res, next) {
  const token = getTokenFromCookies(req);
  if (!token) {
    req.flash("error", "Please login to access that page.");
    return res.redirect("/account/login");
  }

  try {
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET);
    if (payload.account_type && (payload.account_type === "Employee" || payload.account_type === "Admin")) {
      res.locals.account = payload; // attach account info
      return next();
    } else {
      req.flash("error", "You are not authorized to access that page.");
      return res.redirect("/account/login");
    }
  } catch (err) {
    res.clearCookie("token");
    req.flash("error", "Session expired - please login again.");
    return res.redirect("/account/login");
  }
}

module.exports = {
  checkAuth,
  checkAdminOrEmployee,
};
