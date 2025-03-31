const express = require("express");
const accountController = require("../controller/accountController.js");
const router = express.Router();

router.put("/", accountController.updateUserInfo);

module.exports = router;
