import express from "express";
import { sendMessage } from '../controllers/chat.controller';

const routes = express.Router();

routes.post("/api/v1/chat", sendMessage);

export default routes;