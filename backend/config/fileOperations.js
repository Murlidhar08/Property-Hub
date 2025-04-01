const path = require("path");
const fs = require("fs");

// Move files
module.exports.moveFiles = (source, destination) => {
    return new Promise((resolve, reject) => {
        // Convert relative paths to absolute paths
        const sourcePath = path.join(__dirname, "../uploads", source);
        const destinationPath = path.join(__dirname, "../uploads", destination);

        // Ensure the destination directory exists
        const destinationDir = path.dirname(destinationPath);
        if (!fs.existsSync(destinationDir)) {
            fs.mkdirSync(destinationDir, { recursive: true });
        }

        // Move the file
        fs.rename(sourcePath, destinationPath, (err) => {
            if (err) return reject(err);
            resolve(destination);
        });
    });
};

module.exports.moveMultipleFiles = (filesList, destinationDir) => {
    return new Promise(async (resolve, reject) => {
        try {
            let movedFiles = [];

            // Move each file
            for (const file of filesList) {
                const fileName = path.basename(file); // Extract filename from source path
                const destinationPath = path.join(destinationDir, fileName);

                await exports.moveFiles(file, destinationPath); // Move the file
                movedFiles.push(destinationPath); // Store the new path
            }

            resolve(movedFiles);
        } catch (error) {
            reject(error);
        }
    });
};