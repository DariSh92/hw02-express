const express = require("express");
const { users: controller } = require("../../controllers");
const router = express.Router();
const { validation, auth, upload } = require("../../middlewares");
const { passwordJoiSchema, loginJoiSchema } = require("../../models/users");

router.get("/current", auth, controller.getCurrent);

router.get("/logout", auth, controller.logout);

router.post("/signup", validation(passwordJoiSchema), controller.signup);

router.post("/login", validation(loginJoiSchema), controller.login);

router.patch(
  "/users/avatars",
  auth,
  upload.single("avatar"),
  controller.updateAvatar
);

module.exports = router;
