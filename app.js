import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import router from "./router.js";

dotenv.config();

const app = express();
const client = new MongoClient(process.env.MONGO_URI);

// Enabling accepting data in the common ways.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/public", express.static("public"));
app.set("views", "views");
app.set("view engine", "ejs");

app.use("/", router);

client.connect().then(() => {
  app.listen(process.env.DEV_PORT);
});

export { app, client };
