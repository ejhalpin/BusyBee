const router = require("express").Router();
const userController = require("../../controllers/user.controller");

router.route("/").post(userController.createUser);
router
  .route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser);

module.exports = router;
