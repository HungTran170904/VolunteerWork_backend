import RequestError from "../Errors/RequestError.js";
import Organization from "../Models/Organization.js";
import { ORGANIZATION } from "../Utils/Constraints.js";
import CloudinaryService from "./CloudinaryService.js";

class OrganizationService{
          async getOrganizationInfo(account){
                    var org=await Organization.findOne({account:account._id});
                    if(!org) throw new RequestError("Organization with accountId "+account._id+" does not exist");
                    return org;
          }
          async uploadAvatar(account,file){
                    if(account.role!=ORGANIZATION) throw new AuthError("This endpoint is only for students");
                    var org=await Organization.findOne({account:account._id});
                    org.avatarUrl=await CloudinaryService.uploadImage(file,org.avatarUrl);
                    await org.save();
                    return org.avatarUrl;
          }
}
export default new OrganizationService();