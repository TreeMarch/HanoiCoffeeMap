import express from "express";


import cafeController, { getCafes, getCafeById ,createCafe , updateCafe, deleteCafe } from "../controller/cafeController.js";
import { validateCreateCafe,validateUpdateCafe } from "../middleware/cafeValidator.js";
import authenticate from "../middleware/authenticate.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();


router.get("/", getCafes); // public
router.post("/",validateCreateCafe,createCafe) 
router.put('/:id',validateUpdateCafe, updateCafe)
router.delete('/:id', deleteCafe)
// router.patch('/:id/approve',authenticate,authorize('admin'),cafeController.approveCafe)

export default router;