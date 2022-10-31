import express from "express";
const Router = express.Router()
import GenerateRouter from "./GenerateQrcode.js"


//Generate main Router
Router.use('/main', GenerateRouter)

export default Router
