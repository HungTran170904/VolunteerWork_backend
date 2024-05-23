import ParticipantService from "../Services/ParticipantService.js";

class ParticipantController{
          async joinVolunteerWork(req, res, next){
                    try{
                              var participant=await ParticipantService.joinVolunteerWork(req.student, req.body);
                              return res.status(200).json(participant);
                    }
                    catch(error){
                              next(error);
                    }
          }
          async acceptParticipant(req, res, next){
                    try{
                              var participant=await ParticipantService.acceptPartipant(req.org,req.body);
                              return res.status(200).json(participant);
                    }
                    catch(error){
                              next(error);
                    }
          }
          async giveFeedBack(req, res, next){
                    try{
                              var participant=await ParticipantService.giveFeedBack(req.body)
                              return res.status(200).json(participant);
                    }
                    catch(error){
                              next(error);
                    }
          }
          async getParticipants(req, res, next){
                    try{
                              var participants=await ParticipantService.getParticipants(req.body);
                              return res.status(200).json(participants);
                    }
                    catch(error){
                              next(error);
                    }
          }
}
export default new ParticipantController();