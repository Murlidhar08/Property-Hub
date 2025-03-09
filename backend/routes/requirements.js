import express from "express";
import { getRequirements, getRequirementById, addRequirement, updateRequirement, deleteRequirement } from "../controllers/requirementController.js";

const router = express.Router();

router.get("/", getRequirements);
router.get("/:id", getRequirementById);
router.post("/", addRequirement);
router.put("/:id", updateRequirement);
router.delete("/:id", deleteRequirement);

export default router;
