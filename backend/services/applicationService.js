const db = require("../config/mySql");
let masterConfigs = {};

// Add Agent
exports.getMastersIdByName = async (name) => {
    let configId = masterConfigs[name];
    return new Promise((resolve, reject) => {
        if (configId)
            return resolve(configId);

        db.query("CALL usp_masters_getId_by_name(?)", [name],
            (err, results) => {
                if (err) return reject(err);

                let resVal = results[0][0]['id'];
                masterConfigs[name] = resVal;
                resolve(resVal);
            }
        );
    });
};
