const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authControllers");
const { protect } = require("../middlewares/authMiddleware");
const { authorized } = require("../middlewares/rolemiddleware");

//--REGISTER
router.post("/register", registerUser);
//--LOGIN
router.post("/login", loginUser);

//--protected route to check wreather token is valid or not or role of the user its admin or user
router.get("/manager", protect, authorized("admin", "manager"), (req, res) => {
  res.json({
    message: "Welcome admin/manager",
  });
});

//--route for admin - only
router.get("/admin-dashboard", protect, authorized("admin"), (req, res) => {
  res.json({
    message: "welcome admin!",
  });
});

module.exports = router;
