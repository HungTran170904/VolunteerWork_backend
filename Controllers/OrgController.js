import OrgService from "../Services/OrgService.js";

class OrgController{
          async getOrganizationInfo(req,res,next){
                    try{
                              return res.status(200).json(req.org);
                    }
                    catch(error){
                              next(error);
                    }
          }
          async uploadAvatar(req,res,next){
                    try{
                              var avatarUrl=await OrgService.uploadAvatar(req.org, req.file);
                              return res.status(200).json(avatarUrl);
                    }
                    catch(error){
                              next(error);
                    }
          }
          async verifyOrganization(req,res,next){
                    try{
                              await OrgService.verifyOrganization(req.query["organizationId"]);
                              return res.status(204).end();
                    }
                    catch(error){
                              next(error);
                    }
          }
}
export default new OrgController();