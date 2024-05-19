import mongoose, { Schema } from "mongoose";
import Event from "./Event.js";
const {ObjectId}=Schema.Types;

const VolunteerWorkSchema=Schema({
          title: String,
          createdAt: Date,
          endRegisteredDate: Date,
          events:[{type:ObjectId, ref:"Event"}],
          questions: [{type: ObjectId, ref:"Question"}],
          imageUrl: String,
          description: String,
          receivedCoins: Number,
          needDonation: Boolean,
          organization: {
                    type: ObjectId,
                    ref: "Organization",
                    required: true
          }
});
VolunteerWorkSchema.statics.findWithPagination=async(page,limit)=>{
          return await VolunteerWork.find()
                                        .populate("organization")
                                        .populate("events")
                                        .populate("questions")
                                        .limit(limit)
                                        .skip((page-1)*limit)
                                        .sort({createdAt:-1})
                                        .exec();
}
VolunteerWorkSchema.statics.findWithPaginationAndOrgId=
      async(page,limit,organizationId)=>{
            return await VolunteerWork.find({organization: organizationId.toString()})
                                          .populate("events")
                                          .populate("questions")
                                          .limit(limit)
                                          .skip((page-1)*limit)
                                          .sort({createdAt:-1})
                                          .exec();
}
VolunteerWorkSchema.statics.findWithEvents=
          async(volunteerWorkIds, weekRange)=>{
                var volunteerWorks= await VolunteerWork.find({
                              _id: {$in: volunteerWorkIds}
                    })
                    .populate({
                              path: "events",
                              match: {startDate:{
                                        $gte: weekRange.startDate,
                                        $lte: weekRange.endDate
                              }}
                    });
                    return volunteerWorks;
          }
VolunteerWorkSchema.statics.findByIds=
          async(volunteerWorkIds)=>{
                    var volunteerWorks= await VolunteerWork.find({
                              _id: {$in: volunteerWorkIds}
                    })
                    .populate("events")
                    .populate("organization")
                    .exec();
                    return volunteerWorks;
          }
const VolunteerWork= new mongoose.model("VolunteerWork", VolunteerWorkSchema);
export default VolunteerWork;