import express from "express";
import OrgController from "../Controllers/OrgController.js";
import UploadMiddleware from "../Middlewares/UploadMiddleware.js";
import OrgMiddleware from "../Middlewares/OrgMiddleware.js";
import AdminMiddleware from "../Middlewares/AdminMiddleware.js";

const OrgRouter=express.Router();

// get info of logined organization
OrgRouter.get("/loginedInfo", OrgMiddleware,OrgController.getLoginedInfo);

// get general info of an organization
OrgRouter.get("/organizationInfo",OrgController.getOrganizationInfo);

OrgRouter.get("/searchByName", OrgController.searchByName);

// upload avatar
OrgRouter.post("/uploadAvatar",OrgMiddleware,UploadMiddleware,OrgController.uploadAvatar);

// admin verify organization
OrgRouter.get("/verifyOrganization", AdminMiddleware,OrgController.verifyOrganization);

// update organization
OrgRouter.post("/updateOrganization", OrgMiddleware, OrgController.updateOrganization);

// get organization with pagination
OrgRouter.post("/organizations", OrgController.getOrganizations);

export default OrgRouter;