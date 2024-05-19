import mongoose from "mongoose";

const createTransaction=async(func)=>{
          const session = await mongoose.startSession();
                    session.startTransaction();
                    try{
                              return await func();
                    } catch(error){
                              await session.abortTransaction();
                              throw error;
                    } finally{
                              session.endSession();
                    }
}
export default createTransaction;