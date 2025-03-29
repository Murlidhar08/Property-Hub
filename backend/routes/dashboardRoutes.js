const express = require("express");
const dashboardController = require("../controller/dashboardController.js");

const router = express.Router();

router.get("/counts", dashboardController.getDashboardCounts);

module.exports = router;
