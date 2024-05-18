import VolunteerService from "../Services/VolunteerService.js";

class VolunteerController{
          async addVolunteerWork(req, res, next){
                    try{
                              var volunteerWork= await VolunteerService.addVolunteerWork(req.body.jsonData,req.file);
                              return res.status(200).json(volunteerWork);
                    }
                    catch(error){
                              next(error);
                    }
          }
}
export default new VolunteerController();