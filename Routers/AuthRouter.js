import express from 'express'
import AuthController from '../Controllers/AuthController.js';

const AuthRouter=express.Router();

AuthRouter.post("/login",AuthController.login);
AuthRouter.post("/registryStudent",AuthController.registryStudent);
AuthRouter.post("/registryOrganization",AuthController.registryOrganization);
AuthRouter.get("/sendOTPcode",AuthController.sendOTPcode);
AuthRouter.get("/activeAccount",AuthController.activeAccount);
AuthRouter.post("/changePassword",AuthController.changePassword);
AuthRouter.get("/logout",AuthController.logOut);

export default AuthRouter;