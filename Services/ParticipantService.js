import RequestError from "../Errors/RequestError.js";
import Participant from "../Models/Participant.js";
import Student from "../Models/Student.js";
import VolunteerWork from "../Models/VolunteerWork.js";
import { ACCEPTED, FINISH, UNACCEPTED, WAITING } from "../Utils/Constraints.js";
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
                    if(isAccepted){
                              await volunteerWork.populate("events");
                              for(var event of volunteerWork.events){
                                        var timeOut=event.startDate.getTime()- (new Date()).getTime()-24*3600*1000;
                                        if(timeOut>0){
                                                  setTimeout(()=>{
                                                            EmailService.remindUpcomingVolunteerWork(student,event);
                                                  },1000);
                                        } 
                              }
                    }
                    return participant;
          }
          async getParticipants({volunteerWorkId, status}){
                    if(!status) return await Participant.find({volunteerWorkId:volunteerWorkId});
                    else return await Participant.find({
                              volunteerWorkId:volunteerWorkId,
                              status: status
                    });
          }
          async giveFeedBack({participantId,feedback, rating}){
                    if(rating<0||rating>10) throw new RequestError("Rating must be in range [0,10]");
                    var participant= await Participant.findById(participantId);
                    if(!participant) throw new RequestError("ParticipantId "+participantId+" does not exist");
                    var volunteerWork=await VolunteerWork.findById(participant.volunteerWorkId);
                    var student=await Student.findById(participant.studentId);

                    participant.feedback=feedback;
                    participant.rating=rating;
                    if(participant.receivedCoins) student.totalCoins-=participant.receivedCoins;
                    participant.receivedCoins=(rating*volunteerWork.receivedCoins)/10;
                    participant.status=FINISH;
                    await participant.save();
                          
                    student.totalCoins+=participant.receivedCoins;
                    await student.save();
                    return participant;
          }
}
export default new ParticipantService();