import AuthError from "../Errors/AuthError.js";
import { ADMIN } from "../Utils/Constraints.js";


const AdminMiddleware=async(req,res,next)=>{
          try{
                    var account=req.account;
                    if(account.role!=ADMIN) throw new AuthError("This endpoint is only for admins");
                    next();
          }
          catch(error){
                    next(error);
          }
}
export default AdminMiddleware;