import express from "express";
import StudentController from "../Controllers/StudentController.js";
import UploadMiddleware from "../Middlewares/UploadMiddleware.js";
import StudentMiddleware from "../Middlewares/StudentMiddleware.js";


const StudentRouter=express.Router();

StudentRouter.get("/loginedInfo",StudentMiddleware,StudentController.getLoginedInfo);
StudentRouter.get("/studentInfo",StudentController.getStudentInfo);
StudentRouter.post("/uploadAvatar",StudentMiddleware,UploadMiddleware,StudentController.uploadAvatar);

export default StudentRouter;