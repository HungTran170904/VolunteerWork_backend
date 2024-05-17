import AuthError from "../Errors/AuthError.js";
import RequestError from "../Errors/RequestError.js";
import Student from "../Models/Student.js";
import CloudinaryService from "./CloudinaryService.js";
import { STUDENT } from "../Utils/Constraints.js";

class StudentService{
          async getStudentInfo(account){
                    var student=await Student.findOne({account:account._id});
                    if(!student) throw new RequestError("Student with accountId "+account._Id+" does not exists");
                    return student;
          }
          async uploadAvatar(account,file){
                    if(account.role!=STUDENT) throw new AuthError("This endpoint is only for students");
                    var student=await Student.findOne({account:account._id});
                    student.avatarUrl=await CloudinaryService.uploadImage(file,student.avatarUrl);
                    await student.save();
                    return student.avatarUrl;
          }
}
export default new StudentService();