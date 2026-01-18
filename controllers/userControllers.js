const User = require("../models/User");

//--get all users
exports.allUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//----delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User is deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//----id admin wants to block and user
exports.blockUser = async (req, res) => {
  const { blocked } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: " User not found" });
    user.blocked = blocked;
    await user.save();
       res.json({ message: `User ${blocked ? "blocked" : "unblocked"}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
