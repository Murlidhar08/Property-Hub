const agentService = require("../services/agentService");

// Utility function for validating agent data
const validateAgentData = (data) => {
    const { name, contact, address, area } = data;

    if (!name || name.length < 3) {
        return "Agent name must be at least 3 characters long.";
    }
    if (!contact || !/^\d{10}$/.test(contact)) {
        return "Contact number must be a valid 10-digit number.";
    }
    if (!address || address.length < 5) {
        return "Address must be at least 5 characters long.";
    }
    if (!area || area.length < 3) {
        return "Area must be at least 3 characters long.";
    }
    return null;
};

// Insert Agent
exports.addAgent = async (req, res) => {
    try {
        let { name, contact, address, area, image, description } = req.body;

        // Validate data
        const validationError = validateAgentData(req.body);
        if (validationError) {
            return res.status(400).json({ success: false, message: validationError });
        }

        // Make Database call
        await agentService.addAgent({ name, contact, address, area, image, description });
        return res.json({
            success: true,
            message: "Agent added successfully.",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message,
        });
    }
};

// Get all agents
exports.getAgents = async (req, res) => {
    try {
        let agents = await agentService.getAllAgents();
        return res.json({ success: true, agents });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message,
        });
    }
};

// Get agent by ID
exports.getAgentById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: "Invalid agent ID." });
        }

        let agent = await agentService.getAgentById(id);
        if (!agent) {
            return res.status(404).json({ success: false, message: "Agent not found." });
        }

        return res.json({ success: true, agent });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message,
        });
    }
};

// Update agent
exports.updateAgent = async (req, res) => {
    try {
        const { id } = req.params;
        let { name, contact, address, area, image, description } = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: "Invalid agent ID." });
        }

        // Validate data
        const validationError = validateAgentData(req.body);
        if (validationError) {
            return res.status(400).json({ success: false, message: validationError });
        }

        let updated = await agentService.updateAgent({ id, name, contact, address, area, image, description });
        if (!updated) {
            return res.status(404).json({ success: false, message: "Agent not found or not updated." });
        }

        return res.json({ success: true, message: "Agent updated successfully." });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message,
        });
    }
};

// Delete agent
exports.deleteAgent = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: "Invalid agent ID." });
        }

        let deleted = await agentService.deleteAgent(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Agent not found or already deleted." });
        }

        return res.json({ success: true, message: "Agent deleted successfully." });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message,
        });
    }
};
