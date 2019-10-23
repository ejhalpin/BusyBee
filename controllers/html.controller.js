var path = require("path");
var moment = require("moment");

module.exports = {
  //load the index page
  getIndex: (req, res) => {
    console.log(req);
    res
      .cookie("sessid", "12345abc", { maxAge: 1000 })
      .sendFile(path.join(__dirname, "../public/index.html"));
  }
};

function parseCookie(req) {}
