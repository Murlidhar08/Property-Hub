const db = require("../config/mySql");

// Get all requirements
exports.getRequirements = (req, res) => {
    db.query("CALL usp_req_select_all()", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
};

// Get a requirement by ID
exports.getRequirementById = (req, res) => {
    const { id } = req.params;
    db.query("CALL usp_req_select(?)", [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0][0]);
    });
};

// Add a new requirement
exports.addRequirement = (req, res) => {
    const { type, location, measurement, priceRange, clientId } = req.body;
    db.query(
        "CALL usp_req_add(?, ?, ?, ?, ?)",
        [type, location, measurement, priceRange, clientId],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Requirement added successfully" });
        }
    );
};

// Update requirement
exports.updateRequirement = (req, res) => {
    const { id } = req.params;
    const { type, location, measurement, priceRange, clientId } = req.body;
    db.query(
        "CALL usp_req_update(?, ?, ?, ?, ?, ?)",
        [id, type, location, measurement, priceRange, clientId],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Requirement updated successfully" });
        }
    );
};

// Delete requirement
exports.deleteRequirement = (req, res) => {
    const { id } = req.params;
    db.query("CALL usp_req_delete(?)", [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Requirement deleted successfully" });
    });
};
