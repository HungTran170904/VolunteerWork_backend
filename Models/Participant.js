import mongoose, { Schema } from "mongoose";
const {ObjectId}=Schema.Types;

const ParticipantSchema=new Schema({
          studentId: ObjectId,
          volunteerWorkId: ObjectId,
          status:{
                    type: String,
                    enum: ["ACCEPTED","UNACCEPTED","WAITING","LEAVED"]
          },
          feedback: String,
          rating: Number
});
const Participant=new mongoose.model("Participant", ParticipantSchema);
export default Participant;