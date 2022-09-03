import { Router } from "express";
const router = Router();

import { home, register } from "./controllers/userController.js";

router.get("/", home);
router.post("/register", register);

export default router;
