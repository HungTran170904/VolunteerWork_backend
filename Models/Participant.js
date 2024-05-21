import mongoose, { Schema } from "mongoose";
const {ObjectId}=Schema.Types;

const ParticipantSchema=new Schema({
    studentId: {
        type: ObjectId,
        ref: 'Student'
          },
          volunteerWorkId: ObjectId,
          status:{
                    type: String,
                    enum: ["ACCEPTED","UNACCEPTED","WAITING","FINISH"]
          },
          feedback: String,
          rating: Number,
          receivedCoins: Number
});
ParticipantSchema.statics.findVolunteerWorkIdsByStudentId=
          async(studentId)=>{
                    var results= await Participant.find({studentId: studentId})
                                        .select("volunteerWorkId")
                                        .exec();
                    return results.map(result=>result.volunteerWorkId);
}
ParticipantSchema.statics.findStudentIdsByVolunteerWorkId=
          async(volunteerWorkId)=>{
                    var results=await Participant.find({volunteerWorkId: volunteerWorkId})
                                                  .select("studentId")
                                                  .exec();
                    return results.map(result=>result.studentId);
          }
const Participant=new mongoose.model("Participant", ParticipantSchema);
export default Participant;