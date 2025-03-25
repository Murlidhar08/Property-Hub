const express = require("express");
const agentController = require("../controller/agentController.js");

const router = express.Router();

router.post("/", agentController.addAgent);
router.get("/", agentController.getAgents);
router.get("/:id", agentController.getAgentById);
router.put("/:id", agentController.updateAgent);
router.delete("/:id", agentController.deleteAgent);

module.exports = router;
