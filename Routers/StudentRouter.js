import express from "express";
import StudentController from "../Controllers/StudentController.js";
import UploadMiddleware from "../Middlewares/UploadMiddleware.js";


const StudentRouter=express.Router();

StudentRouter.get("/studentInfo",StudentController.getStudentInfo);
StudentRouter.post("/uploadAvatar",UploadMiddleware,StudentController.uploadAvatar);

export default StudentRouter;