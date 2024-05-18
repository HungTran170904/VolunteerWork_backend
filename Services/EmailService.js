import { EMAIL_PASS, EMAIL_USER } from "../Config/index.js";
import nodemailer from "nodemailer";

class EmailService{
          constructor(){
                    this.transporter = nodemailer.createTransport({
                              service: 'gmail',
                              auth: {
                                user: EMAIL_USER,
                                pass: EMAIL_PASS
                              }
                    });                  
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
          async sendOTPcode(destEmail, otpCode){
                    var options = {
                              from: EMAIL_USER,
                              to: destEmail,
                              subject: 'VolunteerConnect: OTP code',
                              html: `<div>The OTP code is <b>${otpCode}<b><div><br><div>Please enter OTP code within 10 minutes<div>`
                    };
                   this.#send(options);
          }
          async sendParticipantAccpeted(destEmail,studentName,volunteerName){
                    var options = {
                              from: EMAIL_USER,
                              to: destEmail,
                              subject: 'Accept to join Volunteer Work',
                              html: `<h3>Hi ${studentName}, you've been accepted to join the volunteer project named ${volunteerName}. Congratulations!!<h3>`
                    };
                   this.#send(options);
          }
}
export default new EmailService();