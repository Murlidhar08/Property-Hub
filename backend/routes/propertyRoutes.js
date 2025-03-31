const express = require("express");
const propertyController = require("../controller/propertyController.js");
const router = express.Router();

router.post("/", propertyController.addProperty);
router.get("/", propertyController.getProperties);
router.get("/:id", propertyController.getPropertyById);
router.put("/:id", propertyController.updateProperty);
router.delete("/:id", propertyController.deleteProperty);

module.exports = router;
