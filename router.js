import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.render("home-guest");
});

router.get("/about", (req, res) => {
  res.send("About Page");
});

export default router;
