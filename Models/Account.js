import mongoose, { Mongoose, Schema } from "mongoose";

const AccountSchema=new Schema({
          email:{
                    type: String,
                    required: true,
                    unique: true
          },
          password:{
                    type: String,
                    required: true
          },
          role:{
                    type: String,
                    required:true,
                    enum:["STUDENT","ORGANIZATION","ADMIN"]
          }
});
AccountSchema.statics.findByEmail=async(email)=>{
          return await Account.findOne({email: email});
}
const Account=new mongoose.model("Account",AccountSchema);
export default Account;