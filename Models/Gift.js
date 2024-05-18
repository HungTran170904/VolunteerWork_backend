import mongoose, { Schema } from "mongoose";
const {Double, ObjectId}=Schema.Types;
const GiftSchema=new Schema({
          giftName: {
                    type: String,
                    required: true
          },
          price: Double,
          imageUrl: String,
          requiredCoins: Number,
          studentId: ObjectId
});
const Gift=new mongoose.model("Gift", GiftSchema);
export default Gift;
