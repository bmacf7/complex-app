import { User } from "../models/User.js";

export const home = (req, res) => {
  res.render("home-guest");
};

export const register = (req, res) => {
  let user = new User(req.body);
  user.register();
  user.errors.length
    ? res.send(user.errors)
    : res.send("Congrats, there are no errors!");
};
