const clientService = require("../services/clientService");

// Utility function for validating client data
const validateClientData = (data) => {
    const { name, contact, address } = data;

    if (!name || name.length < 3) {
        return "Client name must be at least 3 characters long.";
    }
    if (!contact || !/^\d{10}$/.test(contact)) {
        return "Contact number must be a valid 10-digit number.";
    }
    if (address && address.length < 5) {
        return "Address must be at least 5 characters long if provided.";
    }
    return null;
};

// Insert Client
exports.addClient = async (req, res) => {
    try {
        let { name, contact, address, occupation, description } = req.body;

        // Validate data
        const validationError = validateClientData(req.body);
        if (validationError) {
            return res.status(400).json({ success: false, message: validationError });
        }

        // Make Database call
        await clientService.addClient({ name, contact, address, occupation, description });
        return res.json({
            success: true,
            message: "Client added successfully.",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message,
        });
    }
};

// Get all clients
exports.getClients = async (req, res) => {
    try {
        let clients = await clientService.getAllClients();
        return res.json({ success: true, clients });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message,
        });
    }
};

// Get client by ID
exports.getClientById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: "Invalid client ID." });
        }

        let client = await clientService.getClientById(id);
        if (!client) {
            return res.status(404).json({ success: false, message: "Client not found." });
        }

        return res.json({ success: true, client });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message,
        });
    }
};

// Update client
exports.updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        let { name, contact, address, occupation, description } = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: "Invalid client ID." });
        }

        // Validate data
        const validationError = validateClientData(req.body);
        if (validationError) {
            return res.status(400).json({ success: false, message: validationError });
        }

        let updated = await clientService.updateClient({ id, name, contact, address, occupation, description });
        if (!updated) {
            return res.status(404).json({ success: false, message: "Client not found or not updated." });
        }

        return res.json({ success: true, message: "Client updated successfully." });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message,
        });
    }
};

// Delete client
exports.deleteClient = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: "Invalid client ID." });
        }

        let deleted = await clientService.deleteClient(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Client not found or already deleted." });
        }

        return res.json({ success: true, message: "Client deleted successfully." });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message,
        });
    }
};
