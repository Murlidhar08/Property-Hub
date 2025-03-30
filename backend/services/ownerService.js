const db = require("../config/mySql");

// Add Owner
exports.addOwner = async ({ name, contact, email, address, description }) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_owner_add(?, ?, ?, ?, ?)",
            [name, contact, email, address, description],
            (err, results) => {
                if (err) return reject(err);

                resolve(results[0]);
            }
        );
    });
};

// Get all owners
exports.getAllOwners = async () => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_owner_get_all()", [],
            (err, results) => {
                if (err) return reject(err);

                resolve(results[0]);
            }
        );
    });
};

// Get owner by ID
exports.getOwnerById = async (id) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_owner_get_by_id(?)", [id],
            (err, results) => {
                if (err) return reject(err);

                resolve(results[0][0]);
            }
        );
    });
};

// Update owner
exports.updateOwner = async ({ id, name, contact, email, address, description }) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_owner_update(?, ?, ?, ?, ?, ?)",
            [id, name, contact, email, address, description],
            (err, results) => {
                if (err) return reject(err);

                resolve(results.affectedRows > 0);
            }
        );
    });
};

// Delete owner
exports.deleteOwner = async (id) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_owner_delete(?)", [id],
            (err, results) => {
                if (err) return reject(err);

                resolve(results.affectedRows > 0);
            }
        );
    });
};
