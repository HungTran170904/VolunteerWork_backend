import mongoose, { Schema } from "mongoose";
const {ObjectId}=Schema.Types;

const CommentSchema=new Schema({
          content: String,
          createdAt: Date,
          postId:{
                    type: ObjectId,
                    ref: "Post",
                    required: true
          },
          studentId:{
                    type: ObjectId,
                    ref: "Student",
                    required: true
          }
});
const Comment=new mongoose.model("Comment", CommentSchema);
export default Comment;