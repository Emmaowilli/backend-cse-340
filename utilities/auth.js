const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.ACCESS_TOKEN_SECRET || "superSecretKey123!@#";

function getTokenFromCookies(req) {
 
  return req.cookies?.jwt || null;
}
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
    res.locals.accountData = payload; 
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
