const db = require("../lib/mySql");

// Add Client
exports.addClient = async ({ name, contact, address, occupation, description }) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_client_add(?, ?, ?, ?, ?)",
            [name, contact, address, occupation, description],
            (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            }
        );
    });
};

// Get all Clients
exports.getAllClients = async () => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_client_get_all()", [],
            (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            }
        );
    });
};

// Get Client by ID
exports.getClientById = async (id) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_client_get_by_id(?)", [id],
            (err, results) => {
                if (err) return reject(err);
                resolve(results[0][0]);
            }
        );
    });
};

// Update Client
exports.updateClient = async ({ id, name, contact, address, occupation, description }) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_client_update(?, ?, ?, ?, ?, ?)",
            [id, name, contact, address, occupation, description],
            (err, results) => {
                if (err) return reject(err);
                resolve(results.affectedRows > 0);
            }
        );
    });
};

// Delete Client
exports.deleteClient = async (id) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_client_delete(?)", [id],
            (err, results) => {
                if (err) return reject(err);
                resolve(results.affectedRows > 0);
            }
        );
    });
};
