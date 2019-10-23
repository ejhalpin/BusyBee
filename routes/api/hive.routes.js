const router = require("express").Router();
const hiveController = require("../../controllers/hive.controller");

router.route("/").post(hiveController.createHive);
router
  .route("/:id")
  .get(hiveController.getHive)
  .put(hiveController.updateHive)
  .delete(hiveController.deleteHive);

module.exports = router;
