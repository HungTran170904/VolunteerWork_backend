import StudentService from "../Services/StudentService.js";

class StudentController{
          async getStudentInfo(req,res,next){
                    try{
                              var student=await StudentService.getStudentInfo(req.account);
                              return res.status(200).json(student);
                    }
                    catch(error){
                              next(error);
                    }
          }
          async uploadAvatar(req,res,next){
                    try{
                              console.log("Ok");
                              var avatarUrl=await StudentService.uploadAvatar(req.account, req.file);
                              return res.status(200).json(avatarUrl);
                    }
                    catch(error){
                              next(error);
                    }
          }
}
export default new StudentController();