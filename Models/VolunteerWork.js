import mongoose, { Schema } from "mongoose";
const {ObjectId}=Schema.Types;
const VolunteerWorkSchema=Schema({
          title: String,
          createdAt: Date,
          endRegisteredDate: Date,
          startDate: Date,
          endDate: Date,
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
                                                            .limit(limit)
                                                            .skip((page-1)*limit)
                                                            .sort({createdAt:-1})
                                                            .exec();
}
const VolunteerWork= new mongoose.model("VolunteerWork", VolunteerWorkSchema);
export default VolunteerWork;