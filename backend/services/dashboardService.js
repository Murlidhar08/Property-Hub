const db = require("../config/mySql");

// Add Agent
exports.getDashboardCounts = async () => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_dashboard_getcounts()", [], (err, results) => {
            if (err)
                return reject(err);

            resolve(results[0][0]);
        });
    });
};