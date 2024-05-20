import express from "express"
import VolunteerController from "../Controllers/VolunteerController.js";
import OrgMiddleware from "../Middlewares/OrgMiddleware.js";
import StudentMiddleware from "../Middlewares/StudentMiddleware.js";
import UploadMiddleware from "../Middlewares/UploadMiddleware.js";
import AuthMiddleware from "../Middlewares/AuthMiddleware.js";

const VolunteerRouter=express.Router();

// add a new volunteer work
VolunteerRouter.post("/newVolunteerWork",OrgMiddleware,UploadMiddleware,VolunteerController.addVolunteerWork);

// get info of a volunteer work. Provide volunteerWorkId as a param
VolunteerRouter.get("/volunteerWorkInfo",VolunteerController.getVolunteerWorkInfo);

// get all volunteer work existed in db
VolunteerRouter.post("/volunteerWorks",VolunteerController.getVolunteerWorks);

// get all volunteer work of an organization
VolunteerRouter.post("/orgVolunteerWorks",VolunteerController.getOrgVolunteerWorks);

// get all volunteer work that a student has registered
VolunteerRouter.get("/registeredVolunteerWorks",StudentMiddleware,VolunteerController.getRegisteredVolunteerWorks);

// get all events that a student may attend during a time range. This endpoint is useful for making time table.
VolunteerRouter.post("/eventsDuring",StudentMiddleware,VolunteerController.getEventsDuring);

// add a new event to a volunteer work
VolunteerRouter.post("/newEvent",OrgMiddleware,VolunteerController.addEvent);

// this endpoint is used for student to raise question about the volunteer
VolunteerRouter.post("/addQuestion",StudentMiddleware,VolunteerController.addQuestion);

// the admin of organization answer the question
VolunteerRouter.post("/answerQuestion",OrgMiddleware,VolunteerController.answerQuestion);

export default VolunteerRouter;