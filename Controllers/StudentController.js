import StudentService from "../Services/StudentService.js";

class StudentController{
          async getStudentInfo(req,res,next){
                    try{
                              var student=StudentService.getStudentInfo(req.params["id"]);
                              return res.status(200).json(student);
                    }
                    catch(error){
                              next(error);
                    }
          }
}
export default StudentController;