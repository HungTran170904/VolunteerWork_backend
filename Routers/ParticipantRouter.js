import express from "express"
import ParticipantController from "../Controllers/ParticipantController.js";
import StudentMiddleware from "../Middlewares/StudentMiddleware.js";
import OrgMiddleware from "../Middlewares/OrgMiddleware.js";

const ParticipantRouter=express.Router();

ParticipantRouter.post("/joinVolunteerWork",StudentMiddleware,ParticipantController.joinVolunteerWork);
ParticipantRouter.post("/acceptParticipant",OrgMiddleware, ParticipantController.acceptParticipant);
ParticipantRouter.post("/feedback",OrgMiddleware,ParticipantController.giveFeedBack);
ParticipantRouter.post("/participants",ParticipantController.getParticipants);
ParticipantRouter.get("/finishedParticipants/:id",ParticipantController.getFinishedParticipants);



export default ParticipantRouter;