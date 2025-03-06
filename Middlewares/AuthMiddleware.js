import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../Config/index.js";
import AuthError from "../Errors/AuthError.js";
import Account from "../Models/Account.js";

export async function getAccountFromToken(req){
          const token=req.headers["authorization"];
          if(!token) throw new AuthError("Token does not exist");
          var accountId=jwt.verify(token, SECRET_KEY);
          return await Account.findById(accountId);
}

const AuthMiddleware=async(req,res,next)=>{         
          try {    
                    req.account= await getAccountFromToken(req);
                    next();
          } catch (error) {
                    error.status=401;
                    next(error);
          }
}
export default AuthMiddleware;