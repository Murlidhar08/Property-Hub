const express = require("express");
const propertyController = require("../controller/propertyController.js");
const router = express.Router();
const { upload } = require("../lib/multerUpload.js");

router.post("/", upload, propertyController.addProperty);
router.get("/", propertyController.getProperties);
router.get("/:id", propertyController.getPropertyById);
router.put("/:id", upload, propertyController.updateProperty);
router.delete("/:id", propertyController.deleteProperty);

module.exports = router;
