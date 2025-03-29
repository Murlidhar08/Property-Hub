const applicationService = require("../services/applicationService.js");

// Insert Agent
exports.getPropertyType = async (req, res) => {
    try {
        let list = await applicationService.getMastersByTypeName('PropertyType');
        return res.json({
            success: true,
            data: list
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message,
        });
    }
};

exports.getMeasurementType = async (req, res) => {
    try {
        let list = await applicationService.getMastersByTypeName('MeasurementType');
        return res.json({
            success: true,
            data: list
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message,
        });
    }
};

exports.getPropertyStatus = async (req, res) => {
    try {
        let list = await applicationService.getMastersByTypeName('PropertyStatus');
        return res.json({
            success: true,
            data: list
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message,
        });
    }
};

exports.getPropertyFor = async (req, res) => {
    try {
        let list = await applicationService.getMastersByTypeName('PropertyFor');
        return res.json({
            success: true,
            data: list
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message,
        });
    }
};