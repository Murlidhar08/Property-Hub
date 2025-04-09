const propertyService = require("../services/propertyService");
const propertyDocumentService = require("../services/propertyDocumentService");
const { moveMultipleFiles } = require("../config/fileOperations");
const { getMastersIdByName } = require("../services/applicationService");
const config = require("../config/config");

// Insert Property
exports.addProperty = async (req, res) => {
    // Get file paths of uploaded images
    const images = req.files ? req.files.map((file) => `/temp/${file.filename}`) : [];

    try {
        // Destructure the validated body data
        const { title, propertyTypeId, address, pricePerUnit, priceTypeId, measurementValue, measurementTypeId, statusId, ownerId, mapDetails, description } = req.body;

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
            mapDetails: mapDetails ?? null,
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
        let id = req.params.id;

        // Details of the property to be updated
        let { title, propertyTypeId, address, pricePerUnit, priceTypeId, measurementValue, measurementTypeId, statusId, ownerId, mapDetails, description } = req.body;

        // Database performed
        let updated = await propertyService.updateProperty({ id, title, propertyTypeId, address, pricePerUnit, priceTypeId, measurementValue, measurementTypeId, statusId, ownerId, mapDetails, description });

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Property not found or not updated."
            });
        }

        return res.json({
            success: true,
            message: "Property updated successfully."
        });
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
