import mongoose from "mongoose";
import RequestError from "../Errors/RequestError.js";
import Participant from "../Models/Participant.js";
import VolunteerWork from "../Models/VolunteerWork.js";
import DateUtil from "../Utils/dateUtil.js";
import CloudinaryService from "./CloudinaryService.js";
import Event from "../Models/Event.js";
import EmailService from "./EmailService.js";
import Student from "../Models/Student.js";
import Question from "../Models/Question.js";
import createTransaction from "../Utils/Transaction.js";

class VolunteerService{
          async addVolunteerWork(org,jsonData,file){ 
                    return await createTransaction(async()=>{
                              var volunteerWork=JSON.parse(jsonData);   
                              if(!volunteerWork.title)  throw new RequestError("Title is required");  
                              if(!volunteerWork.receivedCoins) throw new RequestError("ReceivedCoins is required");
                              volunteerWork.createdAt=new Date();
                              volunteerWork.organization=org._id;  
                              if(Array.isArray(volunteerWork.events)&&volunteerWork.events.length > 0){
                                        const savedEvents= await Event.insertMany(volunteerWork.events);
                                        volunteerWork.events=[];
                                        for(var savedEvent of savedEvents) 
                                                  volunteerWork.events.push(savedEvent._id);
                              }
                              if(file) volunteerWork.imageUrl=await CloudinaryService.uploadImage(file,null);
                              var savedVolunteerWork= await VolunteerWork.create(volunteerWork);
                              return savedVolunteerWork;
                   });
          }
          async getVolunteerWorks({page, limit}){
                    if(limit<=0) throw new RequestError("Limit must be positive");
                    if(page<=0) page=1;
                    return await VolunteerWork.findWithPagination(page,limit);
          }
          async getOrgVolunteerWorks(org,{page, limit}){
                    console.log("Ok1")
                    if(limit<=0) throw new RequestError("Limit must be positive");
                    if(page<=0) page=1;
                    return await VolunteerWork.findWithPaginationAndOrgId(page,limit, org._id);
          }
          async getAttendedEventsOfWeek(student, week){
                    var weekRange=DateUtil.getWeekDateRange(week);
                    console.log("Week range",weekRange);
                    var volunteerWorkIds=await Participant.findVolunteerWorkIdsByStudentId(student._id);
                    var volunteerWorks=await VolunteerWork.findWithEvents(volunteerWorkIds,weekRange);
                    var events=[];
                    for(const volunteerWork of volunteerWorks){
                              if(volunteerWork.events){                                       
                                        for(var event of volunteerWork.events){
                                                  events.push({...event.toObject(), volunteerWorkTitle: volunteerWork.title});
                                        }
                              }
                    }
                    return events;
          }
          async getRegisteredVolunteerWorks(student){
                    var volunteerWorkIds=await Participant.findVolunteerWorkIdsByStudentId(student._id);
                    var volunteerWorks=await VolunteerWork.findByIds(volunteerWorkIds);
                    return volunteerWorks;
          }
          async addEvent(event){ 
                    return await createTransaction(async()=>{
                              var volunteerWork=await VolunteerWork.findById(event.volunteerWorkId);
                              if(!volunteerWork) throw new RequestError("VolunteerWork of the event does not exist");
                              var savedEvent=await Event.create(event);
                              if(!volunteerWork.events) volunteerWork.events=[];
                              volunteerWork.events.push(savedEvent._id);
                              await volunteerWork.save();
                              var timeOut=savedEvent.startDate.getTime()- (new Date()).getTime()-1000; //1 day ahead
                              if(timeOut>0){
                                        var studentIds=await Participant.findStudentIdsByVolunteerWorkId(volunteerWork._id);
                                        var students=await Student.findByIds(studentIds);
                                        for(var student of students){
                                                  setTimeout(()=>{
                                                            EmailService.remindUpcomingVolunteerWork(student,savedEvent);
                                                  },1000);
                                        }                  
                              }
                              return savedEvent;
                    });
          }
          async addQuestion(student,question){
                    return await createTransaction(async()=>{
                              if(!question.questionText||question.questionText.trim()=="")
                                        throw new RequestError("Please fill in your question about this volunteer work");
                              var volunteerWork=await VolunteerWork.findById(question.volunteerWorkId);
                              if(!volunteerWork) throw new RequestError("VolunteerWork of this question does not exist");
                              question.studentId=student._id;
                              question.createdAt=new Date();
                              var savedQuestion= await Question.create(question);
                              if(!volunteerWork.questions) volunteerWork.questions=[savedQuestion._id];
                              else volunteerWork.questions.push(savedQuestion._id);
                              await volunteerWork.save();
                              return savedQuestion;
                    });
          }
          async answerQuestion({questionId, answer}){
                    var question=await Question.findById(questionId);
                    if(!question) throw new RequestError("QuestionId "+questionId+" does not exist");
                    question.answer=answer;
                    await question.save();
          }
}
export default new VolunteerService();