const propertyService = require("../services/propertyService");
const propertyDocumentService = require("../services/propertyDocumentService");
const { moveMultipleFiles } = require("../config/fileOperations");
const { getMastersIdByName } = require("../services/applicationService");
const config = require("../config/config");

// Utility function for validating property data
const validatePropertyData = (data) => {
    const { title, propertyTypeId, address, pricePerUnit, priceTypeId, measurementValue, measurementTypeId, statusId, description } = data;

    if (!title || title.length < 3) {
        return "Property title must be at least 3 characters long.";
    }
    if (!propertyTypeId || isNaN(propertyTypeId)) {
        return "Invalid property type ID.";
    }
    if (!address || address.length < 5) {
        return "Address must be at least 5 characters long.";
    }
    if (!pricePerUnit || isNaN(pricePerUnit) || pricePerUnit < 0) {
        return "Price per unit must be a valid number.";
    }
    if (!priceTypeId || isNaN(priceTypeId)) {
        return "Invalid price type ID.";
    }
    if (!measurementValue || isNaN(measurementValue) || measurementValue <= 0) {
        return "Measurement value must be a positive number.";
    }
    if (!measurementTypeId || isNaN(measurementTypeId)) {
        return "Invalid measurement type ID.";
    }
    if (!statusId || isNaN(statusId)) {
        return "Invalid property status ID.";
    }
    if (!description || description.length < 10) {
        return "Description must be at least 10 characters long.";
    }
    return null;
};

// Insert Property
exports.addProperty = async (req, res) => {
    // First, validate input data
    const validationError = validatePropertyData(req.body);
    if (validationError) {
        return res.status(400).json({ success: false, message: validationError });
    }

    // Get file paths of uploaded images
    const images = req.files ? req.files.map((file) => `/temp/${file.filename}`) : [];

    try {
        // Destructure the validated body data
        const { title, propertyTypeId, address, pricePerUnit, priceTypeId, measurementValue, measurementTypeId, statusId, ownerId, description } = req.body;

        // Call service to insert property
        let propertyId = await propertyService.addProperty({
            title,
            propertyTypeId,
            address,
            pricePerUnit,
            priceTypeId,
            measurementValue,
            measurementTypeId,
            statusId,
            ownerId,
            description
        });

        // Move uploaded images to the final directory
        let uploadedList = [];
        if (images.length > 0) {
            const destinationPath = `/property/${propertyId}/`;
            uploadedList = await moveMultipleFiles(images, destinationPath);
        }

        // Add uploaded files to database with relative path
        let documentTypeId = await getMastersIdByName(config.PROPERTY_PREVIEW);
        await propertyDocumentService.addPropertyDocuments({
            documentRelativePaths: uploadedList.join(','),
            propertyId: propertyId,
            documentTypeId,
            uploadedBy: req.user.userId
        });

        return res.json({
            success: true,
            message: "Property added successfully."
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.sqlMessage || err.message });
    }
};
// Get all properties
exports.getProperties = async (req, res) => {
    try {
        let properties = await propertyService.getAllProperties();
        return res.json({ success: true, properties });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.sqlMessage || err.message });
    }
};

// Get property by ID
exports.getPropertyById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: "Invalid property ID." });
        }

        let property = await propertyService.getPropertyById(id);
        if (!property) {
            return res.status(404).json({ success: false, message: "Property not found." });
        }

        return res.json({ success: true, property });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.sqlMessage || err.message });
    }
};

// Update property
exports.updateProperty = async (req, res) => {
    try {
        const { id } = req.params;
        let { title, propertyTypeId, address, pricePerUnit, priceTypeId, measurementValue, measurementTypeId, statusId, ownerId, description } = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: "Invalid property ID." });
        }

        // Validate input data
        const validationError = validatePropertyData(req.body);
        if (validationError) {
            return res.status(400).json({ success: false, message: validationError });
        }

        let updated = await propertyService.updateProperty({ id, title, propertyTypeId, address, pricePerUnit, priceTypeId, measurementValue, measurementTypeId, statusId, ownerId, description });

        if (!updated) {
            return res.status(404).json({ success: false, message: "Property not found or not updated." });
        }

        return res.json({ success: true, message: "Property updated successfully." });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.sqlMessage || err.message });
    }
};

// Delete property
exports.deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ success: false, message: "Invalid property ID." });
        }

        let deleted = await propertyService.deleteProperty(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Property not found or already deleted." });
        }

        return res.json({ success: true, message: "Property deleted successfully." });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.sqlMessage || err.message });
    }
};
