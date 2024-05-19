import express from "express"
import VolunteerController from "../Controllers/VolunteerController.js";
import OrgMiddleware from "../Middlewares/OrgMiddleware.js";
import StudentMiddleware from "../Middlewares/StudentMiddleware.js";
import UploadMiddleware from "../Middlewares/UploadMiddleware.js";

const VolunteerRouter=express.Router();

VolunteerRouter.post("/newVolunteerWork",OrgMiddleware,UploadMiddleware,VolunteerController.addVolunteerWork);
VolunteerRouter.post("/volunteerWorks",VolunteerController.getVolunteerWorks);
VolunteerRouter.post("/orgVolunteerWorks",OrgMiddleware,VolunteerController.getOrgVolunteerWorks);
VolunteerRouter.post("/registeredVolunteerWorks",StudentMiddleware,VolunteerController.getRegisteredVolunteerWorks);
VolunteerRouter.get("/attendedEventsOfWeek",StudentMiddleware,VolunteerController.getAttendedEventsOfWeek);
VolunteerRouter.post("/newEvent",OrgMiddleware,VolunteerController.addEvent);
VolunteerRouter.post("/addQuestion",StudentMiddleware,VolunteerController.addQuestion);
VolunteerRouter.post("/answerQuestion",OrgMiddleware,VolunteerController.answerQuestion);

export default VolunteerRouter;