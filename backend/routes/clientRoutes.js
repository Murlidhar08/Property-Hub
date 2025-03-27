const express = require("express");
const clientController = require("../controller/clientController.js");

const router = express.Router();

router.post("/", clientController.addClient);
router.get("/", clientController.getClients);
router.get("/:id", clientController.getClientById);
router.put("/:id", clientController.updateClient);
router.delete("/:id", clientController.deleteClient);

module.exports = router;
