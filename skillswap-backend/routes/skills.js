
import express from "express";
import { addSkill, getSkills } from "../controllers/skillController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, addSkill); // Protégé par JWT
router.get("/", getSkills);

export default router;
