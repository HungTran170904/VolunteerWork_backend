import express from "express"
import AdminMiddleware from "../Middlewares/AdminMiddleware.js";
import GiftController from "../Controllers/GiftController.js";
import StudentMiddleware from "../Middlewares/StudentMiddleware.js";
import UploadMiddleware from "../Middlewares/UploadMiddleware.js";

const GiftRouter=express.Router();

GiftRouter.post("/addGift", AdminMiddleware,UploadMiddleware, GiftController.addGift);
GiftRouter.get("/gifts",GiftController.getGifts);
GiftRouter.post("/awardGift",StudentMiddleware, GiftController.awardGift);

export default GiftRouter;
