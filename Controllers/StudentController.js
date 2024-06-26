import Student from "../Models/Student.js";
import StudentService from "../Services/StudentService.js";

class StudentController{
          async getLoginedInfo(req,res,next){
                    try{
                              return res.status(200).json(req.student);
                    }
                    catch(error){
                              next(error);
                    }
          }

          async getStudentInfo(req,res,next){
                    try{
                              var student=await StudentService.getStudentInfo(req.query["studentId"]);
                              return res.status(200).json(student);
                    }
                    catch(error){
                              next(error);
                    }
          }

          async uploadAvatar(req,res,next){
                    try{
                              var avatarUrl=await StudentService.uploadAvatar(req.student, req.file);
                              return res.status(200).json(avatarUrl);
                    }
                    catch(error){
                              next(error);
                    }
          }

          async updateStudent(req, res, next){
                    try{                            
                              var student= await StudentService.updateStudent(req.student,req.body);
                              return res.status(200).json(student);
                    }
                    catch(error){
                              next(error);
                    }
          }

          async getTop10Students(req, res, next){
                    try{                            
                              var students= await StudentService.getTop10Students();
                              return res.status(200).json(students);
                    }
                    catch(error){
                              next(error);
                    }
          }
}
export default new StudentController();