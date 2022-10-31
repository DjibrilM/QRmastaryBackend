import express from "express";
const Router = express.Router();
import { createQrImage, getImageBystream } from "../controllers/generateQrcode.js";

//routers section
Router.post("/create", createQrImage)
Router.get("/downloadImage/:id", getImageBystream)
export default Router


