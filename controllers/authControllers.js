const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//------register the user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
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
    const { email, password, role } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and Password are required" });

    const user = await User.findOne({ email }).select("+password");

    if (!user) return res.status(400).json({ message: "User does not exists" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      },
    );

    const refreshToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "10d",
      },
    );
    user.refreshToken = refreshToken;
    await user.save();

    res.json({ token, refreshToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//---refresh token generates a new token every time for a user
exports.newaccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res.status(401).json({ message: "Refresh token required" });

    //we have to check database for refreshtoken
    const user = await User.findOne({ refreshToken });
    if (!user)
      return res.status(403).json({ message: "Invalid refresh token" });

    //---verify the token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err)
          return res.status(403).json({ message: "Token expired or invalid" });

        const newtoken = jwt.sign(
          { userId: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1d" },
        );

        const newrefreshToken = jwt.sign(
          { userId: user._id },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "10d" },
        );

        //--save new refreshtoken
        user.refreshToken = newrefreshToken;
        await user.save();

        res
          .status(200)
          .json({ token: newtoken, refreshToken: newrefreshToken });
      },
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
