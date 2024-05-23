import express from "express";
import OrgController from "../Controllers/OrgController.js";
import UploadMiddleware from "../Middlewares/UploadMiddleware.js";
import OrgMiddleware from "../Middlewares/OrgMiddleware.js";
import AdminMiddleware from "../Middlewares/AdminMiddleware.js";
import AuthMiddleware from "../Middlewares/AuthMiddleware.js";




const OrgRouter=express.Router();

OrgRouter.get("/loginedInfo",OrgMiddleware,OrgController.getLoginedInfo);
OrgRouter.get("/organizationInfo",OrgController.getOrganizationInfo);
OrgRouter.post("/uploadAvatar",OrgMiddleware,UploadMiddleware,OrgController.uploadAvatar);
OrgRouter.get("/verifyOrganization",AdminMiddleware,OrgController.verifyOrganization);
OrgRouter.post("/updateOrganization",OrgMiddleware, OrgController.updateOrganization);
OrgRouter.post("/organizations", OrgController.getOrganizations);

export default OrgRouter;