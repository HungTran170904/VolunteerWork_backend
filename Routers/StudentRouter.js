import express from "express";
import StudentController from "../Controllers/StudentController.js";
import UploadMiddleware from "../Middlewares/UploadMiddleware.js";
import StudentMiddleware from "../Middlewares/StudentMiddleware.js";


const StudentRouter=express.Router();

// get logined student info
StudentRouter.get("/loginedInfo",StudentMiddleware,StudentController.getLoginedInfo);

// get general info of a student
StudentRouter.get("/studentInfo",StudentController.getStudentInfo);

// upload avatar
StudentRouter.post("/uploadAvatar",StudentMiddleware,UploadMiddleware,StudentController.uploadAvatar);

// update student info
StudentRouter.post("/updateStudent",StudentMiddleware, StudentController.updateStudent);

// get top 10 students that has highest points
StudentRouter.get("/top10Students",StudentController.getTop10Students);

export default StudentRouter;