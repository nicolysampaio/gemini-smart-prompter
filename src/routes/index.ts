import express from "express";
import chat from "./chat.routes"

const routes = (app: any) => {
  app.use(express.json(), chat);
}

export default routes;