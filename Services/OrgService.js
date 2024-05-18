import AuthError from "../Errors/AuthError.js";
import RequestError from "../Errors/RequestError.js";
import Organization from "../Models/Organization.js";
import { ADMIN, ORGANIZATION } from "../Utils/Constraints.js";
import CloudinaryService from "./CloudinaryService.js";

class OrgService{
          async uploadAvatar(org,file){
                    org.avatarUrl=await CloudinaryService.uploadImage(file,org.avatarUrl);
                    await org.save();
                    return org.avatarUrl;
          }
          async verifyOrganization(organizationId){
                    var org=await Organization.findById(organizationId);
                    if(!org) throw new RequestError("OrganizationId "+organizationId+" does not exist");
                    org.isVerified=true;
                    await org.save();
          }
}
export default new OrgService();