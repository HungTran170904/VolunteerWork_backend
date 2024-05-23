import OrgService from "../Services/OrgService.js";

class OrgController{
          async getLoginedInfo(req,res,next){
                    try{
                              return res.status(200).json(req.org);
                    }
                    catch(error){
                              next(error);
                    }
          }

          async getOrganizationInfo(req,res,next){
                    try{
                              var organization=await OrgService.getOrganizationInfo(req.query["organizationId"]);
                              return res.status(200).json(organization);
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

          async updateOrganization(req, res, next){
                    try{                            
                              var org=await OrgService.updateOrganization(req.org,req.body);
                              return res.status(200).json(org);
                    }
                    catch(error){
                              next(error);
                    }
          }

          async getOrganizations(req,res,next){
                    try{
                              var organizations=await OrgService.getOrganizations(req.body);
                              return res.status(200).json(organizations);
                    }
                    catch(error){
                              next(error);
                    }
          }
}
export default new OrgController();