import AuthError from "../Errors/AuthError.js";
import RequestError from "../Errors/RequestError.js";
import Organization from "../Models/Organization.js";
import CloudinaryService from "./CloudinaryService.js";

class OrgService{
          async getOrganizationInfo(organizationId){
                    var organization=await Organization.findById(organizationId);
                    return organization;
          }

          async searchByName(searchString){
                    var organizations= await Organization.find({$text: {$search: searchString}})
                                                            .limit(10);
                    return organizations;
          }

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

          async updateOrganization(sOrg, uOrg){
                    const updatedFields=["name","description","facebookLink","affiliatedUnit","contactInfo"];
                    for(var updatedField of updatedFields){
                              if(uOrg[updatedField]&&uOrg[updatedField]!=null){
                                        sOrg[updatedField]=uOrg[updatedField];
                              }
                    }
                    await sOrg.save();
                    return sOrg;
          }

          async getOrganizations({page, limit}){
                    if(limit<=0) throw new RequestError("Limit must be positive");
                    if(page<=0) page=1;
                    const organizations=await Organization.findWithPagination(page, limit);
                    var total=await Organization.countAll();
                    return {
                              data: organizations,
                              pagination: {total, currentPage: page}
                    };
          }
}
export default new OrgService();