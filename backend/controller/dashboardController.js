const dashboardService = require("../services/dashboardService.js");

// Insert Agent
exports.getDashboardCounts = async (req, res) => {
    try {
        // Make Database call
        var data = await dashboardService.getDashboardCounts();
        return res.json({
            success: true,
            data,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message,
        });
    }
};