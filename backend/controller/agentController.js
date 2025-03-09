const db = require("../config/mySql");

// Get all agents
exports.getAgents = (req, res) => {
    db.query("CALL usp_agent_select_all()", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
};

// Get an agent by ID
exports.getAgentById = (req, res) => {
    const { id } = req.params;
    db.query("CALL usp_agent_select(?)", [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0][0]);
    });
};

// Add an agent
exports.addAgent = (req, res) => {
    const { name, contact, email, address, area } = req.body;
    db.query(
        "CALL usp_agent_add(?, ?, ?, ?, ?)",
        [name, contact, email, address, area],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Agent added successfully" });
        }
    );
};

// Update an agent
exports.updateAgent = (req, res) => {
    const { id } = req.params;
    const { name, contact, email, address, area } = req.body;
    db.query(
        "CALL usp_agent_update(?, ?, ?, ?, ?, ?)",
        [id, name, contact, email, address, area],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Agent updated successfully" });
        }
    );
};

// Delete an agent
exports.deleteAgent = (req, res) => {
    const { id } = req.params;
    db.query("CALL usp_agent_delete(?)", [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Agent deleted successfully" });
    });
};
