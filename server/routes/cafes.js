const express = require("express");
const router = express.Router();

const { getCafes,getCafeById,createCafe, updateCafe, deleteCafe } = require("../controller/cafeController");
const { validateCreateCafe,validateUpdateCafe } = require("../middleware/cafeValidation")

router.get("/", getCafes);
router.post("/", validateCreateCafe,createCafe)
router.put('/:id', validateUpdateCafe, updateCafe)
router.delete('/:id', deleteCafe)

module.exports = router;