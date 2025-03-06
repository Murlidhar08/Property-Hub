const router = require('express').Router();

const { generateUniqueSyncID } = require('../config/commonFunction.js');
const {
  generatePasswordHash,
} = require('../config/encryptionUtil.js');

// Generate Data Synchronously
router.post('/generateNewSync', async (req, res, next) => {
  try {
    const { password } = req.body;
    const clientIp = req.ip;

    // Validate data
    if (!password) throw new Error(`Invalid data`);

    // Preparing data
    const uniqueSyncId = generateUniqueSyncID();
    const hashPassword = await generatePasswordHash(password);

    // saving data
    await generateNewSyncID({ uniqueSyncId, hashPassword, clientIp });

    res.send({
      success: true,
      details: {
        uniqueSyncId,
      },
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.post('/test', async (req, res, next) => {
    res.send({
      success: true,
      details: "Working fine.",
    });
});

module.exports = router;
