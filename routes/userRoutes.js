//CRUD opertions 
const express = require("express");
const router = express.Router();

const { authorized } = require("../middlewares/rolemiddleware");
const { protect } = require("../middlewares/authMiddleware");

const {allUsers,deleteUser,blockUser,changeRole,getProfile} = require("../controllers/userControllers");

//----get-Profile
router.get("/profile",protect,getProfile);
//--List of all users
router.get("/users",protect,authorized("admin") ,allUsers);
//--Delete user(Admin only)
router.delete("/:id",protect,authorized("admin"),deleteUser);
//--Block unblock (admin only)
router.patch("/:id/block",protect,authorized("admin"),blockUser);
//--role ko change karna
router.put("/role/:id",protect,authorized("admin"),changeRole)



module.exports = router;
