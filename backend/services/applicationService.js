const db = require("../lib/mySql");
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

exports.getMastersByTypeName = async (typeName) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_masters_get_all_by_type(?)", [typeName],
            (err, results) => {
                if (err) return reject(err);

                resolve(results[0]);
            }
        );
    });
};