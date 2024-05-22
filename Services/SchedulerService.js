import Participant from "../Models/Participant.js";
import Student from "../Models/Student.js";
import EmailService from "./EmailService.js";

class SchedulerService{
          constructor(){
                    this.scheduledEvents=new Map();
          }

          scheduleEvent(volunteerWork,event, noDeletion){
                    if(!noDeletion) this.deleteScheduledEvent(event._id);
                    //1 day ahead
                    var time=event.startDate.getTime()- (new Date()).getTime()-24*3600*1000;
                    if(time<=0) return;
                    var timeOut=setTimeout(async() => {
                              var studentIds=await Participant.findStudentIdsByVolunteerWorkId(volunteerWork._id);
                              var students=await Student.findByIds(studentIds);
                              EmailService.remindUpcomingVolunteerWork(students,event);
                              this.scheduledEvents.delete(event._id);
                    }, time);
                    this.scheduledEvents.set(event._id.toString(),timeOut);
          }

          async recoverScheduledEvents(volunteerWork){
                   await volunteerWork.populate("events");
                    for(var event of volunteerWork.events){
                              if(!this.scheduledEvents.has(event._id)){
                                        this.scheduleEvent(volunteerWork,event,true);
                              }
                    }
          }

          deleteScheduledEvent(eventId){
                    if(eventId instanceof Object && eventId.constructor.name === 'ObjectID'){
                              eventId=eventId.toString();
                    }
                    if(this.scheduledEvents.has(eventId)){
                              var timeOut=this.scheduledEvents.get(eventId);
                              clearTimeout(timeOut);
                              this.scheduledEvents.delete(eventId);
                              console.log("Ok")
                    }
          }

          deleteScheduledEvents(eventIds){
                    for(var eventId in eventIds){
                              this.deleteScheduledEvent(eventId);
                    }
          }
}
export default new SchedulerService();