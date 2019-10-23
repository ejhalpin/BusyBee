const router = require("express").Router();
const emailController = require("../../controllers/email.controller");

router.route("/").post(emailController.sendMessage);

module.exports = router;
