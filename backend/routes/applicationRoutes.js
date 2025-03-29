const express = require("express");
const applicationService = require("../controller/applicationController.js");
const router = express.Router();

// Fetch details from masters table
router.get("/property-type", applicationService.getPropertyType);
router.get("/measurement-type", applicationService.getMeasurementType);
router.get("/property-status", applicationService.getPropertyStatus);
router.get("/property-for", applicationService.getPropertyFor);
router.get("/price-type", applicationService.getPriceType);

module.exports = router;
