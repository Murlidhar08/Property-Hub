const requirementService = require("../services/requirementService");

// Utility function for validating requirement data
const validateRequirementData = (data) => {
    const {
        propertyTypeId, location, measurementTypeId, minMeasurement, maxMeasurement,
        priceTypeId, minPrice, maxPrice, clientId, description
    } = data;

    return null;

    if (!propertyTypeId || isNaN(propertyTypeId)) return "Invalid requirement type.";
    if (!location || location.length < 3) return "Location must be at least 3 characters long.";
    if (!measurementTypeId || isNaN(measurementTypeId)) return "Invalid measurement type.";
    if (!minMeasurement || isNaN(minMeasurement) || minMeasurement <= 0) return "Min measurement must be a positive number.";
    if (!maxMeasurement || isNaN(maxMeasurement) || maxMeasurement < minMeasurement) return "Max measurement must be greater than or equal to Min measurement.";
    if (!priceTypeId || isNaN(priceTypeId)) return "Invalid price type.";
    if (!minPrice || isNaN(minPrice) || minPrice < 0) return "Minimum price must be a non-negative number.";
    if (!maxPrice || isNaN(maxPrice) || maxPrice < minPrice) return "Maximum price must be greater than or equal to the minimum price.";
    if (!clientId || isNaN(clientId)) return "Invalid client ID.";

    return null;
};

// Insert Requirement
exports.addRequirement = async (req, res) => {
    try {
        const validationError = validateRequirementData(req.body);
        if (validationError) {
            return res.status(400).json({
                success: false,
                message: validationError
            });
        }

        await requirementService.addRequirement(req.body);
        return res.json({
            success: true,
            message: "Requirement added successfully."
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message
        });
    }
};

// Get all requirements
exports.getRequirements = async (req, res) => {
    try {
        let requirements = await requirementService.getAllRequirements();
        return res.json({ success: true, requirements });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message
        });
    }
};

// Get requirement by ID
exports.getRequirementById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: "Invalid requirement ID." });
        }

        let requirement = await requirementService.getRequirementById(id);
        if (!requirement) {
            return res.status(404).json({ success: false, message: "Requirement not found." });
        }

        return res.json({ success: true, requirement });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message
        });
    }
};

// Update requirement
exports.updateRequirement = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: "Invalid requirement ID." });
        }

        const validationError = validateRequirementData(req.body);
        if (validationError) {
            return res.status(400).json({ success: false, message: validationError });
        }

        req.body.id = id; // Ensure ID is included in update payload
        let updated = await requirementService.updateRequirement(req.body);
        if (!updated) {
            return res.status(404).json({ success: false, message: "Requirement not found or not updated." });
        }

        return res.json({ success: true, message: "Requirement updated successfully." });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message
        });
    }
};

// Delete requirement
exports.deleteRequirement = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: "Invalid requirement ID." });
        }

        let deleted = await requirementService.deleteRequirement(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Requirement not found or already deleted." });
        }

        return res.json({ success: true, message: "Requirement deleted successfully." });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message
        });
    }
};
