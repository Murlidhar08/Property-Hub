const express = require("express");
const { getRequirements, getRequirementById, addRequirement, updateRequirement, deleteRequirement } = require("../controller/requirementController.js");

const router = express.Router();

router.get("/", getRequirements);
router.get("/:id", getRequirementById);
router.post("/", addRequirement);
router.put("/:id", updateRequirement);
router.delete("/:id", deleteRequirement);

module.exports = router;
