const db = require("../config/mySql");

// Add Requirement
exports.addRequirement = async ({ requirementTypeId, location, measurementValue, measurementUnitId, minPrice, maxPrice, clientId }) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_requirements_add(?, ?, ?, ?, ?, ?, ?)",
            [requirementTypeId, location, measurementValue, measurementUnitId, minPrice, maxPrice, clientId],
            (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            }
        );
    });
};

// Get all requirements
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

// Get requirement by ID
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

// Update requirement
exports.updateRequirement = async ({ id, requirementTypeId, location, measurementValue, measurementUnitId, minPrice, maxPrice, clientId }) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_requirements_update(?, ?, ?, ?, ?, ?, ?, ?)",
            [id, requirementTypeId, location, measurementValue, measurementUnitId, minPrice, maxPrice, clientId],
            (err, results) => {
                if (err) return reject(err);
                resolve(results.affectedRows > 0);
            }
        );
    });
};

// Delete requirement
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
