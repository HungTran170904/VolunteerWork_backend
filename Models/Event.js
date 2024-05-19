import mongoose, { Schema } from "mongoose";
const {ObjectId}=Schema.Types;
const EventSchema=new Schema({
          title: String,
          desciption: String,
          startDate: Date,
          endDate: Date
});
const Event=new mongoose.model("Event",EventSchema);
export default Event;