import express from "express";
import OrganizationController from "../Controllers/OrganizationController.js";
import UploadMiddleware from "../Middlewares/UploadMiddleware.js";




const OrganizationRouter=express.Router();

OrganizationRouter.get("/organizationInfo",OrganizationController.getOrganizationInfo);
OrganizationRouter.post("/uploadAvatar",UploadMiddleware,OrganizationController.uploadAvatar);

export default OrganizationRouter;