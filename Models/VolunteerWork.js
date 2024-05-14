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
          organizationId: {
                    type: ObjectId,
                    ref: "Organization",
                    required: true
          }
});
const VolunteerWork= new mongoose.model("VolunteerWork", VolunteerWorkSchema);
export default VolunteerWork;