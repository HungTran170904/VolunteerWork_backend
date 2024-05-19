import mongoose, { Schema } from "mongoose";
const {ObjectId}=Schema.Types;

const QuestionSchema=new Schema({
          questionText: {
                    type: String,
                    //required: true
          },
          answer: String,
          createdAt: Date,
          studentId: ObjectId
});
const Question=new mongoose.model("Question", QuestionSchema);
export default Question;