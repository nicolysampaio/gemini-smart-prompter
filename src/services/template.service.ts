import mongoose from "mongoose";
import { TemplateInterface } from "../interfaces/template.interface";
import Template from "../models/template.model";
import Category from "../models/category.model";

class TemplateService {
  static getAll = async (): Promise<TemplateInterface[] | null> => {
    return await Template.find().populate("categories").exec();
  };

  static getById = async (id: string): Promise<TemplateInterface | null> => {
    return await Template.findById(id);
  };

  static create = async (
    template: TemplateInterface
  ): Promise<TemplateInterface | null> => {
    return await Template.create(template);
  };

  static update = async (
    id: string,
    template: TemplateInterface
  ): Promise<TemplateInterface | null> => {
    return await Template.findByIdAndUpdate(id, template, { new: true });
  };

  static delete = async (id: string): Promise<TemplateInterface | null> => {
    return await Template.findByIdAndDelete(id);
  };

  static categorize = async (
    templateId: string,
    categoryId: string
  ): Promise<TemplateInterface | null> => {
    const template = await Template.findById(templateId);
    if (!template) throw new Error("Template not found");

    const category = await Category.findById(categoryId);
    if (!category) throw new Error("Category not found");

    if (!template.categories.some((id) => id.toString() === categoryId)) {
      template.categories.push(categoryId as unknown as mongoose.Schema.Types.ObjectId);
      await template.save();
    }

    return await Template.findById(templateId).populate("categories");
  };

  static decategorize = async (
    templateId: string,
    categoryId: string
  ): Promise<TemplateInterface | null> => {
    const template = await Template.findById(templateId);
    if (!template) throw new Error("Template not found");

    template.categories = template.categories.filter(
      (id) => id.toString() !== categoryId
    );

    await template.save();

    return await Template.findById(templateId).populate("categories");
  };
}

export default TemplateService;
