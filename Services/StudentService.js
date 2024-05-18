import CloudinaryService from "./CloudinaryService.js";

class StudentService{
          async uploadAvatar(student,file){
                    student.avatarUrl=await CloudinaryService.uploadImage(file,student.avatarUrl);
                    await student.save();
                    return student.avatarUrl;
          }
}
export default new StudentService();