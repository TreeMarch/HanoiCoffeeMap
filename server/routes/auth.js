import express from "express";
import { signUp, signIn } from "../controller/authController.js";
import { registerValidation, loginValidation, handleValidationErrors } from '../middleware/authValidator.js';
import { loginLimiter, registerLimiter } from '../middleware/rateLimiter.js';

const router = express.Router()

router.post("/signUp",registerLimiter, registerValidation, handleValidationErrors,signUp)
router.post("/login",loginLimiter,loginValidation,handleValidationErrors,signIn)

export default router;
