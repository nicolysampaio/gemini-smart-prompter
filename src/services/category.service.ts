import { CategoryInterface } from "../interfaces/category.interface";
import Category from "../models/category.model";

class CategoryService {
  static getAll = async (): Promise<CategoryInterface[] | null> => {
    return await Category.find();
  };

  static getById = async (id: string): Promise<CategoryInterface | null> => {
    return await Category.findById(id);
  };

  static create = async (category: any): Promise<CategoryInterface | null> => {
    return await Category.create(category);
  };

  static update = async (
    id: string,
    category: any
  ): Promise<CategoryInterface | null> => {
    return await Category.findByIdAndUpdate(id, category, { new: true });
  };

  static delete = async (id: string): Promise<CategoryInterface | null> => {
    return await Category.findByIdAndDelete(id);
  };
}

export default CategoryService;
