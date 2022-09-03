import validator from "validator";

export let User = function (data) {
  this.data = data;
  this.errors = [];
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

User.prototype.register = function () {
  this.validate();
  // Step 2.- only if there are no validation errors
  // then save the user data into a database
};
