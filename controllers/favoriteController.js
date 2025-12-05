const favModel = require("../models/favorite-model");

async function addToFavorites(req, res) {
  if (!res.locals.loggedin) return res.redirect("/account/login");
  const { inv_id } = req.body;
  const account_id = res.locals.accountData.account_id;
  const result = await favModel.addFavorite(account_id, inv_id);
  if (result.error) {
    req.flash("error", result.error);
  } else {
    req.flash("success", "Added to favorites!");
  }
  res.redirect("back");
}

async function removeFromFavorites(req, res) {
  if (!res.locals.loggedin) return res.redirect("/account/login");
  const { inv_id } = req.params;
  const account_id = res.locals.accountData.account_id;
  await favModel.removeFavorite(account_id, inv_id);
  req.flash("success", "Removed from favorites");
  res.redirect("back");
}

async function viewFavorites(req, res) {
  if (!res.locals.loggedin) return res.redirect("/account/login");
  const account_id = res.locals.accountData.account_id;
  const favorites = await favModel.getFavoritesByAccount(account_id);
  const nav = await require("../utilities/").getNav();
  res.render("favorites/list", {
    title: "My Favorite Vehicles",
    nav,
    favorites,
    errors: null,
  });
}

module.exports = { addToFavorites, removeFromFavorites, viewFavorites };