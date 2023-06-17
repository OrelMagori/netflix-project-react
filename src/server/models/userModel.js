const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
      index: true,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    // items: {
    //   type: [{ type: Schema.Types.ObjectId, ref: "Item" }],
    // },
  },
  { timestamps: true }
);

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("No such user");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};
userSchema.statics.signup = async function (
  firstName,
  lastName,
  email,
  password,
  age
) {
  if (!firstName || !lastName || !email || !password || !age) {
    throw Error("All fields must be filled");
  }
  if (age < 18) {
    throw Error("You must be 18 or older to register");
  }
  if (!email.includes("@") || !email.includes(".")) {
    throw Error("Invalid email");
  }
  if (firstName.length < 2 || lastName.length < 2) {
    throw Error("First and last name must be at least 2 characters long");
  }
  if (password.length < 6) {
    throw Error("Password must be at least 6 characters long");
  }
  // if (
  //   !password.match(/[0-9]/g) ||
  //   !password.match(/[a-z]/g) ||
  //   !password.match(/[A-Z]/g)
  // ) {
  //   throw Error(
  //     "Password must contain at least one uppercase letter, one lowercase letter, and one number"
  //   );
  // }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    firstName,
    lastName,
    email,
    password: hash,
    age,
  });

  return user;
};

module.exports = mongoose.model("User", userSchema);
