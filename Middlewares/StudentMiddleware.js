import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../Config/index.js";
import AuthError from "../Errors/AuthError.js";
import Account from "../Models/Account.js";
import Student from "../Models/Student.js";
import { STUDENT } from "../Utils/Constraints.js";

const StudentMiddleware=async(req,res,next)=>{
          try{
                    //decode jwt
                    const token=req.cookies["Authorization"];
                    if(!token) throw new AuthError("Token does not exist");
                    var accountId=jwt.verify(token, SECRET_KEY);
                    const account=await Account.findById(accountId);
                    // authorization
                    if(account.role!=STUDENT) throw new AuthError("This endpoint is only for students");
                    var student=await Student.findOne({account:account._id});
                    if(!student) throw new AuthError("Student with accountId "+account._id+" does not exist");
                    req.student=student;
                    next();
          }
          catch(error){
                    next(error);
          }
}
export default StudentMiddleware;