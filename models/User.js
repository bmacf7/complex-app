import validator from "validator";
import { client } from "../app.js";

export let User = function (data) {
  this.data = data;
  this.errors = [];
};

User.prototype.cleanUp = function () {
  if (typeof this.data.username != "string") {
    this.data.username = "";
  }
  if (typeof this.data.email != "string") {
    this.data.email = "";
  }
  if (typeof this.data.password != "string") {
    this.data.password = "";
  }

  // get rid of any bogus properties
  this.data = {
    username: this.data.username.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password,
  };
};

User.prototype.validate = function () {
  if (this.data.username == "") {
    this.errors.push("You must provide a username");
  }
  if (this.data.username.length > 0 && this.data.username.length < 3) {
    this.errors.push("The username should have more than 3 characters.");
  }
  if (this.data.username.length > 30) {
    this.errors.push("The username should not have more than 30 characters.");
  }
  if (
    this.data.username != "" &&
    !validator.isAlphanumeric(this.data.username)
  ) {
    this.errors.push(
      "Username cannot be blank and can only contain letters and numbers"
    );
  }
  if (!validator.isEmail(this.data.email)) {
    this.errors.push("You must provide an email");
  }
  if (this.data.password == "") {
    this.errors.push("Password is required");
  }
  if (this.data.password.length > 0 && this.data.password.length < 12) {
    this.errors.push("Password must be at least 12 characters.");
  }
  if (this.data.password.length > 100) {
    this.errors.push("Password cannot exceed 100 characters.");
  }
};

User.prototype.login = function () {
  return new Promise((resolve, reject) => {
    this.cleanUp();
    client
      .db()
      .collection("users")
      .findOne({ username: this.data.username })
      .then((attemptedUser) => {
        attemptedUser && attemptedUser.password === this.data.password
          ? resolve("Congrats!!!")
          : reject("Invalid username/password");
      })
      .catch(() => {
        reject("Please, try again later.");
      });
  });
};

User.prototype.register = function () {
  // Step 1.- Validate incoming data
  this.cleanUp();
  this.validate();

  // Step 2.- only if there are no validation errors
  // then save the user data into a database
  if (!this.errors.length) {
    client.db().collection("users").insertOne(this.data);
  }
};
