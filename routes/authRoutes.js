const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authControllers");
const { protect } = require("../middlewares/authMiddleware");
const { authorized } = require("../middlewares/rolemiddleware");
const {newaccessToken} = require("../controllers/authControllers");

//--REGISTER
router.post("/register", registerUser);
//--LOGIN
router.post("/login", loginUser);

//--protected route to check wreather token is valid or not or role of the user its admin or user

router.get("/manager", protect, authorized("admin", "manager","user"), (req, res) => {
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
//---refreshToken route
router.post("/refresh",newaccessToken);

module.exports = router;
