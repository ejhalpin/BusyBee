const { pbkdf2Sync } = require("crypto");
const db = require("../models");

module.exports = {
  getToken: (req, res) => {
    var token = pbkdf2Sync(
      req.body.password,
      req.body.email,
      100000,
      16,
      "sha512"
    ).toString("hex");
    res.json({ token });
  },

  compareToken: async (req, res) => {
    var user = await db.User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.json({ err: "invalid email" });
    }
    var compToken = pbkdf2Sync(
      req.body.password,
      req.body.email,
      100000,
      16,
      "sha512"
    ).toString("hex");
    if (user.token === compToken) {
      res.json({ user });
    } else {
      res.json({ err: "invalid password" });
    }
  }
};
