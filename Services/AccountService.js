import RequestError from "../Errors/RequestError.js";
import Account from "../Models/Account.js";
import bcrypt from "bcryptjs";

class AccountService{
          async login(email, password){
                    var account=Account.findByEmail(email);
                    if(!account) throw new RequestError("Email "+email+' does not exists');
                    if(!bcrypt.compareSync(password, account.password))
                              throw new RequestError("Password is incorrect");
                    
          }
}
export default new AccountService();