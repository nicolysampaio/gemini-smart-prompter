import express from "express";
import TemplateController from '../controllers/template.controller';

const routes = express.Router();

routes.get("/api/v1/templates", TemplateController.getAllTemplates);
routes.get("/api/v1/templates/:id", TemplateController.getTemplateById);
routes.post("/api/v1/templates", TemplateController.createTemplate);
routes.put("/api/v1/templates/:id", TemplateController.updateTemplate);
routes.delete("/api/v1/templates/:id", TemplateController.deleteTemplate);
routes.post("/api/v1/templates/:templateId/categories/:categoryId", TemplateController.addCategory);
routes.delete("/api/v1/templates/:templateId/categories/:categoryId", TemplateController.removeCategory);

export default routes;