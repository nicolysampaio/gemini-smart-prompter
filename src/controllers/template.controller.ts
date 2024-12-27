import { Request, Response } from "express";
import TemplateService from "../services/template.service";

class TemplateController {
  static async getAllTemplates(req: Request, res: Response) {
    try {
      const templates = await TemplateService.getAll();

      res.status(200).json(templates);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching templates",
        error: (error as Error).message,
      });
    }
  }

  static async getTemplateById(req: Request, res: Response) {
    try {
      const template = await TemplateService.getById(req.params.id);

      res.status(200).json(template);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching template",
        error: (error as Error).message,
      });
    }
  }

  static async createTemplate(req: Request, res: Response) {
    try {
      const template = await TemplateService.create(req.body);

      res
        .status(200)
        .json({ message: "Template created with success!", template });
    } catch (error) {
      res.status(500).json({
        message: "Error creating template",
        error: (error as Error).message,
      });
    }
  }

  static async updateTemplate(req: Request, res: Response) {
    try {
      const template = await TemplateService.update(req.params.id, req.body);

      res
        .status(200)
        .json({ message: "Template updated with success!", template });
    } catch (error) {
      res.status(500).json({
        message: "Error updating template",
        error: (error as Error).message,
      });
    }
  }

  static async deleteTemplate(req: Request, res: Response) {
    try {
      await TemplateService.delete(req.params.id);

      res.status(200).json({ message: "Template deleted with success!" });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting template",
        error: (error as Error).message,
      });
    }
  }
}

export default TemplateController;
