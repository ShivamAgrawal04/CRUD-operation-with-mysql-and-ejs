import express from "express";
import {
  createNewUser,
  deleteUserById,
  getAllUsers,
  getEditUserPage,
  getNewUserPage,
  getUserByEmail,
  getUserById,
  updateUserById,
} from "../controllers/user.controller.js";

const router = express.Router();
router.post("/newUser", createNewUser);
router.get("/newUser", getNewUserPage);
router.get("/edit/:id", getEditUserPage);
router.get("/", getAllUsers);
router.get("/email/:email", getUserByEmail);
router.get("/:id", getUserById);
router.put("/update/:id", updateUserById);
router.delete("/delete/:id", deleteUserById);

export default router;
