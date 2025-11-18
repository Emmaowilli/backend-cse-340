// controllers/errorController.js
const errorCont = {};

errorCont.triggerError = function (req, res, next) {
  throw new Error("Intentional 500 error for testing");
};

module.exports = errorCont;