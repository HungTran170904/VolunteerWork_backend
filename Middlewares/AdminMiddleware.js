import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../Config/index.js";
import AuthError from "../Errors/AuthError.js";
import Account from "../Models/Account.js";
import { ADMIN } from "../Utils/Constraints.js";


const AdminMiddleware=async(req,res,next)=>{
          try{
                    //decode jwt
                    const token=req.cookies["Authorization"];
                    if(!token) throw new AuthError("Token does not exist");
                    var accountId=jwt.verify(token, SECRET_KEY);
                    const account=await Account.findById(accountId);
                    // authorization
                    if(account.role!=ADMIN) throw new AuthError("This endpoint is only for admins");
                    next();
          }
          catch(error){
                    next(error);
          }
}
export default AdminMiddleware;