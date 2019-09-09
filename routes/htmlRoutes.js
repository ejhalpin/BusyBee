//package dependencies
var path = require("path");
var moment = require("moment");
let cookieparser = require("cookie-parser");

module.exports = function(app) {
  //load the index page
  app.get("/", (req, res) => {
    var cookieObject = parseCookie(req);

    res.cookie("sessid", "12345abc", { maxAge: 1000 }).sendFile(path.join(__dirname, "../public/index.html"));
  });
};

function parseCookie(req) {
  var cookieObject = { cookies: req.cookies, signedCookies: req.cookies };
  return cookieObject;
}
