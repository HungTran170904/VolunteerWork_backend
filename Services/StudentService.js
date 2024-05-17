import RequestError from "../Errors/RequestError.js";
import Student from "../Models/Student.js";

class StudentService{
          async getStudentInfo(accountId){
                    var student=Student.findOne({account:accountId});
                    if(!student) throw new RequestError("Student with accountId "+accountId+" does not exists");
                    return student;
          }
}
export default StudentService;