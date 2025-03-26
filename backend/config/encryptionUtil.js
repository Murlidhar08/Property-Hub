const bcrypt = require('bcrypt');
const saltValue = Number(process.env.SALT_VALUE);

module.exports.generatePasswordHash = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltValue, (err, salt) => {
            if (err)
                return reject(err);

            bcrypt.hash(password, salt, function (error, hash) {
                if (error)
                    return reject(error)

                return resolve(hash);
            });
        });
    });
};

module.exports.comparePassword = (plainPass, hashPass) => {
    return new Promise(function (resolve, reject) {
        try {
            bcrypt.compare(plainPass, hashPass, function (err, isPasswordMatch) {
                if (err)
                    return reject(err);

                return resolve(isPasswordMatch);
            });
        } catch (e) {
            return reject(e);
        }
    });
};
