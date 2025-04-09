// Utility function for validating property data
module.exports.validatePropertyData = (req, res, next) => {
    const { title, propertyTypeId, address, pricePerUnit, priceTypeId, measurementValue, measurementTypeId, statusId, description } = req.body;
    let errMessage = "";

    if (!title || title.length < 3)
        errMessage = "Property title must be at least 3 characters long.";

    if (!propertyTypeId || isNaN(propertyTypeId))
        errMessage = "Invalid property type ID.";

    if (!address || address.length < 5)
        errMessage = "Address must be at least 5 characters long.";

    if (!pricePerUnit || isNaN(pricePerUnit) || pricePerUnit < 0)
        errMessage = "Price per unit must be a valid number.";

    if (!priceTypeId || isNaN(priceTypeId))
        errMessage = "Invalid price type ID.";

    if (!measurementValue || isNaN(measurementValue) || measurementValue <= 0)
        errMessage = "Measurement value must be a positive number.";

    if (!measurementTypeId || isNaN(measurementTypeId))
        errMessage = "Invalid measurement type ID.";

    if (!statusId || isNaN(statusId))
        errMessage = "Invalid property status ID.";

    // Validation
    if (errMessage) {
        return res.status(400).json({
            success: false,
            message: errMessage
        });
    }

    next();
};

// Utility function for validating property data
module.exports.validatePropertyId = (req, res, next) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid property ID."
        });
    }

    next();
};