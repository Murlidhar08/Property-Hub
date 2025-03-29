const db = require("../config/mySql");

// ➤ Add Requirement
exports.addRequirement = async ({ title, propertyTypeId, location, measurementTypeId, minMeasurement, maxMeasurement, priceTypeId, minPrice, maxPrice, clientId, description }) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_requirements_add(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [title, propertyTypeId, location, measurementTypeId, minMeasurement, maxMeasurement, priceTypeId, minPrice, maxPrice, clientId, description],
            (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            }
        );
    });
};

// ➤ Get All Requirements
exports.getAllRequirements = async () => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_requirements_get_all()", [],
            (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            }
        );
    });
};

// ➤ Get Requirement by ID
exports.getRequirementById = async (id) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_requirements_get_by_id(?)", [id],
            (err, results) => {
                if (err) return reject(err);
                resolve(results[0][0]);
            }
        );
    });
};

// ➤ Update Requirement
exports.updateRequirement = async ({ id, title, requirementTypeId, location, measurementTypeId, minMeasurement, maxMeasurement, priceTypeId, minPrice, maxPrice, clientId, description }) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_requirements_update(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [id, title, requirementTypeId, location, measurementTypeId, minMeasurement, maxMeasurement, priceTypeId, minPrice, maxPrice, clientId, description],
            (err, results) => {
                if (err) return reject(err);
                resolve(results.affectedRows > 0);
            }
        );
    });
};

// ➤ Delete Requirement
exports.deleteRequirement = async (id) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_requirements_delete(?)", [id],
            (err, results) => {
                if (err) return reject(err);
                resolve(results.affectedRows > 0);
            }
        );
    });
};
