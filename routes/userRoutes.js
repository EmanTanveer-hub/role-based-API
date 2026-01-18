//CRUD opertions 
const express = require("express");
const router = express.Router();

const { authorized } = require("../middlewares/rolemiddleware");
const { protect } = require("../middlewares/authMiddleware");

const {allUsers,deleteUser,blockUser} = require("../controllers/userControllers");

//--List of all users
router.get("/all",protect,authorized("admin") ,allUsers);
//--Delete user(Admin only)
router.delete("/:id",protect,authorized("admin"),deleteUser);
//--Block unblock (admin only)
router.patch("/:id/block",protect,authorized("admin"),blockUser);



module.exports = router;
