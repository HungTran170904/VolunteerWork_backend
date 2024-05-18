import mongoose, { Schema } from "mongoose";
const {ObjectId}=Schema.Types;

const PostSchema=new Schema({
          postedDate: Date,
          content: String,
          imageUrl: String,
          likes: [ObjectId],
          volunteerWork:{
                    type: ObjectId,
                    ref: "VolunteerWork",
                    required: true
          }
});
const Post=new mongoose.model("Post",PostSchema);
export default Post;