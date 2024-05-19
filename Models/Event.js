import mongoose, { Schema } from "mongoose";
const {ObjectId}=Schema.Types;
const EventSchema=new Schema({
          title: String,
          desciption: String,
          startDate: Date,
          endDate: Date
});
/*EventSchema.statics.findByVolunteerIdsAndWeekRange
          =async(volunteerWorkIds,weekRange)=>{
                    return await Event.find({
                              volunteerWork: {$in: [...volunteerWorkIds]},
                              startDate: {$gte: weekRange.startDate},
                              endDate: {$lte: weekRange.endDate}
                    })
                    .populate("volunteerWork")
                    .exec();
          }*/
const Event=new mongoose.model("Event",EventSchema);
export default Event;