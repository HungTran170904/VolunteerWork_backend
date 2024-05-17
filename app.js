import express from "express";
import cors from "cors";
import { connectDatabase } from "./Config/DBConfig.js";
import { PORT } from "./Config/index.js";
import compression from "compression";
import cookieParser from "cookie-parser";
import SwaggerConfig from "./Config/Swagger-config.js";
import swaggerUi from "swagger-ui-express";
import AuthRouter from "./Routers/AuthRouter.js";
import ErrorMiddleware from "./Middlewares/ErrorMiddleware.js";

const app=express()

connectDatabase()

app.use(cors())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(SwaggerConfig));

app.use("/api/auth",AuthRouter);
app.use(ErrorMiddleware);

app.listen(PORT, ()=>{
          console.log("Server is opened");
})