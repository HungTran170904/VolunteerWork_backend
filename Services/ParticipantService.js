import RequestError from "../Errors/RequestError.js";
import Participant from "../Models/Participant.js";
import Student from "../Models/Student.js";
import VolunteerWork from "../Models/VolunteerWork.js";
import { ACCEPTED, WAITING } from "../Utils/Constraints.js";
import EmailService from "./EmailService.js";

class ParticipantService{
          async joinVolunteerWork(student,participant){
                    participant.studentId=student._id;
                    var volunteerWork=await VolunteerWork.findById(participant.volunteerWorkId);
                    if(!volunteerWork) throw new RequestError("OrganizationId "+participant.organizationId+" is invalid");
                    participant.status=WAITING;
                    return await Participant.create(participant);
          }
          async leaveVolunteerWork(student, participantId){
                    var participant=await Participant.findOne({ _id:participantId, studentId: student._id});
                    if(!participant) throw new RequestError("Partipant not found!");
                    await VolunteerWork.deleteOne({_id: participantId});
          }
          async acceptPartipation({participantId, volunteerWorkId}){
                    var participant=await Participant.findById(participantId);
                    if(!participant) throw new RequestError("Partipant not found!");
                    var volunteerWork=VolunteerWork.findById(participant.volunteerWorkId);
                    participant.status=ACCEPTED;
                    await participant.save();
                    // EmailService.sendParticipantAccepted()
                    setTimeout(()=>{

                    })
          }
          async getParticipants(student, week){

          }
}
export default new ParticipantService();