import OrganizationService from "../Services/OrganizationService.js";

class OrganizationController{
          async getOrganizationInfo(req,res,next){
                    try{
                              var org=await OrganizationService.getOrganizationInfo(req.account);
                              return res.status(200).json(org);
                    }
                    catch(error){
                              next(error);
                    }
          }
          async uploadAvatar(req,res,next){
                    try{
                              var avatarUrl=await OrganizationService.uploadAvatar(req.account, req.file);
                              return res.status(200).json(avatarUrl);
                    }
                    catch(error){
                              next(error);
                    }
          }
}
export default new OrganizationController();