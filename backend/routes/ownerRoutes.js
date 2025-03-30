const express = require("express");
const ownerController = require("../controller/ownerController.js");

const router = express.Router();

router.post("/", ownerController.addOwner);
router.get("/", ownerController.getOwners);
router.get("/:id", ownerController.getOwnerById);
router.put("/:id", ownerController.updateOwner);
router.delete("/:id", ownerController.deleteOwner);

module.exports = router;
