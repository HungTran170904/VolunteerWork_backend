import jwt from "jsonwebtoken";
import { SECRET_KEY,EXPIRATION } from "../Config/index.js";
const TokenHandler={
          generateToken: (accountId)=>{
                    var token = jwt.sign(accountId, SECRET_KEY, { algorithm:"HS256", expiresIn: EXPIRATION});
                    return token;
          }
}
export default TokenHandler;