import express from "express";
import {
  getDatas,
  createEmployeeWithImage,
  updateEmployeeWithImage,
  deleteEmployee,
  getData,
  searchEmployees,
} from "../controllers/employeeController.js";
import upload from "../config/multerConfig.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(verifyToken, getDatas)
  .post(verifyToken, upload.single("image"), createEmployeeWithImage);

router.route("/update")
  .put(verifyToken, upload.single("image"), updateEmployeeWithImage);

router.route("/")
  .get(verifyToken, getData)
  .delete(verifyToken, deleteEmployee);


  router.route("/:id")  // Corrected this route
  .delete(verifyToken, deleteEmployee);

  
  router.route('/search')
  .get(verifyToken, searchEmployees);


export default router;
