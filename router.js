import { Router } from "express";
const router = Router();

import { home, register, login } from "./controllers/userController.js";

router.get("/", home);
router.post("/register", register);
router.post("/login", login);

export default router;
