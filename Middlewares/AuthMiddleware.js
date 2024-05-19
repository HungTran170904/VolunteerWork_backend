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
                    req.account=account;
                    next();
          } catch (error) {
                    error.status=401;
                    next(error);
          }
}
export default AuthMiddleware;