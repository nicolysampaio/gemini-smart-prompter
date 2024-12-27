import express from "express";
import chat from "./chat.routes"
import template from "./template.routes"

const routes = (app: any) => {
  app.use(express.json(), chat, template);
}

export default routes;