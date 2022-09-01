import express from "express";
const app = express();

import router from "./router.js";

app.use("/public", express.static("public"));
app.set("views", "views");
app.set("view engine", "ejs");

app.use("/", router);

app.listen(3000);
