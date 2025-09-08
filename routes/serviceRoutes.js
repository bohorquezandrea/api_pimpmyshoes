const express = require("express");
const router = express.Router();
const {
  getAllServices,
  createService,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/serviceController");
const validateService = require("../middleware/validateService");

router.get("/", getAllServices);
router.post("/", validateService, createService);
router.get("/:id", getServiceById);
router.put("/:id", validateService, updateService);
router.delete("/:id", deleteService);

module.exports = router;
