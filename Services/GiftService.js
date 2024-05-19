import RequestError from "../Errors/RequestError.js";
import Gift from "../Models/Gift.js";
import CloudinaryService from "./CloudinaryService.js";

class GiftService{
          async addGift(jsonData, file){
                    var gift=JSON.parse(jsonData);
                    if(!gift.giftName) throw new RequestError("giftName is required");
                    if(!gift.requiredCoins) throw new RequestError("requiredCoins is required");
                    if(file) gift.imageUrl=await CloudinaryService.uploadImage(file,null);
                    gift.receiverInfo=null;
                    return await Gift.create(gift);
          }
          async getGifts(){
                    return await Gift.find({receiverInfo: null});
          }
          async awardGift(student,{giftId, receiverAddress, receivedDate}){
                    var gift=await Gift.findById(giftId);
                    if(!gift) throw new RequestError("GiftId "+giftId+" does not exist");
                    if(gift.receiverInfo.toObject()!=null)
                              throw new RequestError("Apologies! This gift has already been granted");
                    if(student.totalCoins<gift.requiredCoins)
                              throw new RequestError("Sorry! You don't have enough coins to get this gift");
                    student.totalCoins-=gift.requiredCoins;
                    gift.receiverInfo={
                              studentId: student._id,
                              receiverAddress,                 
                              receivedDate
                    }
                    await student.save();
                    return await gift.save();
          }    
}
export default new GiftService();