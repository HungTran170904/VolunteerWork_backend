import express from "express";
import StudentController from "../Controllers/StudentController.js";


const StudentRouter=express.Router();

StudentRouter.get("/studentInfo/:id",StudentController.getStudentInfo);
