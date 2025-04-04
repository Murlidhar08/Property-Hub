const db = require("../lib/mySql");

// Add Property Documents (Supports Multiple Documents)
exports.addPropertyDocuments = async ({ documentRelativePaths, propertyId, documentTypeId, uploadedBy }) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_propertydocument_create(?, ?, ?, ?)",
            [documentRelativePaths, propertyId, documentTypeId, uploadedBy],
            (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            }
        );
    });
};

// Get Property Documents by Property ID
exports.getPropertyDocumentsByPropertyId = async (propertyId) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_propertydocument_get_by_propertyId(?)", [propertyId],
            (err, results) => {
                if (err) return reject(err);
                resolve(results[0]); // Returning all documents related to the property
            }
        );
    });
};

// Delete Property Document by ID
exports.deletePropertyDocument = async (id) => {
    return new Promise((resolve, reject) => {
        db.query("CALL usp_propertydocument_delete(?)", [id],
            (err, results) => {
                if (err) return reject(err);
                resolve(results.affectedRows > 0);
            }
        );
    });
};
