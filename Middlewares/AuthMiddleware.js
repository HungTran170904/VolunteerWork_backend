import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../Config/index.js";
import AuthError from "../Errors/AuthError.js";
import { ADMIN } from "../Utils/Constraints.js";
import Account from "../Models/Account.js";
const AuthMiddleware=async(req,res,next)=>{         
          try {    
                    //decode jwt
                    const token=req.cookies["Authorization"];
                    if(!token) throw new AuthError("Token does not exist");
                    var accountId=jwt.verify(token, SECRET_KEY);
                    const account=await Account.findById(accountId);
                    //Authorization
                    if(req.originalUrl.indexOf("/admin")>=0&&account.role!=ADMIN)
                              throw new AuthError("You do not have permissions to access this url endpoint");
                    req.account=account;
                    next();
          } catch (error) {
                    next(error);
          }
}
export default AuthMiddleware;