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
          async sendOTPcode(destEmail, otpCode){
                    var mailOptions = {
                              from: EMAIL_USER,
                              to: destEmail,
                              subject: 'VolunteerConnect: OTP code',
                              html: `<div>The OTP code is <b>${otpCode}<b><div><br><div>Please enter OTP code within 10 minutes<div>`
                    };
                    this.transporter.sendMail(mailOptions,(error, info)=>{
                              if (error) {
                                console.log(error);
                              } else {
                                console.log('Email sent: ' + info.response);
                              }
                    });
          }
}
export default new EmailService();