import { EMAIL_PASS, EMAIL_USER } from "../Config/index.js";
import nodemailer from "nodemailer";
import DateUtil from "../Utils/dateUtil.js";

class EmailService{
          constructor(){
                    this.transporter = nodemailer.createTransport({
                              service: 'gmail',
                              auth: {
                                user: EMAIL_USER,
                                pass: EMAIL_PASS
                              }
                    });           
                    this.scheduledTasks=new Map();
          }
          #send(mailOptions){
            this.transporter.sendMail(mailOptions,(error, info)=>{
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
          });
          }
          sendOTPcode(destEmail, otpCode){
                    var options = {
                              from: EMAIL_USER,
                              to: destEmail,
                              subject: 'VolunteerConnect: OTP code',
                              html: `<div>The OTP code is <b>${otpCode}</b></div></br><div>Please enter OTP code within 10 minutes</div>`
                    };
                   this.#send(options);
          }
          sendParticipantAccepted(student,volunteerWork, isAccepted){
                    var content="";
                    if(isAccepted)  content=`<div>Hi ${student.name}, you've been accepted to join the volunteer project named <b>${volunteerWork.title}</b>. Congratulations!!</div>`;
                    else content=`<div>Hi ${student.name}, you has been rejected to join the volunteer project named <b>${volunteerWork.title}</b>. Wish you luck next time</div>`;
                    content+=`</br><img width=200px height=200px src="${volunteerWork.imageUrl}" />`
                    var options = {
                              from: EMAIL_USER,
                              to: student.account.email,
                              subject: 'Accept to join Volunteer Work',
                              html: content
                    };
                   this.#send(options);
          }
          remindUpcomingVolunteerWork(students, event){
                    for(var student of students){
                      var content=`<div>Hi ${student.name}, the volunteer event <b>${event.title}</b> will start at <b>${DateUtil.printDate(event.startDate)}</b>. Don't forget to attend this wonderful activity</div>`;
                      content+=`</br><img width=200px height=200px src="${volunteerWork.imageUrl}" />`;
                        var options = {
                            from: EMAIL_USER,
                            to: student.account.email,
                            subject: 'Upcoming Volunteer Work',
                            html: content
                        };
                        this.#send(options);
                    }
          }
}
export default new EmailService();