import express from "express";
import OrgController from "../Controllers/OrgController.js";
import UploadMiddleware from "../Middlewares/UploadMiddleware.js";
import OrgMiddleware from "../Middlewares/OrgMiddleware.js";
import AdminMiddleware from "../Middlewares/AdminMiddleware.js";




const OrgRouter=express.Router();

OrgRouter.get("/organizationInfo",OrgMiddleware,OrgController.getOrganizationInfo);
OrgRouter.post("/uploadAvatar",OrgMiddleware,UploadMiddleware,OrgController.uploadAvatar);
OrgRouter.get("/verifyOrganization",AdminMiddleware,OrgController.verifyOrganization);

export default OrgRouter;