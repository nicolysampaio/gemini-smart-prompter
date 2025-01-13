import { Request, Response } from "express";
import CategoryService from "../services/category.service";

class CategoryController {
  static async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await CategoryService.getAll();

      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching the category",
        error: (error as Error).message,
      });
    }
  }

  static async getCategoryById(req: Request, res: Response) {
    try {
      const category = await CategoryService.getById(req.params.id);

      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching the category",
        error: (error as Error).message,
      });
    }
  }
  static async createCategory(req: Request, res: Response) {
    try {
      const category = await CategoryService.create(req.body);

      res
        .status(201)
        .json({ message: "Category created with success!", category });
    } catch (error) {
      res.status(500).json({
        message: "Error creating the category",
        error: (error as Error).message,
      });
    }
  }
  static async updateCategory(req: Request, res: Response) {
    try {
      const category = await CategoryService.update(req.params.id, req.body);

      res
        .status(200)
        .json({ message: "Category updated with success!", category });
    } catch (error) {
      res.status(500).json({
        message: "Error updating the category",
        error: (error as Error).message,
      });
    }
  }
  static async deleteCategory(req: Request, res: Response) {
    try {
      await CategoryService.delete(req.params.id);

      res.status(200).json({ message: "Category deleted with success!" });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting the category",
        error: (error as Error).message,
      });
    }
  }
}

export default CategoryController;
