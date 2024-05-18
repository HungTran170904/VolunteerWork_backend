import StudentService from "../Services/StudentService.js";

class StudentController{
          async getStudentInfo(req,res,next){
                    try{
                              return res.status(200).json(req.student);
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
}
export default new StudentController();