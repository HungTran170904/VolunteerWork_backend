import express from "express";
import cors from "cors";
import { connectDatabase } from "./Config/DBConfig.js";
import { PORT } from "./Config/index.js";
import compression from "compression";
import cookieParser from "cookie-parser";
import AuthRouter from "./Routers/AuthRouter.js";
import ErrorMiddleware from "./Middlewares/ErrorMiddleware.js";
import OrgRouter from "./Routers/OrgRouter.js";
import StudentRouter from "./Routers/StudentRouter.js";
import AuthMiddleware from "./Middlewares/AuthMiddleware.js";

const app=express()

connectDatabase()

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}))
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/api/auth",AuthRouter);
app.use("/api/student",AuthMiddleware,StudentRouter);
app.use("/api/organization",AuthMiddleware,OrgRouter);
app.use(ErrorMiddleware);

app.listen(PORT, ()=>{
          console.log("Server is opened");
})