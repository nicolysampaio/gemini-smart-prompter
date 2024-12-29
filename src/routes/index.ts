import express from "express";
import chat from "./chat.routes"
import template from "./template.routes"
import category from "./category.routes"

const routes = (app: any) => {
  app.use(express.json(), chat, template, category);
}

export default routes;