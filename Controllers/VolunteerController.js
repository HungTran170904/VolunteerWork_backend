import VolunteerService from "../Services/VolunteerService.js";

class VolunteerController{
          async addVolunteerWork(req, res, next){
                    try{
                              var volunteerWork= await 
                                        VolunteerService.addVolunteerWork(req.org,req.body.jsonData,req.file);
                              return res.status(200).json(volunteerWork);
                    }
                    catch(error){
                              next(error);
                    }
          }
          async getVolunteerWorks(req, res, next){
                    try{
                              var volunteerWorks= await VolunteerService.getVolunteerWorks(req.body);
                              return res.status(200).json(volunteerWorks);
                    }
                    catch(error){
                              next(error);
                    }
          }
          async getRegisteredVolunteerWorks(req, res, next){
                    try{
                              var volunteerWorks= await VolunteerService.getRegisteredVolunteerWorks(req.student);
                              return res.status(200).json(volunteerWorks);
                    }
                    catch(error){
                              next(error);
                    }
          }
          async getAttendedEventsOfWeek(req, res, next){
                    try{
                              var events= await VolunteerService.getAttendedEventsOfWeek(req.student,req.query["week"]);
                              return res.status(200).json(events);
                    }
                    catch(error){
                              next(error);
                    }
          }
          async addEvent(req, res, next){
                    try{
                              var event= await VolunteerService.addEvent(req.body);
                              return res.status(200).json(event);
                    }
                    catch(error){
                              next(error);
                    }
          }
}
export default new VolunteerController();