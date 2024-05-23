import RequestError from "../Errors/RequestError.js";
import Participant from "../Models/Participant.js";
import Student from "../Models/Student.js";
import VolunteerWork from "../Models/VolunteerWork.js";
import { ACCEPTED, FINISH, UNACCEPTED, WAITING } from "../Utils/Constraints.js";
import createTransaction from "../Utils/Transaction.js";
import EmailService from "./EmailService.js";

class ParticipantService{
          async joinVolunteerWork(student,participant){                   
                    var volunteerWork=await VolunteerWork.findById(participant.volunteerWorkId);
                    if(!volunteerWork) throw new RequestError("OrganizationId "+participant.organizationId+" is invalid");
                    var sParticipant=await Participant.findOne({studentId: student._id, volunteerWorkId: volunteerWork._id});
                    if(sParticipant) throw new RequestError("You have already registered to join this volunteer work");

                    participant.studentId=student._id;
                    participant.status=WAITING;
            participant.createdAt = new Date();
                    return await Participant.create(participant);
          }

          async leaveVolunteerWork(student, participantId){
                    var participant=await Participant.findOne({ _id:participantId, studentId: student._id});
                    if(!participant) throw new RequestError("Partipant not found!");
                    await VolunteerWork.deleteOne({_id: participantId});
          }

          async acceptPartipant(org,{participantId, isAccepted}){
                    var participant=await Participant.findById(participantId);
                    if(!participant) throw new RequestError("Partipant not found!");
                    var volunteerWork=await VolunteerWork.findById(participant.volunteerWorkId);
                    if(org._id.toString()!=volunteerWork.organization.toString())
                              throw new RequestError("You do not have permissions to this participant");
                    var student=await Student.findById(participant.studentId);
                    await student.populate("account");
                    participant.status=isAccepted?ACCEPTED:UNACCEPTED;
                    await participant.save();
                    EmailService.sendParticipantAccepted(student,volunteerWork, isAccepted);
                    return participant;
          }

          async getParticipants({volunteerWorkId, status}){
            if (!status) return await Participant.find({
					                    volunteerWorkId: volunteerWorkId,
				              }).populate('studentId');
            else return await Participant.find({
						            volunteerWorkId: volunteerWorkId,
						            status: status,
					            }).populate('studentId');
          }

          async giveFeedBack({participantId,feedback, rating}){
            return await createTransaction(async(session)=>{
              if(rating<0||rating>10) throw new RequestError("Rating must be in range [0,10]");
              var participant= await Participant.findById(participantId);
              if(!participant) throw new RequestError("ParticipantId "+participantId+" does not exist");
              var volunteerWork=await VolunteerWork.findById(participant.volunteerWorkId);
              var student=await Student.findById(participant.studentId);
  
              participant.feedback=feedback;
              participant.rating=rating;
              if(participant.receivedCoins) student.totalPoints-=participant.receivedCoins;
              participant.receivedCoins=(rating*volunteerWork.receivedCoins)/10;
              participant.status=FINISH;
              await participant.save({session});
          
              student.totalPoints+=participant.receivedCoins;
              await student.save({session});
              return participant;
            });
          }
}
export default new ParticipantService();