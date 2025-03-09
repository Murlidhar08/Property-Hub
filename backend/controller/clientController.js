const db = require("../config/mySql");

// Get all clients
exports.getClients = (req, res) => {
    db.query("CALL usp_client_select_all()", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
};

// Get a single client by ID
exports.getClientById = (req, res) => {
    const { id } = req.params;
    db.query("CALL usp_client_select(?)", [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0][0]);
    });
};

// Add a new client
exports.addClient = (req, res) => {
    const { name, contact, email, address, occupation } = req.body;
    db.query(
        "CALL usp_client_add(?, ?, ?, ?, ?)",
        [name, contact, email, address, occupation],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Client added successfully" });
        }
    );
};

// Update client
exports.updateClient = (req, res) => {
    const { id } = req.params;
    const { name, contact, email, address, occupation } = req.body;
    db.query(
        "CALL usp_client_update(?, ?, ?, ?, ?, ?)",
        [id, name, contact, email, address, occupation],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Client updated successfully" });
        }
    );
};

// Delete client
exports.deleteClient = (req, res) => {
    const { id } = req.params;
    db.query("CALL usp_client_delete(?)", [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Client deleted successfully" });
    });
};
