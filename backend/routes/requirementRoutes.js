const express = require("express");
const requirementController = require("../controller/requirementController.js");

const router = express.Router();

router.post("/", requirementController.addRequirement);
router.get("/", requirementController.getRequirements);
router.get("/:id", requirementController.getRequirementById);
router.put("/:id", requirementController.updateRequirement);
router.delete("/:id", requirementController.deleteRequirement);

module.exports = router;
