const User = require("../models/userModel");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    res.status(200).json({ message: "user login successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { firstName, lastName, email, password, age } = req.body;
  try {
    const user = await User.signup(firstName, lastName, email, password, age);
    res.status(200).json({ messg: "user signup successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};