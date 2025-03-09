const express = require("express");
const { getClients, getClientById, addClient, updateClient, deleteClient } = require("../controller/clientController.js");

const router = express.Router();

router.get("/", getClients);
router.get("/:id", getClientById);
router.post("/", addClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

module.exports = router;
