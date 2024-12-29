import express from "express";
import CategoryController from "../controllers/category.controller";

const routes = express.Router();

routes.get("/api/v1/categories", CategoryController.getAllCategories);
routes.get("/api/v1/categories/:id", CategoryController.getCategoryById);
routes.post("/api/v1/categories", CategoryController.createCategory);
routes.put("/api/v1/categories/:id", CategoryController.updateCategory);
routes.delete("/api/v1/categories/:id", CategoryController.deleteCategory);

export default routes;
