import mongoose, { Schema } from "mongoose";
const {ObjectId}=Schema.Types;

const QuestionSchema=new Schema({
          question: {
                    type: String,
                    required: true
          },
          answer: String,
          createdAt: Date,
          studentId:{
                    type: ObjectId,
                    ref: "Student",
                    required: true
          },
          volunteerWorkId:{
                    type: ObjectId,
                    ref: "VolunteerWork",
                    required: true
          }
});
const Question=new mongoose.model("Question", QuestionSchema);
export default Question;