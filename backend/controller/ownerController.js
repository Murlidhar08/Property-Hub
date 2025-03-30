const ownerService = require("../services/ownerService");

// Utility function for validating owner data
const validateOwnerData = (data) => {
    const { name, contact, address } = data;

    if (!name || name.length < 3) {
        return "Owner name must be at least 3 characters long.";
    }
    if (!contact || !/^\d{10}$/.test(contact)) {
        return "Contact number must be a valid 10-digit number.";
    }
    if (!address || address.length < 5) {
        return "Address must be at least 5 characters long.";
    }
    return null;
};

// Insert Owner
exports.addOwner = async (req, res) => {
    try {
        let { name, contact, email, address, image, description } = req.body;

        // Validate data
        const validationError = validateOwnerData(req.body);
        if (validationError) {
            return res.status(400).json({ success: false, message: validationError });
        }

        // Make Database call
        await ownerService.addOwner({ name, contact, email, address, image, description });
        return res.json({
            success: true,
            message: "Owner added successfully.",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message,
        });
    }
};

// Get all owners
exports.getOwners = async (req, res) => {
    try {
        let owners = await ownerService.getAllOwners();
        return res.json({ success: true, owners });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message,
        });
    }
};

// Get owner by ID
exports.getOwnerById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: "Invalid owner ID." });
        }

        let owner = await ownerService.getOwnerById(id);
        if (!owner) {
            return res.status(404).json({ success: false, message: "Owner not found." });
        }

        return res.json({ success: true, owner });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message,
        });
    }
};

// Update owner
exports.updateOwner = async (req, res) => {
    try {
        const { id } = req.params;
        let { name, contact, email, address, description } = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: "Invalid owner ID." });
        }

        // Validate data
        const validationError = validateOwnerData(req.body);
        if (validationError) {
            return res.status(400).json({ success: false, message: validationError });
        }

        let updated = await ownerService.updateOwner({ id, name, contact, email, address, description });
        if (!updated) {
            return res.status(404).json({ success: false, message: "Owner not found or not updated." });
        }

        return res.json({ success: true, message: "Owner updated successfully." });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message,
        });
    }
};

// Delete owner
exports.deleteOwner = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: "Invalid owner ID." });
        }

        let deleted = await ownerService.deleteOwner(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Owner not found or already deleted." });
        }

        return res.json({ success: true, message: "Owner deleted successfully." });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message,
        });
    }
};
