const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//------register the user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password ,role} = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashPassword,
      role: role || "user",
    });

    res.status(200).json({ message: "User is created succesfuly" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//------login the user
exports.loginUser = async (req, res) => {
  console.log("JWT FROM CONTROLLER:", process.env.JWT_SECRET);
  try {
    const { email, password,role } = req.body;
   

    if (!email || !password ||!role)
      return res
        .status(400)
        .json({ message: "Email and Password are required" });

    const user = await User.findOne({ email }).select("+password");

    if (!user) return res.status(400).json({ message: "User does not exists" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json(500).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id ,role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log("Generated Token:", token);


    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
