const db = require("../lib/mySql");

// Add Property
exports.addProperty = async ({ title, propertyTypeId, address, pricePerUnit, priceTypeId, measurementValue, measurementTypeId, statusId, ownerId, description }) => {
    return new Promise((resolve, reject) => {
        db.query(
            "CALL usp_property_add(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [title, propertyTypeId, address, pricePerUnit, priceTypeId, measurementValue, measurementTypeId, statusId, ownerId, description],
            (err, results) => {
                if (err) return reject(err);

                resolve(results[0][0]['id']);
            }
        );
    });
};

// Get all properties
exports.getAllProperties = async () => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_property_get_all()", [],
            (err, results) => {
                if (err) return reject(err);

                resolve(results[0]);
            }
        );
    });
};

// Get property by ID
exports.getPropertyById = async (id) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_property_get_by_id(?)", [id],
            (err, results) => {
                if (err) return reject(err);

                resolve(results[0][0]);
            }
        );
    });
};

// Update property
exports.updateProperty = async ({ id, title, propertyTypeId, address, pricePerUnit, priceTypeId, measurementValue, measurementTypeId, statusId, ownerId, description }) => {
    return new Promise((resolve, reject) => {
        db.query(
            "CALL usp_property_update(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [id, title, propertyTypeId, address, pricePerUnit, priceTypeId, measurementValue, measurementTypeId, statusId, ownerId, description],
            (err, results) => {
                if (err) return reject(err);

                resolve(results.affectedRows > 0);
            }
        );
    });
};

// Delete property
exports.deleteProperty = async (id) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_property_delete(?)", [id],
            (err, results) => {
                if (err) return reject(err);

                resolve(results.affectedRows > 0);
            }
        );
    });
};
