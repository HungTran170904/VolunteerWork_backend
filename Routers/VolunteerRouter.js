import express from "express"
import VolunteerController from "../Controllers/VolunteerController.js";
import OrgMiddleware from "../Middlewares/OrgMiddleware.js";
import StudentMiddleware from "../Middlewares/StudentMiddleware.js";
import UploadMiddleware from "../Middlewares/UploadMiddleware.js";
import AuthMiddleware from "../Middlewares/AuthMiddleware.js";

const VolunteerRouter=express.Router();

VolunteerRouter.post("/newVolunteerWork",AuthMiddleware,OrgMiddleware,UploadMiddleware,VolunteerController.addVolunteerWork);
VolunteerRouter.post("/volunteerWorks",VolunteerController.getVolunteerWorks);
VolunteerRouter.post("/orgVolunteerWorks",AuthMiddleware,OrgMiddleware,VolunteerController.getOrgVolunteerWorks);
VolunteerRouter.post("/registeredVolunteerWorks",AuthMiddleware,StudentMiddleware,VolunteerController.getRegisteredVolunteerWorks);
VolunteerRouter.get("/attendedEventsOfWeek",AuthMiddleware,StudentMiddleware,VolunteerController.getAttendedEventsOfWeek);
VolunteerRouter.post("/newEvent",AuthMiddleware,OrgMiddleware,VolunteerController.addEvent);
VolunteerRouter.post("/addQuestion",AuthMiddleware,StudentMiddleware,VolunteerController.addQuestion);
VolunteerRouter.post("/answerQuestion",AuthMiddleware,OrgMiddleware,VolunteerController.answerQuestion);

export default VolunteerRouter;