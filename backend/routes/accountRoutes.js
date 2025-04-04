const express = require("express");
const accountController = require("../controller/accountController.js");
const { upload } = require("../lib/multerUpload.js");
const router = express.Router();

router.put("/user-info", accountController.updateUserInfo);
router.put("/profile-image", upload, accountController.updateProfileImage);

module.exports = router;
