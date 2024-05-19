import express from "express"
import ParticipantController from "../Controllers/ParticipantController.js";
import StudentMiddleware from "../Middlewares/StudentMiddleware.js";
import OrgMiddleware from "../Middlewares/OrgMiddleware.js";

const ParticipantRouter=express.Router();

ParticipantRouter.post("/joinVolunteerWork",StudentMiddleware,ParticipantController.joinVolunteerWork);
ParticipantRouter.post("/acceptParticipant",OrgMiddleware, ParticipantController.acceptParticipant);
ParticipantRouter.post("/participants",OrgMiddleware,ParticipantController.getParticipants);
ParticipantRouter.post("/feedback",OrgMiddleware,ParticipantController.giveFeedBack);

export default ParticipantRouter;