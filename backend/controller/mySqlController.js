var pool = require('../config/mySql.js');

module.exports.generateNewSyncID = async (data) => {
  let { uniqueSyncId, hashPassword, clientIp } = data;
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, conn) {
      if (err) {
        reject(err);
        return;
      }

      conn.query(
        `call usp_InsertUserInfo (?, ?, ?)`,
        [uniqueSyncId, hashPassword, clientIp],
        function (error, results, fields) {
          conn.release();
          if (error) {
            reject(error);
          }
          resolve(results);
        }
      );
    });
  });
};