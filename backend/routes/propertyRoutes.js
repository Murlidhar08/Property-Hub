// Packages
const express = require("express");

// Middleware
const { validatePropertyId, validatePropertyData } = require("../validators/propertyValidator.js");
const { upload } = require("../lib/multerUpload.js");

// Controller
const propertyController = require("../controller/propertyController.js");

// Initialization
const router = express.Router();

router.post("/", upload, validatePropertyData, propertyController.addProperty);
router.get("/", propertyController.getProperties);
router.get("/:id", propertyController.getPropertyById);
router.put("/:id", validatePropertyId, upload, validatePropertyData, propertyController.updateProperty);
router.delete("/:id", propertyController.deleteProperty);

module.exports = router;
