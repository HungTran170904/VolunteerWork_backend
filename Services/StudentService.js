import Student from "../Models/Student.js";
import CloudinaryService from "./CloudinaryService.js";

class StudentService{
          async getStudentInfo(studentId){
                    var student=await Student.findById(studentId);
                    return student;
          }
          async uploadAvatar(student,file){
                    student.avatarUrl=await CloudinaryService.uploadImage(file,student.avatarUrl);
                    await student.save();
                    return student.avatarUrl;
          }
}
export default new StudentService();