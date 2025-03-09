const express = require('express');
const { getAgents, getAgentById, addAgent, updateAgent, deleteAgent } = require("../controller/agentController.js");

const router = express.Router();

router.get("/", getAgents);
router.get("/:id", getAgentById);
router.post("/", addAgent);
router.put("/:id", updateAgent);
router.delete("/:id", deleteAgent);

module.exports = router;
