import mongoose, { Schema } from "mongoose";
const {ObjectId}=Schema.Types;

const ParticipationSchema=new Schema({
          studentId:{
                    type: ObjectId,
                    ref: "Student",
                    required: true
          },
          volunteerWorkId:{
                    type: ObjectId,
                    ref: "VolunteerWork",
                    required: true
          },
          status: String,
          feedback: String,
          rating: Number
});
const Participation=new mongoose.model("Participation", ParticipationSchema);
export default Participation;