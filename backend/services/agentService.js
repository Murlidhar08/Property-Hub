const db = require("../config/mySql");

// Add Agent
exports.addAgent = async ({ name, contact, address, area, image, description }) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_agent_add(?, ?, ?, ?, ?, ?)",
            [name, contact, address, area, image, description],
            (err, results) => {
                if (err) return reject(err);

                resolve(results[0]);
            }
        );
    });
};

// Get all agents
exports.getAllAgents = async () => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_agent_get_all()", [],
            (err, results) => {
                if (err) return reject(err);

                resolve(results[0]);
            }
        );
    });
};

// Get agent by ID
exports.getAgentById = async (id) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_agent_get_by_id(?)", [id],
            (err, results) => {
                if (err) return reject(err);

                resolve(results[0][0]);
            }
        );
    });
};

// Update agent
exports.updateAgent = async ({ id, name, contact, address, area, image, description }) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_agent_update(?, ?, ?, ?, ?, ?, ?)",
            [id, name, contact, address, area, image, description],
            (err, results) => {
                if (err) return reject(err);

                resolve(results.affectedRows > 0);
            }
        );
    });
};

// Delete agent
exports.deleteAgent = async (id) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_agent_delete(?)", [id],
            (err, results) => {
                if (err) return reject(err);

                resolve(results.affectedRows > 0);
            }
        );
    });
};
