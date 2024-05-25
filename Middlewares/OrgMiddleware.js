import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../Config/index.js";
import AuthError from "../Errors/AuthError.js";
import Account from "../Models/Account.js";
import Organization from "../Models/Organization.js";
import { ORGANIZATION } from "../Utils/Constraints.js";

const OrgMiddleware=async(req,res,next)=>{
          try{
                    //decode jwt
                    const token=req.cookies["Authorization"];
                    if(!token) throw new AuthError("Token does not exist");
                    var accountId=jwt.verify(token, SECRET_KEY);
                    const account=await Account.findById(accountId);
                    // authorization
                    if(account.role!=ORGANIZATION) throw new AuthError("This endpoint is only for organizations");
                    var org=await Organization.findOne({account:account._id});
                    // if(!org.isVerified) throw new AuthError("This organization need to be verified by admin");
                    if(!org) throw new AuthError("Organization with accountId "+account._id+" does not exist");
                    req.org=org;
                    next();
          }
          catch(error){
                    next(error);
          }
}
export default OrgMiddleware;